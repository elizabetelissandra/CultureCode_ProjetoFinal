import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../../database/entities';
import { productsMock } from './products-mock';
import { updateProductMock } from './update-product.mock';
import { responseCreateProductMock } from './response-create-product-mock';

export const productsRepositoryMock = {
  provide: getRepositoryToken(Product),
  useValue: {
    create: jest.fn().mockResolvedValue(responseCreateProductMock),
    findOne: jest.fn().mockResolvedValue(productsMock[3]),
    save: jest.fn(),
    update: jest
      .fn()
      .mockResolvedValue({...productsMock[3], ...updateProductMock}),
    delete: jest.fn().mockResolvedValue(productsMock[2]),
  },
};
