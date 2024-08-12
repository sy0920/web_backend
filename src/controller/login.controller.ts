import { Inject, Controller, Post, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';

@Controller('/api/user')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Post('/login')
  async login(@Body() body) {
    const { username, password } = body;
    if (!username || !password) {
      return { success: false, message: 'Username and password cannot be empty' };
    }
    const result = await this.userService.login(username);
    return { success: true, message: 'Login successful', data: result };

  }
}