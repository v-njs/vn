import {
  Controller,
  Get,
  Res,
  Post,
  Body,
  Inject,
  Query,
  UnauthorizedException,
  Session,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import * as svgCaptcha from 'svg-captcha';
import { NoHaveLogin } from '../../common/decorator/custom-decorator';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  @Get('captcha')
  @NoHaveLogin()
  async captcha(@Session() session: Record<string, any>, @Res() res: Response) {
    const captcha = svgCaptcha.createMathExpr({
      size: 10,
      background: '#1e80ff',
      color: true,
      noise: 3,
    });
    session.captcha = captcha.text;
    res.type('svg');
    res.send(captcha.data);
    return res;
  }

  @Post('login')
  @NoHaveLogin()
  async login(
    @Body() loginUser: UserLoginDto,
    @Session() session: Record<string, any>,
  ) {
    // 获取session中的验证码 然后删除它
    const captcha = session.captcha;
    delete session.captcha;

    const user = await this.authService.login(loginUser, captcha);

    delete session.captcha;

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

      const user = await this.authService.findById(data.userId);

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
}
