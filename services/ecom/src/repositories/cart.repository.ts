import {inject} from '@loopback/core';
// import {DefaultCrudRepository} from '@loopback/repository'; 
import {SequelizeCrudRepository} from '@loopback/sequelize';
import {EcomDataSource} from '../datasources';
import {Cart} from '../models/cart.model';

export class CartRepository extends SequelizeCrudRepository<
  Cart,
  typeof Cart.prototype.id
> {
  constructor(
    @inject('datasources.ecom') dataSource: EcomDataSource,
  ) {
    super(Cart, dataSource);
  }
}
