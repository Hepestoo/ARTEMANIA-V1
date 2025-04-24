import { Controller, Post, Body, Get, Req, UseGuards, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  async register(@Body() userDto: CreateUserDto) {
    return this.usersService.create(userDto);
  }

  @Post('login')
  async login(@Body() credentials: { email: string; password: string }) {
    const user = await this.usersService.validateUser(
      credentials.email,
      credentials.password, 
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.usersService.login(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Req() req) {
    console.log('Usuario autenticado:', req.user);
    return this.usersService.getProfile(req.user.userId);
  }
  
}
