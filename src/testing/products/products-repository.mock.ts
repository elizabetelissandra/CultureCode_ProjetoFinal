import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../../database/entities';
import { productsMock } from './products-mock';
import { CategoryEnum } from '../../enum/category.enum';
import { updateProductMock } from './update-product.mock';

export const productsRepositoryMock = {
  provide: getRepositoryToken(Product),
  useValue: {
    create: jest.fn().mockResolvedValue({
      id: 1,
      name: 'Caixa de Som',
      price: 89,
      category: CategoryEnum.tech,
      inStock: true,
    }),
    findOne: jest.fn().mockResolvedValue(productsMock[3]),
    save: jest.fn(),
    update: jest
      .fn()
      .mockResolvedValue({...productsMock[3], ...updateProductMock}),
    delete: jest.fn().mockResolvedValue(productsMock[2]),
  },
};
