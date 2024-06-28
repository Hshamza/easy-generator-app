import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @IsEmail({}, { message: 'Email must be a valid email address' })
  readonly email: string;

  @IsString({ message: 'Name is required' })
  readonly name: string;

  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  readonly password: string;
}
