import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../src/prisma/prisma.service';

const mockPrismaClient = {
  $connect: jest.fn().mockResolvedValue(undefined),
  $disconnect: jest.fn().mockResolvedValue(undefined),
};

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        { provide: PrismaService, useValue: mockPrismaClient },
      ],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call $connect on module init', async () => {
    await service.onModuleInit(); 

    expect(mockPrismaClient.$connect).toHaveBeenCalled();
  });

  it('should call $disconnect when disconnected', async () => {
    await service.$disconnect();

    expect(mockPrismaClient.$disconnect).toHaveBeenCalled();
  });
});
