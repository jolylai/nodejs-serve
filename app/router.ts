import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/login', controller.login.index);

  router.resources('users', '/users', controller.users);
  router.post('/users/create', controller.users.create);
};
