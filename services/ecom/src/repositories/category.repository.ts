import { inject } from '@loopback/core';
// import {DefaultCrudRepository} from '@loopback/repository';
import { SequelizeCrudRepository } from '@loopback/sequelize';

import { EcomDataSource } from '../datasources';
import { Category, CategoryRelations } from '../models';

export class CategoryRepository extends SequelizeCrudRepository<
  Category,
  typeof Category.prototype.id,
  CategoryRelations
> {
  constructor(
    @inject('datasources.ecom') dataSource: EcomDataSource,
  ) {
    super(Category, dataSource);
  }
}
