import { Injectable } from '@nestjs/common';
import { User } from "../db/users";
import {UserServiceDB} from "../db/users";
import { getSalt, hashPassword } from "../helpers/hashPassword";

const userServiceDB = new UserServiceDB();
@Injectable()
export class UserService {
  async createUser(user: { email: string, password: string }): Promise<User> {
    if (!user.email || user.email.length < 5 || !user.email.includes('@')) {
      throw new Error('Invalid email');
    }
    const existing = await userServiceDB.findByEmail(user.email);
    if (existing) {
        throw new Error('User already exists');
    }
    if (!user.password || user.password.length < 8) {
        throw new Error('Password too short');
    }

    const salt = getSalt();
    const userWithHash = {
        email: user.email,
        hash: hashPassword(salt + user.password),
        salt
    };


    return userServiceDB.createUser(userWithHash);
  }

  async authenticateUser(user: { email: string, password: string }): Promise<{ email: string }> {
    const existing = await userServiceDB.findByEmail(user.email);
    if (!existing) {
      throw new Error('User not found');
    }
    const hash = hashPassword(existing.salt + user.password);
    if (hash !== existing.hash) {
      throw new Error('Invalid password');
    }
    return { email: existing.email };
  }

   async findByEmail(email: string): Promise<User | null> {
    
    return userServiceDB.findByEmail(email);
  }
}