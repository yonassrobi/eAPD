import loggerFactory from '../logger/index.js';
import apdsSubmissions from './apds/submissions/index.js';

const logger = loggerFactory('api key routes index');

export default (app, { apdsSubmissionsEndpoint = apdsSubmissions } = {}) => {
  logger.debug('setting up routes for apds/submissions');
  apdsSubmissionsEndpoint(app);
};
