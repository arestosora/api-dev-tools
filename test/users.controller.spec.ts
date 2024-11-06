import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../src/users/users.controller';
import { UsersService } from '../src/users/users.service';
import { RegisterUserDataObject } from '../src/users/user.dto';

const mockUsersService = {
  register: jest.fn().mockResolvedValue({
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    password: 'hashedpassword',
  }),
};

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call UsersService.register and return the result', async () => {
    const data: RegisterUserDataObject = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    };

    const result = await controller.register(data);

    expect(service.register).toHaveBeenCalledWith(data);


    expect(result).toEqual({
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
      password: 'hashedpassword',
    });
  });
});
