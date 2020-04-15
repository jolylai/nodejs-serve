// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportEmail from '../../../app/controller/email';
import ExportHome from '../../../app/controller/home';
import ExportLogin from '../../../app/controller/login';
import ExportUsers from '../../../app/controller/users';

declare module 'egg' {
  interface IController {
    email: ExportEmail;
    home: ExportHome;
    login: ExportLogin;
    users: ExportUsers;
  }
}
