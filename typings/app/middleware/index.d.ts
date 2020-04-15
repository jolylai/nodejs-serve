// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportToken from '../../../app/middleware/token';

declare module 'egg' {
  interface IMiddleware {
    token: typeof ExportToken;
  }
}
