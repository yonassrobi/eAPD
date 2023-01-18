const {
  getDB,
  setupDB,
  teardownDB,
  login,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../../endpoint-tests/utils');

describe('auth roles endpoint get endpoint', () => {
  jest.setTimeout(300000);
  describe('GET /auth/roles', () => {
    const db = getDB();
    beforeAll(() => setupDB(db));
    afterAll(() => teardownDB(db));
    const url = '/auth/roles';

    unauthenticatedTest('get', url);
    unauthorizedTest('get', url);

    it('when authenticated', async () => {
      const api = login('state-admin');
      const response = await api.get(url);
      const roles = response.data.map(r => ({
        activities: r.activities,
        name: r.name,
        isActive: r.isActive
      }));

      expect(response.status).toEqual(200);
      expect(roles).toMatchSnapshot();
    });
  });
});
