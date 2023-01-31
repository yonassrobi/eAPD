import loggerFactory from '../../logger/index.js';
import { can, userCanEditAPD } from '../../middleware/index.js';
import { deleteAPDByID as da } from '../../db/index.js';

const logger = loggerFactory('apds route get');

export default (app, { deleteAPDByID = da } = {}) => {
  logger.debug('setting up DELETE /apds/:id route');

  app.delete(
    '/apds/:id',
    can('view-document'),
    userCanEditAPD(),
    async (req, res, next) => {
      await deleteAPDByID(req.meta.apd.id)
        .then(() => res.status(204).end())
        .catch(next);
    }
  );
};
