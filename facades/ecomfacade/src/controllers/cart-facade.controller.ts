import {
    ModifiedRestService,
    OPERATION_SECURITY_SPEC,
    STATUS_CODE,
    rateLimitKeyGenPublic,
    restService,
  } from '@sourceloop/core';
  import {
    authenticate,
    STRATEGY,
  } from 'loopback4-authentication';
  import {authorize} from 'loopback4-authorization';
  import {
    del,
    get,
    getModelSchemaRef,
    param,
    patch,
    post,
    put,
    requestBody,
  } from '@loopback/rest';
  import {Filter, FilterExcludingWhere, Where} from '@loopback/repository';
  import {ratelimit} from 'loopback4-ratelimiter';
  
  import {Cart} from '../models/cart.model';
  
  export class CartFacadeController {
    constructor(
      @restService(Cart) public cartService: ModifiedRestService<Cart>,
    ) {}
  
    @authenticate(STRATEGY.BEARER)
    @authorize({permissions: ['*']})
    @ratelimit(true, {
      max: +(process.env.AUTHENTICATION_RATE_LIMIT ?? '0'),
      keyGenerator: rateLimitKeyGenPublic,
    })
    @post('/carts', {
      security: OPERATION_SECURITY_SPEC,
      responses: {
        [STATUS_CODE.OK]: {
          description: 'Cart model instance',
          content: {'application/json': {schema: getModelSchemaRef(Cart)}},
        },
      },
    })
    async create(
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cart, {title: 'NewCart'}),
          },
        },
      })
      cart: Cart,
    ): Promise<Cart> {
      return this.cartService.create(cart);
    }
  
    @authenticate(STRATEGY.BEARER)
    @authorize({permissions: ['*']})
    @ratelimit(true, {
      max: +(process.env.AUTHENTICATION_RATE_LIMIT ?? '0'),
      keyGenerator: rateLimitKeyGenPublic,
    })
    @get('/carts/count', {
      security: OPERATION_SECURITY_SPEC,
      responses: {
        [STATUS_CODE.OK]: {
          description: 'Cart model count',
          content: {'application/json': {schema: {type: 'object', properties: {count: {type: 'number'}}}}},
        },
      },
    })
    async count(
      @param.where(Cart) where?: Where<Cart>,
    ): Promise<{count: number}> {
      return this.cartService.count(where);
    }
  
    @authenticate(STRATEGY.BEARER)
    @authorize({permissions: ['*']})
    @ratelimit(true, {
      max: +(process.env.AUTHENTICATION_RATE_LIMIT ?? '0'),
      keyGenerator: rateLimitKeyGenPublic,
    })
    @get('/carts', {
      security: OPERATION_SECURITY_SPEC,
      responses: {
        [STATUS_CODE.OK]: {
          description: 'Array of Cart model instances',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: getModelSchemaRef(Cart, {includeRelations: true}),
              },
            },
          },
        },
      },
    })
    async find(
      @param.filter(Cart) filter?: Filter<Cart>,
    ): Promise<Cart[]> {
      return this.cartService.find(filter);
    }
  
    @authenticate(STRATEGY.BEARER)
    @authorize({permissions: ['*']})
    @ratelimit(true, {
      max: +(process.env.AUTHENTICATION_RATE_LIMIT ?? '0'),
      keyGenerator: rateLimitKeyGenPublic,
    })
    @patch('/carts', {
      security: OPERATION_SECURITY_SPEC,
      responses: {
        [STATUS_CODE.OK]: {
          description: 'Cart PATCH success count',
          content: {'application/json': {schema: {type: 'object', properties: {count: {type: 'number'}}}}},
        },
      },
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
    ): Promise<{count: number}> {
      return this.cartService.update(cart, where);
    }
  
    @authenticate(STRATEGY.BEARER)
    @authorize({permissions: ['*']})
    @ratelimit(true, {
      max: +(process.env.AUTHENTICATION_RATE_LIMIT ?? '0'),
      keyGenerator: rateLimitKeyGenPublic,
    })
    @get('/carts/{id}', {
      security: OPERATION_SECURITY_SPEC,
      responses: {
        [STATUS_CODE.OK]: {
          description: 'Cart model instance',
          content: {
            'application/json': {
              schema: getModelSchemaRef(Cart, {includeRelations: true}),
            },
          },
        },
      },
    })
    async findById(
      @param.path.string('id') id: string,
      @param.filter(Cart, {exclude: 'where'}) filter?: FilterExcludingWhere<Cart>,
    ): Promise<Cart> {
      return this.cartService.findById(id, filter);
    }
  
    @authenticate(STRATEGY.BEARER)
    @authorize({permissions: ['*']})
    @ratelimit(true, {
      max: +(process.env.AUTHENTICATION_RATE_LIMIT ?? '0'),
      keyGenerator: rateLimitKeyGenPublic,
    })
    @patch('/carts/{id}', {
      security: OPERATION_SECURITY_SPEC,
      responses: {
        [STATUS_CODE.NO_CONTENT]: {
          description: 'Cart PATCH success',
        },
      },
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
      await this.cartService.updateById(id, cart);
    }
  
    @authenticate(STRATEGY.BEARER)
    @authorize({permissions: ['*']})
    @ratelimit(true, {
      max: +(process.env.AUTHENTICATION_RATE_LIMIT ?? '0'),
      keyGenerator: rateLimitKeyGenPublic,
    })
    @put('/carts/{id}', {
      security: OPERATION_SECURITY_SPEC,
      responses: {
        [STATUS_CODE.NO_CONTENT]: {
          description: 'Cart PUT success',
        },
      },
    })
    async replaceById(
      @param.path.string('id') id: string,
      @requestBody() cart: Cart,
    ): Promise<void> {
      await this.cartService.replaceById(id, cart);
    }
  
    @authenticate(STRATEGY.BEARER)
    @authorize({permissions: ['*']})
    @ratelimit(true, {
      max: +(process.env.AUTHENTICATION_RATE_LIMIT ?? '0'),
      keyGenerator: rateLimitKeyGenPublic,
    })
    @del('/carts/{id}', {
      security: OPERATION_SECURITY_SPEC,
      responses: {
        [STATUS_CODE.NO_CONTENT]: {
          description: 'Cart DELETE success',
        },
      },
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
      await this.cartService.deleteById(id);
    }
  }
  