import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { Role } from './user/entities/role.entity';
import { Permission } from './user/entities/permission.entity';
import { Menu } from './user/entities/menu.entity';
import { JwtModule } from '@nestjs/jwt';
import { LoginGuard } from './login.guard';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'vn',
      signOptions: {
        expiresIn: '7d',
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '000000',
      database: 'vn',
      // 同步建表
      synchronize: true,
      // 打印sql
      logging: true,
      // 数据库连接池中连接的最大数量
      poolSize: 10,
      entities: [User, Role, Permission, Menu],
      connectorPackage: 'mysql2',
      extra: {
        authPlugins: 'sha256_password',
      },
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: LoginGuard,
    },
  ],
})
export class AppModule {}
