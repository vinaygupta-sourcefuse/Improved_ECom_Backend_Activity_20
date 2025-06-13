import {Entity, model, property} from '@loopback/repository';

@model()
export class Orderitem extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  productsId: string[];

  constructor(data?: Partial<Orderitem>) {
    super(data);
  }
}

export interface OrderitemRelations {
  // describe navigational properties here
}

export type OrderitemWithRelations = Orderitem & OrderitemRelations;
