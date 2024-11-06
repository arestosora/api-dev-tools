import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthMiddleware } from './middlewares/auth';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TaskModule, UsersModule],
  providers: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
