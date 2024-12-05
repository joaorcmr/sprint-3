import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsEmail({}, { message: 'Email must be a valid email' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters.' })
  password: string;

  @IsNotEmpty({ message: 'CCA is required' })
  cca: string;

  @IsNotEmpty({ message: 'Occupation is required' })
  occupation: string;
}
