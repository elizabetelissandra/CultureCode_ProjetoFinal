import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { productServiceMock } from '../testing/products/product-sevice.mock';
import { AuthGuard } from '../auth/guards/auth.guard';
import { authGuardMock } from '../testing/auth/auth-guard.mock';
import { createProductMock } from '../testing/products/create-product.mock';
import { userDecoratorMock } from '../testing/users/user-decorator.mock';
import { productsMock } from '../testing/products/products-mock';
import { updateProductMock } from '../testing/products/update-product.mock';

describe('ProductsController', () => {
  let productController: ProductsController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [productServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .compile();

    productController = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(productController).toBeDefined();
  });

  describe('Create', () => {
    it('should be create a product', async () => {
      const newProduct = await productController.create(createProductMock);

      expect(newProduct).toHaveProperty('id');
      expect(newProduct.deleteAt).toBeNull();
    });

    it('should be reward a product', async () => {
      const rewardProduct = await productController.reward(
        7,
        userDecoratorMock,
      );

      expect(rewardProduct).toHaveProperty('message');
    });
  });

  describe('Read', () => {
    it('should be find product by id', async () => {
      const product = await productController.productById(4);

      expect(product.name).toEqual('Standing Desk Converter');
      expect(product.deleteAt).toBeNull();
    });
  });
  describe('Update', () => {
    it('should be update product', async () => {
      const product = await productController.update(3, updateProductMock)

      expect(product['price']).toEqual(updateProductMock.price)
    })
  })
  describe('Delete', () => {
    it('should be delete product', async () => {
      const product = await productController.delete(8)

      expect(product.message).toEqual('Product deleted')
    })
  })
});
