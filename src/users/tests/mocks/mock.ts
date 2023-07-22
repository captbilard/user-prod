import { CreateUserDto } from 'src/users/dto/create-user.dto';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<Record<string, unknown>>;
};

export const mockUser = {
  id: '123',
  name: 'John Doe',
  email: 'jdoe@example.com',
  age: 30,
  orders: [],
};

export const mockUser2 = {
  id: '1234',
  name: 'John Fallon',
  email: 'jfallon@example.com',
  age: 38,
  orders: [],
};

export const userServiceFactory = () => ({
  create: jest.fn((data: CreateUserDto) => ({
    id: '123',
    ...data,
  })),
  findOne: jest.fn((id: string) => ({
    ...mockUser2,
    id,
  })),
  findAll: jest.fn(() => [mockUser, mockUser2]),
});
