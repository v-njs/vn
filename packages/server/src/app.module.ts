import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/system/user/user.module';
import { User } from './modules/system/user/entities/user.entity';
import { Role } from './modules/system/role/entities/role.entity';
import { Menu } from './modules/system/menu/entities/menu.entity';
import { Permission } from './modules/auth/entities/permission.entity';
import { LoginGuard } from './common/guard/login.guard';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
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
      entities: [User, Role, Menu, Permission],
      connectorPackage: 'mysql2',
      extra: {
        authPlugins: 'sha256_password',
      },
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: LoginGuard,
    },
  ],
})
export class AppModule {}
