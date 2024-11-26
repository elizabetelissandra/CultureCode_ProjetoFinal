import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsModule } from './products.module';
import { productsRepositoryMock } from '../testing/products/products-repository.mock';
import { AuthGuard } from '../auth/guards/auth.guard';
import { authGuardMock } from '../testing/auth/auth-guard.mock';
import { userRepositoryMock } from '../testing/users/user-repository.mock';
import * as request from 'supertest';
import { createProductMock } from '../testing/products/create-product.mock';
import { productsMock } from '../testing/products/products-mock';
import { updateProductMock } from '../testing/products/update-product.mock';

describe('Products Module', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ProductsModule],
    })
      .overrideProvider(productsRepositoryMock.provide)
      .useValue(productsRepositoryMock.useValue)
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
    it('should be create a product', async () => {
        jest.spyOn(productsRepositoryMock.useValue, 'findOne').mockResolvedValueOnce(null)

        const response = await request(app.getHttpServer()).post('/products/create').send(createProductMock)

        expect(response.statusCode).toEqual(201)
        expect(response.body).toHaveProperty('id')
    });

    it('should be reward a product', async () => {
        const response = await request(app.getHttpServer()).post(`/products/reward/${productsMock[3].id}`)

        expect(response.statusCode).toEqual(201)
        expect(response.body).toHaveProperty('message')
    })
  });

  describe('Read', () => {
    it('should be find product by id', async () => {
        const response = await request(app.getHttpServer()).get(`/products/${productsMock[0].id}`)

        

        expect(response.statusCode).toEqual(200)
        expect(response.body['name']).toEqual('Productivity Planner')
    })
  })

  describe('Update', () => {
    it('should be update a product', async () => {
        const response = await request(app.getHttpServer()).patch(`/products/${productsMock[1].id}`).send(updateProductMock)

        console.log('Error', response.error)
        console.log('Status Code', response.statusCode)

        expect(response.statusCode).toEqual(200)
        expect(response.body['price']).toEqual(updateProductMock.price)
    })
  })

  describe('Delete', () => {
    it('should be delete a product', async () => {
        const response = await request(app.getHttpServer()).delete(`/products/${productsMock[0].id}`)

        expect(response.statusCode).toEqual(200)
        expect(response.body).toHaveProperty('message')
    })
  })
});
