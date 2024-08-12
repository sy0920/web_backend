import { Provide } from '@midwayjs/core';
import { data } from '../controller/circle.controller';
@Provide()
export class UserService {
  async login(userName: string) {
    const userExists = data.users.some(user => user.username === userName);
    if (!userExists) {
      // 如果用户名不存在，则添加新用户
      const newUser = {
        id: data.users.length + 1,
        username: userName
      };
      data.users.push(newUser);
      console.log('New user added: ', newUser);
      return newUser;
    }
    else {
      return data.users.find(user => user.username === userName);
    }
  }

  async getUser(id: number) {
    return data.users.find(user => user.id === id);
  }
}