import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Cart} from '../models/cart.model';
import {CartRepository} from '../repositories';
import { authorize } from 'loopback4-authorization';

export class CartController {
  constructor(
    @repository(CartRepository)
    public cartRepository : CartRepository,
  ) {}

  @authorize({permissions: ['*']})
  @post('/carts')
  @response(200, {
    description: 'Cart model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cart)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cart, {
            title: 'NewCart',
            
          }),
        },
      },
    })
    cart: Cart,
  ): Promise<Cart> {
    return this.cartRepository.create(cart);
  }

  @authorize({permissions: ['*']})
  @get('/carts/count')
  @response(200, {
    description: 'Cart model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Cart) where?: Where<Cart>,
  ): Promise<Count> {
    return this.cartRepository.count(where);
  }

  @authorize({permissions: ['*']})
  @get('/carts')
  @response(200, {
    description: 'Array of Cart model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cart, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Cart) filter?: Filter<Cart>,
  ): Promise<Cart[]> {
    return this.cartRepository.find(filter);
  }

  @authorize({permissions: ['*']})
  @patch('/carts')
  @response(200, {
    description: 'Cart PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cart, {partial: true}),
        },
      },
    })
    cart: Cart,
    @param.where(Cart) where?: Where<Cart>,
  ): Promise<Count> {
    return this.cartRepository.updateAll(cart, where);
  }

  @authorize({permissions: ['*']})
  @get('/carts/{id}')
  @response(200, {
    description: 'Cart model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cart, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Cart, {exclude: 'where'}) filter?: FilterExcludingWhere<Cart>
  ): Promise<Cart> {
    return this.cartRepository.findById(id, filter);
  }

  @authorize({permissions: ['*']})
  @patch('/carts/{id}')
  @response(204, {
    description: 'Cart PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cart, {partial: true}),
        },
      },
    })
    cart: Cart,
  ): Promise<void> {
    await this.cartRepository.updateById(id, cart);
  }

  @authorize({permissions: ['*']})
  @put('/carts/{id}')
  @response(204, {
    description: 'Cart PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cart: Cart,
  ): Promise<void> {
    await this.cartRepository.replaceById(id, cart);
  }

  @authorize({permissions: ['*']})
  @del('/carts/{id}')
  @response(204, {
    description: 'Cart DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.cartRepository.deleteById(id);
  }
}
