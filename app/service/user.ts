import { Service } from "egg";

export interface User {
  id: number;
  name: string;
  email: string;
  mobile: string;
  address: string;
  gender: string;
  age: number;
  created_at: Date;
  updated_at: Date;
}

/**
 * User Service
 */
export default class UserService extends Service {
  public async getUserById(userId: number) {
    const ctx = this.ctx;
    const result = await ctx.model.User.findByPk(userId);
    return result;
  }

  public async getUserByQuery(query: number) {
    const ctx = this.ctx;
    return ctx.model.User.findByPk(query);
  }
}
