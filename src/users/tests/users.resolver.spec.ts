import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from '../users.resolver';
import { UsersService } from '../users.service';
import { userServiceFactory } from './mocks/mock';

describe('UsersResolver', () => {
  let resolver: UsersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        { provide: UsersService, useFactory: userServiceFactory },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('create user', () => {
    it('should create a user', async () => {
      const newUser = {
        name: 'John Doe',
        email: 'jdoe@example.com',
        age: 30,
        orders: [],
      };
      const response = await resolver.createUser(newUser);
      expect(response).toMatchObject({
        id: '123',
        name: 'John Doe',
        email: 'jdoe@example.com',
        age: 30,
        orders: [],
      });
    });
  });

  describe('find user', () => {
    it('should find a user', async () => {
      const response = await resolver.findOne('1234');
      expect(response).toEqual({
        id: '1234',
        name: 'John Fallon',
        email: 'jfallon@example.com',
        age: 38,
        orders: [],
      });
    });
  });

  describe('find all user', () => {
    it('should return an array of all users', async () => {
      const response = await resolver.findAll();
      expect(response).toEqual([
        {
          id: '123',
          name: 'John Doe',
          email: 'jdoe@example.com',
          age: 30,
          orders: [],
        },
        {
          id: '1234',
          name: 'John Fallon',
          email: 'jfallon@example.com',
          age: 38,
          orders: [],
        },
      ]);
    });
  });
});
