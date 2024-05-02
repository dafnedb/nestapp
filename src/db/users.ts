import { Injectable } from '@nestjs/common';
import Datastore from 'nedb-promises';

export interface User {
  email: string;
  hash: string;
  salt: string;
}

@Injectable()
export class UserServiceDB {
  private readonly db: Datastore<User>;

  constructor() {
    
    this.db = Datastore.create({ filename: './users.db', autoload: true });
  }

  async createUser(user: User): Promise<User> {
    return this.db.insert(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.db.findOne({ email });
  }
}