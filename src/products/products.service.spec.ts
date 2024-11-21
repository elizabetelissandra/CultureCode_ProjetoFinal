import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { productsRepositoryMock } from '../testing/products/products-repository.mock';
import { userRepositoryMock } from '../testing/users/user-repository.mock';
import { createProductMock } from '../testing/products/create-product.mock';
import { userDecoratorMock } from '../testing/users/user-decorator.mock';
import { updateProductMock } from '../testing/products/update-product.mock';
import { Product } from '../database/entities/products.entity';
import { productsMock } from 'src/testing/products/products-mock';

describe('ProductsService', () => {
  let productService: ProductsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService, productsRepositoryMock, userRepositoryMock],
    }).compile();

    productService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
  });

  describe('Create', () => {
    it('should be create product', async () =>{
      jest.spyOn(productService, 'findName').mockResolvedValueOnce(null)
      const product = await productService.create(createProductMock)
      

      expect(product).toHaveProperty('id')
    })

    it('should be reward', async () => {
      const reward = await productService.reward(7, userDecoratorMock)
      

      expect(reward).toHaveProperty('message')
    })
  })

  describe('Read', () => {
    it('should be find product by id', async () => {
      const product = await productService.productById(7)

      expect(product.name).toContain('Productivity Planner')
      expect(product.deleteAt).toBeNull()
    })

    it('should be find product name', async () =>{
      const product = await productService.findName('Productivity Planner')

      expect(product).toHaveProperty('id')
      expect(product.deleteAt).toBeNull()
    })
  })

  describe('Update', () => {
    it('should be update product', async () => {
      // jest.spyOn(productService, 'update').mockResolvedValue(productsMock)
      const product = await productService.update(7, updateProductMock)
      console.log(product)
      expect(product['price']).toEqual(updateProductMock.price)
      expect(product['deleteAt']).toBeNull()
    })
  })

  describe('Delete', () => {
    it('should be delete product', async () => {
      const product = await productService.delete(4)

      expect(product).toHaveProperty('message')
      console.log(product)
    })
  })
});
