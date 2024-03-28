import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { Permission } from './entities/permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../system/user/entities/user.entity';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'vn',
      signOptions: {
        expiresIn: '7d',
      },
    }),
    TypeOrmModule.forFeature([Permission, User]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
