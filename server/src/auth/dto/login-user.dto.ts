import { IsEmail, IsNotEmpty, IsString } from 'class-validator';


export class LoginUserDto {
  @IsEmail({}, { message: 'Email must be a valid email address' })
  readonly email: string;

  @IsNotEmpty()
  @IsString({ message: 'Password is required' })
  readonly password: string;
}
