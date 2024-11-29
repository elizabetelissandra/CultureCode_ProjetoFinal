import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { userRepositoryMock } from '../testing/users/user-repository.mock';
import { updateUserMock } from '../testing/users/update-user.mock';
import { userDecoratorMock } from '../testing/users/user-decorator.mock';

describe('UserService', () => {
  let userService: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, userRepositoryMock],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('Read', () => {
    it('should be find user by email', async () => {
      const result = await userService.findByEmail(
        'liz-dossantos82@jglima.com.br',
      );

      expect(result).toHaveProperty('id');
      expect(result.deleteAt).toBeNull();
    });

    it('should be find all users', async () => {
      const users = await userService.findAll();

      expect(users.length).toBeGreaterThan(0);
    });

    it('should be find user by id', async () => {
      const user = await userService.userById(3);

      expect(user).toHaveProperty('email');
    });

    it('should be see profile', async () => {
      const user = await userService.userById(3);

      expect(user).toHaveProperty('coins');
      expect(user.deleteAt).toBeNull();
    });
  });

  describe('Update', () => {
      it('should be possible to update the user', async () => {
        const user = await userService.update(
          3,
          updateUserMock,
          userDecoratorMock,
        );
  
        expect(user.email).toEqual(updateUserMock.email);
        expect(user.deleteAt).toBeNull();
      });  
  });

  describe('Delete', () => {
    it('should be delete user', async () => {
      const user = await userService.delete(4, userDecoratorMock);

      expect(user).toHaveProperty('message');
    });
  });
});
