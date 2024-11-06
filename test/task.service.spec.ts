import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from '../src/task/task.service';
import { PrismaService } from '../src/prisma/prisma.service';

const mockPrismaService = {
  task: {
    create: jest.fn().mockResolvedValue({
      id: 1,
      title: 'Test Task',
      completed: false,
    }),
    findMany: jest.fn().mockResolvedValue([
      { id: 1, title: 'Test Task', completed: false },
      { id: 2, title: 'Another Task', completed: true },
    ]),
    findUnique: jest.fn().mockResolvedValue({
      id: 1,
      title: 'Test Task',
      completed: false,
    }),
    update: jest.fn().mockResolvedValue({
      id: 1,
      title: 'Updated Task',
      completed: true,
    }),
    delete: jest.fn().mockResolvedValue({
      id: 1,
      title: 'Test Task',
      completed: false,
    }),
  },
};

describe('TaskService', () => {
  let service: TaskService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a task', async () => {
    const taskData = { title: 'Test Task', completed: false };

    const result = await service.create(taskData);

    expect(prisma.task.create).toHaveBeenCalledWith({
      data: taskData,
    });

    expect(result).toEqual({
      id: 1,
      title: 'Test Task',
      completed: false,
    });
  });

  it('should return all tasks', async () => {
    const result = await service.getAll();

    expect(prisma.task.findMany).toHaveBeenCalled();

    expect(result).toEqual([
      { id: 1, title: 'Test Task', completed: false },
      { id: 2, title: 'Another Task', completed: true },
    ]);
  });

  it('should return a single task by id', async () => {
    const result = await service.getOne(1);

    expect(prisma.task.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });

    expect(result).toEqual({
      id: 1,
      title: 'Test Task',
      completed: false,
    });
  });

  it('should update a task', async () => {
    const taskData = { title: 'Updated Task', completed: true };
    const result = await service.update(1, taskData);

    expect(prisma.task.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: taskData,
    });

    expect(result).toEqual({
      id: 1,
      title: 'Updated Task',
      completed: true,
    });
  });

  it('should delete a task', async () => {
    const result = await service.delete(1);

    expect(prisma.task.delete).toHaveBeenCalledWith({ where: { id: 1 } });

    expect(result).toEqual({
      id: 1,
      title: 'Test Task',
      completed: false,
    });
  });
});