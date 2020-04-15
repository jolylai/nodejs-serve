const { app } = require('egg-mock/bootstrap');
import * as assert from 'assert';

describe('text /app/controller/users.test.js', () => {
  describe('GET /users', () => {
    it('should worlk', async () => {
      console.log('app: ', app);
      await app.factory.createMany('user', 3);
      const res = await app.httpresquest().get('/users?limit=2');
      assert(res.status === 200);
      assert(res.body.length === 2);
      assert(res.body[0].name);
      assert(res.body[0].age);
    });
  });
});
