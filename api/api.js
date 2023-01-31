// Sets up dotenv, sets default environment
// variables if not defined
import './env.js';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import { v4 as uuidv4 } from 'uuid';
import fileUpload from 'express-fileupload';

import loggerFactory from './logger/index.js';
import requestLoggerMiddleware from './logger/morgan.js';
import jsonWebTokenMiddleware from './auth/jwtMiddleware.js';
import routes from './routes/index.js';
import apiKeyRoutes from './routes/keyIndex.js';
import endpointCoverage from './middleware/endpointCoverage.js';
import errorHandler from './middleware/errorHandler.js';
import { setup as mongoSetup, getConnectionStatus } from './db/mongodb.js';
import knex from './db/knex.js';
import { waitForInitialization as ldWaitForInitialization } from './middleware/launchDarkly.js'; // initialize LaunchDarkly
import me from './routes/me/index.js';

const logger = loggerFactory('main');

(async () => {
  try {
    await mongoSetup();
    logger.info('Mongo connected');
  } catch (err) {
    logger.error(`Error setting up MongoDB: ${err}`);
  }
})();

(async () => {
  try {
    await ldWaitForInitialization();
    logger.info('LaunchDarkly connected');
  } catch (err) {
    logger.error(`Error setting up LaunchDarkly: ${err}`);
  }
})();

// deepcode ignore UseCsurfForExpress: we need a larger ticket to implement csurf
const api = express();

// Turn off the X-Powered-By header that reveals information about the api
// architecture. No need just giving away all the information, though this
// code IS on Github, so I reckon folks could figure it out easily enough...
// But hey, it reduces the value of automated malicious scans, so there's that.
api.disable('x-powered-by');

endpointCoverage.registerCoverageMiddleware(api);

if (process.env.PROXY_TRUST !== 'false') {
  // If there is a non-false PROXY_TRUST value, use it. If the value is 'true',
  // convert to a boolean to trust everything. This will use the left-most
  // value in X-FORWARDED-FOR as the requestor IP address.
  api.set(
    'trust proxy',
    process.env.PROXY_TRUST === 'true' || process.env.PROXY_TRUST
  );
}

api.use((_, res, next) => {
  // Disallow proxies from cacheing anything ("private"); instruct browsers to
  // validate the content with etags before using their own caches ("no-cache")
  res.header('Cache-Control', 'private, no-cache');

  // Instruct the browser to use HTTPS for this domain and its subdomains for
  // the next year.
  res.header(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains'
  );

  // Instruct browsers to use the content-type indicated by the api rather
  // than ignore that and try to guess the content-type from the response body
  // (IE used to do this and would sometimes decide that things were executable
  // and then run them, with I'm sure HILARIOUS results)
  res.header('X-Content-Type-Options', 'nosniff');

  // Don't allow this URL to be embedded in frames on any sites that aren't on
  // this same domain. Not super useful for an API, but the scanners will be
  // looking for it.
  res.header('X-Frame-Options', 'sameorigin');

  // Trigger browsers' built-in cross-site scripting protection. It's usually
  // on by default, but let's be explicit. Also not super useful for an API.
  res.header('X-XSS-Protection', '1; mode=block');
  next();
});

api.use((req, res, next) => {
  req.id = uuidv4();
  req.meta = {};
  logger.verbose({
    id: req.id,
    message: `got ${req.method} request to ${req.path}`
  });
  return next();
});

logger.debug('setting global middleware');
api.use(requestLoggerMiddleware);
api.use(cors({ credentials: true, origin: true }));
api.use(compression());
api.use(express.urlencoded({ extended: true }));
api.use(bodyParser.json({ limit: '5mb' }));
api.use(fileUpload());

// This endpoint doesn't do anything, but lets us verify that the api is
// online without triggering any other processing - e.g., no authentication,
// no cookie/token processing, etc.
logger.debug('setting up heartbeat endpoints');
api.get('/heartbeat', (_, res) => {
  res.status(204).end();
});

api.get('/heartbeat-db', (_, res) => {
  knex
    .raw('SELECT 1')
    .then(() => {
      res.status(204).end();
    })
    .catch(() => {
      res.status(503).json({ status: 'disconnected' }).end();
    });
});

api.get('/heartbeat-mongo', (_, res) => {
  const status = getConnectionStatus();
  if (status === 'connected') {
    res.status(204).end();
  } else {
    res.status(503).json({ status }).end();
  }
});

logger.debug('setting up routes for API Keys');
apiKeyRoutes(api);

// Registers Passport, related handlers, and
// login/logout endpoints
logger.debug('setting up routes for me');
// Me endpoints are for token exchange and use Okta tokens, not eAPD tokens
me(api);
logger.debug('setting up authentication');
api.use(jsonWebTokenMiddleware);

logger.debug('setting up routes');
routes(api);

// Requests for undefined resources result in a 404 status
api.all('*', (_, res) => {
  res.status(404).end();
});

// Respond to api errors, accordingly. Must be loaded last.
api.use(errorHandler);

export default api;
