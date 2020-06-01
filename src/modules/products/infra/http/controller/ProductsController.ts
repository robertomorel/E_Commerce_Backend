import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateProductService from '@modules/products/services/CreateProductService';
import FindAllProductService from '@modules/products/services/FindAllProductService';

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      name,
      price,
      quantity,
    });

    return response.json(product);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const findAllProducts = container.resolve(FindAllProductService);

    const products = await findAllProducts.execute();

    return response.json(products);
  }
}
