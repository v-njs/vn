import { IsNotEmpty, Length } from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty()
  @Length(1, 50)
  username: string;

  @IsNotEmpty()
  @Length(1, 50)
  password: string;

  @IsNotEmpty()
  @Length(1, 10)
  captcha: string;
}
