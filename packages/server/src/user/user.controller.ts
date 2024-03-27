import {
  Controller,
  Get,
  Post,
  Body,
  Inject,
  Query,
  UnauthorizedException,
  Session,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { UserLoginDto } from './dto/user-login.dto';
import { JwtService } from '@nestjs/jwt';
import { NoHaveLogin } from '../custom-decorator';
import * as svgCaptcha from 'svg-captcha';

@Controller('user')
export class UserController {
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  constructor(private readonly userService: UserService) {}

  @Get('init')
  async initData() {
    await this.userService.initData();
    return '初始化成功';
  }

  @Post('login')
  @NoHaveLogin()
  async login(@Body() loginUser: UserLoginDto) {
    const user = await this.userService.login(loginUser);

    const access_token = this.jwtService.sign(
      {
        user: {
          username: user.username,
          roles: user.roles,
          userId: user.id,
        },
      },
      {
        expiresIn: '30m',
      },
    );

    const refresh_token = this.jwtService.sign(
      {
        user: {
          userId: user.id,
        },
      },
      {
        expiresIn: '7d',
      },
    );

    return {
      access_token,
      refresh_token,
    };
  }

  @Get('refresh')
  async refresh(@Query('refresh_token') refreshToken: string) {
    try {
      const data = this.jwtService.verify(refreshToken);

      if (!data.userId) {
        throw new UnauthorizedException('refresh_token 失效');
      }

      const user = await this.userService.findById(data.userId);

      if (!user) {
        throw new UnauthorizedException('用户信息错误!');
      }
      const access_token = this.jwtService.sign(
        {
          userId: user.id,
          username: user.username,
        },
        {
          expiresIn: '30m',
        },
      );

      const refresh_token = this.jwtService.sign(
        {
          userId: user.id,
        },
        {
          expiresIn: '7d',
        },
      );

      return {
        access_token,
        refresh_token,
      };
    } catch (error) {
      throw new UnauthorizedException('token 已失效，请重新登录');
    }
  }

  @Get('captcha')
  @NoHaveLogin()
  async captcha(@Session() session: Record<string, any>, @Res() res: Response) {
    const captcha = svgCaptcha.createMathExpr({
      size: 10,
    });
    session.captcha = captcha.text;
    res.type('svg');
    res.send(captcha.data);
    return res;
  }
}
