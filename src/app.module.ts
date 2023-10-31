import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [TasksModule, MongooseModule.forRoot('mongodb://localhost/taskdb')],
  controllers: [],
  providers: [],
})
export class AppModule {}
