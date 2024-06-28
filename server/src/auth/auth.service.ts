import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    this.logger.warn(`User signing up: ${createUserDto.email}`);
    return this.usersService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async validateUser(email: string, password: string): Promise<any> {
    this.logger.info(`Validating user with email: ${email}`);
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    this.logger.warn(`Failed login attempt for email: ${email}`);
    return null;
  }

  async login(loginUserDto: LoginUserDto) {
    const payload = { email: loginUserDto.email, sub: loginUserDto.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
