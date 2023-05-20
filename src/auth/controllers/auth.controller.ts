import { Body, Controller, Post } from '@nestjs/common';
import { User } from '../models/user.interface';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // DANG KI
  @Post('register')
  registerNewAccount(@Body() user: User): Observable<User> {
    return this.authService.registerAccount(user);
  }

  // DANG NHAP
  @Post('login')
  userLogin(@Body() user: User): Observable<{ token: string }> {
    return this.authService
      .userLogin(user)
      .pipe(map((jwt: string) => ({ token: jwt })));
  }
}
