import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDataObject } from './task.dto';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Get()
    index() {
        return this.taskService.getAll()
    }

    @Get(':id')
    One(@Param('id') id: string) {
        return this.taskService.getOne(+id)
    }

    @Post()
    create(@Body() data: TaskDataObject) {
        return this.taskService.create(data);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() data: TaskDataObject) {
        return this.taskService.update(+id, data)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.taskService.delete(+id)
    }
}
