import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from '../schemas/task.schema';
import { Model } from 'mongoose';
import { CreateTaskDTO } from 'src/dto/create-task.dto';
import { UpdateTaskDTO } from 'src/dto/update-task.dto ';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async findAll() {
    return await this.taskModel.find();
  }

  async create(newTask: CreateTaskDTO) {
    const createdTask = new this.taskModel(newTask);
    return await createdTask.save();
  }

  async findOne(id: string) {
    return this.taskModel.findById(id);
  }

  async delete(id: string) {
    return this.taskModel.findByIdAndDelete(id);
  }

  async update(id: string, task: UpdateTaskDTO) {
    return this.taskModel.findByIdAndUpdate(id, task, { new: true });
  }
}
