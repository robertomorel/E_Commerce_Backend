import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

@injectable()
class FindAllCustomersService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute(): Promise<Customer[]> {
    const customers = await this.customersRepository.findAll();

    if (!customers) {
      throw new AppError('There era no customers on DB!');
    }

    return customers;
  }
}

export default FindAllCustomersService;
