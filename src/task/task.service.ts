import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskDataObject } from './task.dto';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) { }

    async create(data: TaskDataObject) {
        return this.prisma.task.create({ data: { title: data.title, completed: data.completed } });
    }

    async getAll() {
        return this.prisma.task.findMany()
    }

    async getOne(id: number) {
        return this.prisma.task.findUnique({ where: { id: id } })
    }

    async update(id: number, data: TaskDataObject) {
        return this.prisma.task.update({ where: { id: id }, data })
    }

    async delete(id: number) {
        return this.prisma.task.delete({ where: { id: id } })
    }
}
