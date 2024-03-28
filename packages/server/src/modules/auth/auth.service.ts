import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';
import { UserLoginDto } from './dto/user-login.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from '../system/user/entities/user.entity';

@Injectable()
export class AuthService {
  @InjectEntityManager()
  entityManager: EntityManager;

  async findById(id: number) {
    return await this.entityManager.findOneBy(User, { id });
  }

  async login(loginUserDto: UserLoginDto, captcha: string) {
    if (loginUserDto.captcha !== captcha) {
      throw new HttpException('验证码错误', HttpStatus.ACCEPTED);
    }

    const user = await this.entityManager.findOne(User, {
      where: {
        username: loginUserDto.username,
      },
      relations: {
        roles: true,
      },
    });

    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.ACCEPTED);
    }

    if (user.password !== loginUserDto.password) {
      throw new HttpException('密码错误', HttpStatus.ACCEPTED);
    }

    return user;
  }
}
