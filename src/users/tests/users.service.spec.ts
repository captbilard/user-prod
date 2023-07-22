import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockType, mockUser, mockUser2 } from './mocks/mock';

const userRepoMock: MockType<Repository<User>> = {
  save: jest.fn(),
  create: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: userRepoMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      userRepoMock.save.mockReturnValue(mockUser);
      const newUser = await service.create(mockUser);
      expect(newUser).toMatchObject(mockUser);
    });
  });

  describe('findOne', () => {
    it('should return a users', async () => {
      userRepoMock.findOne.mockReturnValue(mockUser2);
      const user = await service.findOne('1234');
      expect(user).toMatchObject(mockUser2);
    });
  });
});
