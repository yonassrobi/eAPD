import tap from 'tap';
import { stub, match } from 'sinon';
import { can, loggedIn } from '../../../middleware/index.js';
import postEndpoint from './post.js';
import mockExpress from '../../../util/mockExpress.js';
import mockResponse from '../../../util/mockResponse.js';

let app;
let res;
let next;

tap.test('state certifications post endpoint', async postTest => {
  const di = {
    addStateAdminCertification: stub()
  };

  postTest.beforeEach(() => {
    app = mockExpress();
    res = mockResponse();
    next = stub();
  });

  postTest.test('setup', async setupTest => {
    postEndpoint(app);

    setupTest.ok(
      app.post.calledWith(
        '/auth/certifications',
        loggedIn,
        can('edit-state-certifications'),
        match.func
      ),
      '/auth/certifications POST endpoint is setup'
    );
  });

  postTest.test(
    'POST endpoint for handing submission of state certification forms',
    async tests => {
      let handler;
      const req = {
        body: {
          ffy: 2021,
          name: 'Test Name',
          email: 'test@email.com',
          state: 'MD'
        },
        user: {
          id: '123'
        }
      };

      tests.beforeEach(async () => {
        postEndpoint(app, { ...di });
        handler = app.post.args
          .find(args => args[0] === '/auth/certifications')
          .pop();
      });

      tests.test('the db fails to save', async test => {
        di.addStateAdminCertification.resolves({ error: 'cant save' });

        await handler(req, res, next);

        test.ok(res.status.calledWith(400), 'sends a 400 error');
        test.ok(res.end.calledAfter(res.status), 'response is terminated');
      });

      tests.test('with valid data', async test => {
        di.addStateAdminCertification.resolves({});

        await handler(req, res, next);

        test.ok(res.status.calledWith(200), 'sends a 200 success response');
      });
    }
  );
});
