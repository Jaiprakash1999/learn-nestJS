import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['ENGINEER', 'INTERN', 'ADMIN', 'Full stack developer', 'SDE3'], {
    message: 'Valid role required',
  })
  role: 'ENGINEER' | 'INTERN' | 'ADMIN' | 'Full stack developer' | 'SDE3';
}
