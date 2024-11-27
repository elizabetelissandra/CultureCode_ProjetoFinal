import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JewelsModule } from './jewels.module';
import { jewelsRepositoryMock } from '../testing/jewels/jewels-repository.mock';
import { userRepositoryMock } from '../testing/users/user-repository.mock';
import { AuthGuard } from '../auth/guards/auth.guard';
import { authGuardMock } from '../testing/auth/auth-guard.mock';
import { createJewelsMock } from '../testing/jewels/create-jewels.mock';
import * as request from 'supertest';
import { usersMock } from '../testing/users/users.mock';
import { jewelsMock } from '../testing/jewels/jewels.mock';
import { updateJewelsMock } from '../testing/jewels/update-jewels.mock';


describe('Jewels Module', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JewelsModule],
    })
      .overrideProvider(jewelsRepositoryMock.provide)
      .useValue(jewelsRepositoryMock.useValue)
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

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  describe('Create', () => {
    it('shoulb be create jewels', async () => {
        jest.spyOn(jewelsRepositoryMock.useValue, 'findOne').mockResolvedValue(null)
        const response = await request(app.getHttpServer()).post('/jewels/create').send(createJewelsMock)

        

        expect(response.statusCode).toEqual(201)
        expect(response.body['active']).toEqual(true)
    })

    it('should be distribuite jewels', async () => {
        userRepositoryMock.useValue.findOne.mockResolvedValueOnce(usersMock[0])

        jewelsRepositoryMock.useValue.findOne.mockResolvedValueOnce(jewelsMock[1])

        const response = await request(app.getHttpServer()).post(`/jewels/assign/${usersMock[0].id}/jewels/${jewelsMock[1].id}`)

        
        console.log('Error', response.error)
        console.log('Status Code', response.statusCode)

        
        expect(response.statusCode).toEqual(201)
        expect(response.body).toHaveProperty('active')
    })
  })

  describe('Read', () => {
    it('should be find all jewels', async () =>{
        const response = await request(app.getHttpServer()).get('/jewels')

        expect(response.statusCode).toEqual(200)
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    })

    it('should be find jewel by id', async () => {
        jewelsRepositoryMock.useValue.findOne.mockResolvedValue(jewelsMock[1])

        const response = await request(app.getHttpServer()).get(`/jewels/${jewelsMock[1].id}`)

   

        expect(response.statusCode).toEqual(200)
    })
  })

  describe('Update', () =>{
    it('should be update jewel', async () => {
        const response = await request(app.getHttpServer()).patch(`/jewels/${jewelsMock[4].id}`).send(updateJewelsMock)

        console.log('Error', response.error)
        console.log('Status Code', response.statusCode)

        expect(response.statusCode).toEqual(200)
        expect(response.body['active']).toEqual(updateJewelsMock.active)
    })
  })
});
