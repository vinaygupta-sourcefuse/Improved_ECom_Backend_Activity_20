import {
    ModifiedRestService,
    OPERATION_SECURITY_SPEC,
    rateLimitKeyGenPublic,
    restService,
    STATUS_CODE,
  } from '@sourceloop/core';
  import {
    authenticate,
    STRATEGY,
  } from 'loopback4-authentication';
  import {
    authorize,
  } from 'loopback4-authorization';
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
  import {
    Filter,
    FilterExcludingWhere,
    Where,
    Count,
    CountSchema,
  } from '@loopback/repository';
  
  import {ratelimit} from 'loopback4-ratelimiter';
  import {Order} from '../models';
  
  export class OrderController {
    constructor(
      @restService(Order) public orderService: ModifiedRestService<Order>,
    ) {}
  
    @authenticate(STRATEGY.BEARER)
    @authorize({permissions: ['*']})
    @ratelimit(true, {
      max: +(process.env.AUTHENTICATION_RATE_LIMIT ?? '0'),
      keyGenerator: rateLimitKeyGenPublic,
    })
    @post('/orders', {
      security: OPERATION_SECURITY_SPEC,
      responses: {
        [STATUS_CODE.OK]: {
          description: 'Order model instance',
          content: {'application/json': {schema: getModelSchemaRef(Order)}},
        },
      },
    })
    async create(
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Order, {
              title: 'NewOrder',
            }),
          },
        },
      })
      order: Order,
    ): Promise<Order> {
      return this.orderService.create(order);
    }
  
    @authenticate(STRATEGY.BEARER)
    @authorize({permissions: ['*']})
    @ratelimit(true, {
      max: +(process.env.AUTHENTICATION_RATE_LIMIT ?? '0'),
      keyGenerator: rateLimitKeyGenPublic,
    })
    @get('/orders/count', {
      security: OPERATION_SECURITY_SPEC,
      responses: {
        [STATUS_CODE.OK]: {
          description: 'Order count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(@param.where(Order) where?: Where<Order>): Promise<Count> {
      return this.orderService.count(where);
    }
  
    @authenticate(STRATEGY.BEARER)
    @authorize({permissions: ['*']})
    @ratelimit(true, {
      max: +(process.env.AUTHENTICATION_RATE_LIMIT ?? '0'),
      keyGenerator: rateLimitKeyGenPublic,
    })
    @get('/orders', {
      security: OPERATION_SECURITY_SPEC,
      responses: {
        [STATUS_CODE.OK]: {
          description: 'Array of Order model instances',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: getModelSchemaRef(Order, {includeRelations: true}),
              },
            },
          },
        },
      },
    })
    async find(@param.filter(Order) filter?: Filter<Order>): Promise<Order[]> {
      return this.orderService.find(filter);
    }
  
    @authenticate(STRATEGY.BEARER)
    @authorize({permissions: ['*']})
    @ratelimit(true, {
      max: +(process.env.AUTHENTICATION_RATE_LIMIT ?? '0'),
      keyGenerator: rateLimitKeyGenPublic,
    })
    @patch('/orders', {
      security: OPERATION_SECURITY_SPEC,
      responses: {
        [STATUS_CODE.OK]: {
          description: 'Order PATCH success count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async updateAll(
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Order, {partial: true}),
          },
        },
      })
      order: Order,
      @param.where(Order) where?: Where<Order>,
    ): Promise<Count> {
      return this.orderService.update(order, where);
    }
  
    @authenticate(STRATEGY.BEARER)
    @authorize({permissions: ['*']})
    @ratelimit(true, {
      max: +(process.env.AUTHENTICATION_RATE_LIMIT ?? '0'),
      keyGenerator: rateLimitKeyGenPublic,
    })
    @get('/orders/{id}', {
      security: OPERATION_SECURITY_SPEC,
      responses: {
        [STATUS_CODE.OK]: {
          description: 'Order instance',
          content: {
            'application/json': {
              schema: getModelSchemaRef(Order, {includeRelations: true}),
            },
          },
        },
      },
    })
    async findById(
      @param.path.string('id') id: string,
      @param.filter(Order, {exclude: 'where'}) filter?: FilterExcludingWhere<Order>,
    ): Promise<Order> {
      return this.orderService.findById(id, filter);
    }
  
    @authenticate(STRATEGY.BEARER)
    @authorize({permissions: ['*']})
    @ratelimit(true, {
      max: +(process.env.AUTHENTICATION_RATE_LIMIT ?? '0'),
      keyGenerator: rateLimitKeyGenPublic,
    })
    @patch('/orders/{id}', {
      security: OPERATION_SECURITY_SPEC,
      responses: {
        [STATUS_CODE.NO_CONTENT]: {
          description: 'Order PATCH success',
        },
      },
    })
    async updateById(
      @param.path.string('id') id: string,
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Order, {partial: true}),
          },
        },
      })
      order: Order,
    ): Promise<void> {
      await this.orderService.updateById(id, order);
    }
  
    @authenticate(STRATEGY.BEARER)
    @authorize({permissions: ['*']})
    @ratelimit(true, {
      max: +(process.env.AUTHENTICATION_RATE_LIMIT ?? '0'),
      keyGenerator: rateLimitKeyGenPublic,
    })
    @put('/orders/{id}', {
      security: OPERATION_SECURITY_SPEC,
      responses: {
        [STATUS_CODE.NO_CONTENT]: {
          description: 'Order PUT success',
        },
      },
    })
    async replaceById(
      @param.path.string('id') id: string,
      @requestBody() order: Order,
    ): Promise<void> {
      await this.orderService.replaceById(id, order);
    }
  
    @authenticate(STRATEGY.BEARER)
    @authorize({permissions: ['*']})
    @ratelimit(true, {
      max: +(process.env.AUTHENTICATION_RATE_LIMIT ?? '0'),
      keyGenerator: rateLimitKeyGenPublic,
    })
    @del('/orders/{id}', {
      security: OPERATION_SECURITY_SPEC,
      responses: {
        [STATUS_CODE.NO_CONTENT]: {
          description: 'Order DELETE success',
        },
      },
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
      await this.orderService.deleteById(id);
    }
  }
  