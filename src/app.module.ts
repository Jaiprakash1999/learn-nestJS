import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MyLoggerService } from './my-logger/my-logger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    UsersModule,
    EmployeesModule,
    DatabaseModule,
    //   // ThrottlerModule.forRoot([
    //   //   { name: 'short', ttl: 1000, limit: 3 },
    //   //   {
    //   //     name: 'long',
    //   //     ttl: 60000,
    //   //     limit: 3,
    //   //   },
    //   // ]),
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.local.env',
        }),
      ],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        synchronize: configService.get<boolean>('DB_SYNC'),
        entities: [User],
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard,
    // },
    // MyLoggerService,
  ],
})
export class AppModule {}
