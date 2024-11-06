import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from '../src/task/task.controller';
import { TaskService } from '../src/task/task.service';
import { TaskDataObject } from '../src/task/task.dto';

const mockTaskService = {
  getAll: jest.fn().mockResolvedValue([
    { id: 1, title: 'Test Task 1', completed: false },
    { id: 2, title: 'Test Task 2', completed: true },
  ]),
  getOne: jest.fn().mockResolvedValue({ id: 1, title: 'Test Task 1', completed: false }),
  create: jest.fn().mockResolvedValue({ id: 1, title: 'New Task', completed: false }),
  update: jest.fn().mockResolvedValue({ id: 1, title: 'Updated Task', completed: true }),
  delete: jest.fn().mockResolvedValue({ id: 1, title: 'Test Task 1', completed: false }),
};

describe('TaskController', () => {
  let controller: TaskController;
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        { provide: TaskService, useValue: mockTaskService }, 
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all tasks', async () => {
    const result = await controller.index();

    expect(service.getAll).toHaveBeenCalled();

    expect(result).toEqual([
      { id: 1, title: 'Test Task 1', completed: false },
      { id: 2, title: 'Test Task 2', completed: true },
    ]);
  });

  it('should return a single task by id', async () => {
    const result = await controller.One('1');

    expect(service.getOne).toHaveBeenCalledWith(1);

    expect(result).toEqual({ id: 1, title: 'Test Task 1', completed: false });
  });

  it('should create a task', async () => {
    const taskData: TaskDataObject = { title: 'New Task', completed: false };
    const result = await controller.create(taskData);

    expect(service.create).toHaveBeenCalledWith(taskData);

    expect(result).toEqual({ id: 1, title: 'New Task', completed: false });
  });

  it('should update a task', async () => {
    const taskData: TaskDataObject = { title: 'Updated Task', completed: true };
    const result = await controller.update('1', taskData);

    expect(service.update).toHaveBeenCalledWith(1, taskData);

    expect(result).toEqual({ id: 1, title: 'Updated Task', completed: true });
  });

  it('should delete a task', async () => {
    const result = await controller.delete('1');

    expect(service.delete).toHaveBeenCalledWith(1);

    expect(result).toEqual({ id: 1, title: 'Test Task 1', completed: false });
  });
});
