import { inject } from '@loopback/core';
// import {DefaultCrudRepository} from '@loopback/repository';
import { SequelizeCrudRepository } from '@loopback/sequelize';
import { EcomDataSource } from '../datasources';
import { Order, OrderRelations } from '../models';

export class OrderRepository extends SequelizeCrudRepository<
  Order,
  typeof Order.prototype.id,
  OrderRelations
> {
  constructor(
    @inject('datasources.ecom') dataSource: EcomDataSource,
  ) {
    super(Order, dataSource);
  }
}
