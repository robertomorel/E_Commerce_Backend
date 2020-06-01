import { getRepository, Repository, In } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';
import AppError from '@shared/errors/AppError';
import Product from '../entities/Product';

interface IFindProducts {
  id: string;
}

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({
      name,
      price,
      quantity,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const findProduct = await this.ormRepository.findOne({
      where: { name },
    });

    return findProduct;
  }

  public async findAllById(products: IFindProducts[]): Promise<Product[]> {
    const foundProducts = this.ormRepository.find({
      where: {
        id: In(products.map(product => product.id)),
      },
    });

    return foundProducts;
  }

  public async findAll(): Promise<Product[]> {
    const foundProducts = await this.ormRepository.find();

    if (!foundProducts) {
      throw new AppError('There are no products on DB!');
    }

    return foundProducts;
  }

  public async updateQuantity(
    products: IUpdateProductsQuantityDTO[],
  ): Promise<Product[]> {
    const foundProducts = await this.findAllById(products);

    const newProducts = foundProducts.map(foundProduct => {
      const product = products.find(p => p.id === foundProduct.id);

      if (!product) {
        throw new AppError('Unexpected error!');
      }

      const newProduct = foundProduct;

      newProduct.quantity -= product.quantity;

      return newProduct;
    });

    await this.ormRepository.save(newProducts);

    return newProducts;
  }
}

export default ProductsRepository;
