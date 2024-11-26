import { ProductsService } from "../../products/products.service";
import { productsMock } from "./products-mock";
import { responseCreateProductMock } from "./response-create-product-mock";
import { updateProductMock } from "./update-product.mock";

export const productServiceMock = {
    provide: ProductsService,
    useValue: {
        create: jest.fn().mockResolvedValue(responseCreateProductMock),
        reward: jest.fn().mockResolvedValue({message: 'Product purchased successfully'}),
        productById: jest.fn().mockResolvedValue(productsMock[2]),
        update: jest.fn().mockResolvedValue({...productsMock[1], ...updateProductMock}),
        delete: jest.fn().mockResolvedValue({message: 'Product deleted'}),
    }
}