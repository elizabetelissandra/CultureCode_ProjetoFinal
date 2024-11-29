import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { authGuardMock } from '../testing/auth/auth-guard.mock';
import { userRepositoryMock } from '../testing/users/user-repository.mock';
import { RolesGuard } from '../auth/guards/role.guard';
import { rolesGuardMock } from '../testing/auth/roles-guard.mock';
import { userDecoratorMock } from '../testing/users/user-decorator.mock';
import { userServiceMock } from '../testing/users/user-service.mock';
import { updateUserMock } from '../testing/users/update-user.mock';

describe('UserController', () => {
  let userController: UserController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [userServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .overrideGuard(RolesGuard)
      .useValue(rolesGuardMock)
      .compile();

    userController = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('Read', () => {
    it('should be find profile user', async () => {
      const user = await userController.profile(userDecoratorMock);

      console.log(user);
      expect(user).toHaveProperty('id');
      expect(user.deleteAt).toBeNull();
    });

    it('shoulde be find all users', async () => {
      const users = await userController.findAll();

      expect(users.length).toBeGreaterThan(0);
    });

    it('should be find user by id', async () => {
      const user = await userController.userById(9);

      expect(user.role).toEqual('admin');
      expect(user.deleteAt).toBeNull();
    });
  });

  describe('Update', () => {
    it('should be update user', async () => {
      const user = await userController.update(
        10,
        updateUserMock,
        userDecoratorMock,
      );

      expect(user.email).toEqual(updateUserMock.email);
    });
  });

  describe('Delete', () => {
    it('should be delete user', async () => {
      const user = await userController.delete(10, userDecoratorMock);

      expect(userDecoratorMock.userRole).toEqual('admin');
      expect(user).toHaveProperty('message');
    });
  });
});
