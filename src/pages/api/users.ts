import { Body, Controller, Post, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '../../services/users';

@Controller('signup') // This sets the base route for this controller
export class SignupController {
  constructor(private readonly userService: UserService) {}

  @Post() // This indicates that this method handles POST requests
  async createUser(
    @Body() userData: { email: string; password: string }, 
    @Res() res: Response
  ) {
    try {
      await this.userService.createUser(userData);
      res.status(HttpStatus.CREATED).json({ message: 'User created successfully' });
      // console.log('llego aca')
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to create user' });
    }
  }
}