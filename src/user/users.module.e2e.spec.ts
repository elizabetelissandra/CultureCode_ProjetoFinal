import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserModule } from './user.module';
import { userRepositoryMock } from '../testing/users/user-repository.mock';
import { AuthGuard } from '../auth/guards/auth.guard';
import { authGuardMock } from '../testing/auth/auth-guard.mock';
import * as request from 'supertest';
import { usersMock } from '../testing/users/users.mock';
import { updateUserMock } from '../testing/users/update-user.mock';

describe('Users Module 2e2', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    })
      .overrideProvider(userRepositoryMock.provide)
      .useValue(userRepositoryMock.useValue)
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    app.init();
  });

  afterAll(async () => {
    app.close();
  });

  it('Should be defined', () => {
    expect(app).toBeDefined();
  });

  describe('Read', () => {
    it('should be see user profile', async () => {
      const response = await request(app.getHttpServer())
        .get('/user/profile')
        

      expect(response.statusCode).toEqual(200);
      expect(response.body).toHaveProperty('email');
    });

    it('should be find all users', async () => {

      const response = await request(app.getHttpServer())
        .get('/user')
        

      console.log('Error:', response.error);
      console.log('StatusCode:', response.statusCode);

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual([usersMock]);
    });

    it('should be find user by id', async () => {
      const response = await request(app.getHttpServer()).get(`/user/${usersMock[1].id}`)

      console.log('Error:', response.error);
      console.log('StatusCode:', response.statusCode);

      expect(response.statusCode).toEqual(200)
      expect(response.body).toHaveProperty('email')
    })
  });
  describe('Update', () => {
    it('should be update an user', async() => {
      const response = await request(app.getHttpServer()).patch(`/user/${usersMock[3].id}`).send(updateUserMock)

      expect(response.statusCode).toEqual(200)
      expect(response.body).toHaveProperty('email', updateUserMock.email)
    })
  })

  describe('Delete', () => {
    it('should be delete an user', async() => {
      const response = await request(app.getHttpServer()).delete(`/user/${usersMock[3].id}`)

      expect(response.statusCode).toEqual(200)
      expect(response.body).toHaveProperty('message')
    })
  })
});
