import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  HttpCode,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from 'src/dto/create-task.dto';
import { UpdateTaskDTO } from 'src/dto/update-task.dto ';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  async findAll() {
    return await this.taskService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const taskFinded = await this.taskService.findOne(id);

    if (!taskFinded) throw new NotFoundException('Task not found');

    return taskFinded;
  }

  @Post()
  async createTask(@Body() body: CreateTaskDTO) {
    try {
      return await this.taskService.create(body);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Title have to be unique');
      }

      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTask(@Param('id') id: string) {
    const taskDeleted = await this.taskService.delete(id);

    if (!taskDeleted) throw new NotFoundException('Task not found');

    return taskDeleted;
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() body: UpdateTaskDTO) {
    const taskUpdated = await this.taskService.update(id, body);

    if (!taskUpdated) throw new NotFoundException('Task not found');

    return taskUpdated;
  }
}
