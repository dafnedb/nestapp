import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '../../services/users';
import { signJWT } from '../../helpers/jwt';

@Controller('login')
export class LoginController {
  constructor(private readonly userService: UserService) {} // Inyección de dependencias

  @Post()
  async loginUser(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res() res: Response,
  ) {
    try {
      // Autenticar al usuario con UserService
      const user = await this.userService.authenticateUser({ email, password });
      console.log('estoy en el backend');

      if (user) { // Si la autenticación fue exitosa
        const jwt = signJWT(user); // Generar el token JWT

        // Establecer la cookie con el token JWT
        res.cookie('user', jwt, { maxAge: 60 * 60 * 24, httpOnly: true });

        // Respuesta exitosa
        return res.status(200).json({ success: true });
      } else {
        // Autenticación fallida
        return res.status(401).json({ success: false, message: 'Authentication failed' });
      }
    } catch (error) {
      // Manejo de errores
      return res.status(500).json({ success: false, message: 'An errorrrr occurred during authentication' });
    }
  }
}