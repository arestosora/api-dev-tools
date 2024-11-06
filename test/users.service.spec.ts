import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../src/users/users.service';
import { PrismaService } from '../src/prisma/prisma.service';

const mockPrismaService = {
  user: {
    create: jest.fn().mockResolvedValue({
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
      password: 'hashedpassword',
    }),
  },
};

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register a user', async () => {
    const data = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    };

    const result = await service.register(data);

    expect(prisma.user.create).toHaveBeenCalledWith({
      data: { 
        username: data.username, 
        email: data.email, 
        password: expect.any(String), 
      },
    });

    expect(result).toEqual({
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
      password: 'hashedpassword', 
    });
  });
});
