import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UsersDto {
  @IsString()
  @MinLength(2, { message: 'Name must have atleast 2 characters.' })
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;
}
