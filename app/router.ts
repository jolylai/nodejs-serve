import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/login', controller.login.index);

  router.resources('users', '/api/users', controller.users);

  router.get('/api/email/sent', controller.email.index);
};
