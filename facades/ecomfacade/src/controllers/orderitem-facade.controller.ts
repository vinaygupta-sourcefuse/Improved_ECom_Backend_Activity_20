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
  import {
    Count,
    CountSchema,
    Filter,
    FilterExcludingWhere,
    Where,
  } from '@loopback/repository';
  import {ratelimit} from 'loopback4-ratelimiter';
  
  import {Orderitem} from '../models';
  
  export class OrderitemController {
    constructor(
      @restService(Orderitem)
      public orderitemService: ModifiedRestService<Orderitem>,
    ) {}
  
    @authenticate(STRATEGY.BEARER)
    @authorize({permissions: ['*']})
    @ratelimit(true, {
      max: +(process.env.AUTHENTICATION_RATE_LIMIT ?? '0'),
      keyGenerator: rateLimitKeyGenPublic,
    })
    @post('/orderitems', {
      security: OPERATION_SECURITY_SPEC,
      responses: {
        [STATUS_CODE.OK]: {
          description: 'Orderitem model instance',
          content: {'application/json': {schema: getModelSchemaRef(Orderitem)}},
        },
      },
    })
    async create(
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Orderitem, {
              title: 'NewOrderitem',
            }),
          },
        },
      })
      orderitem: Orderitem,
    ): Promise<Orderitem> {
      return this.orderitemService.create(orderitem);
    }
  
    @authenticate(STRATEGY.BEARER)
    @authorize({permissions: ['*']})
    @ratelimit(true, {
      max: +(process.env.AUTHENTICATION_RATE_LIMIT ?? '0'),
      keyGenerator: rateLimitKeyGenPublic,
    })
    @get('/orderitems/count', {
      security: OPERATION_SECURITY_SPEC,
      responses: {
        [STATUS_CODE.OK]: {
          description: 'Orderitem count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(@param.where(Orderitem) where?: Where<Orderitem>): Promise<Count> {
      return this.orderitemService.count(where);
    }
  
    @authenticate(STRATEGY.BEARER)
    @authorize({permissions: ['*']})
    @ratelimit(true, {
      max: +(process.env.AUTHENTICATION_RATE_LIMIT ?? '0'),
      keyGenerator: rateLimitKeyGenPublic,
    })
    @get('/orderitems', {
      security: OPERATION_SECURITY_SPEC,
      responses: {
        [STATUS_CODE.OK]: {
          description: 'Array of Orderitem model instances',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: getModelSchemaRef(Orderitem, {includeRelations: true}),
              },
            },
          },
        },
      },
    })
    async find(
      @param.filter(Orderitem) filter?: Filter<Orderitem>,
    ): Promise<Orderitem[]> {
      return this.orderitemService.find(filter);
    }
  
    @authenticate(STRATEGY.BEARER)
    @authorize({permissions: ['*']})
    @ratelimit(true, {
      max: +(process.env.AUTHENTICATION_RATE_LIMIT ?? '0'),
      keyGenerator: rateLimitKeyGenPublic,
    })
    @patch('/orderitems', {
      security: OPERATION_SECURITY_SPEC,
      responses: {
        [STATUS_CODE.OK]: {
          description: 'Orderitem PATCH success count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async updateAll(
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Orderitem, {partial: true}),
          },
        },
      })
      orderitem: Orderitem,
      @param.where(Orderitem) where?: Where<Orderitem>,
    ): Promise<Count> {
      return this.orderitemService.update(orderitem, where);
    }
  
    @authenticate(STRATEGY.BEARER)
    @authorize({permissions: ['*']})
    @ratelimit(true, {
      max: +(process.env.AUTHENTICATION_RATE_LIMIT ?? '0'),
      keyGenerator: rateLimitKeyGenPublic,
    })
    @get('/orderitems/{id}', {
      security: OPERATION_SECURITY_SPEC,
      responses: {
        [STATUS_CODE.OK]: {
          description: 'Orderitem instance',
          content: {
            'application/json': {
              schema: getModelSchemaRef(Orderitem, {includeRelations: true}),
            },
          },
        },
      },
    })
    async findById(
      @param.path.string('id') id: string,
      @param.filter(Orderitem, {exclude: 'where'}) filter?: FilterExcludingWhere<Orderitem>,
    ): Promise<Orderitem> {
      return this.orderitemService.findById(id, filter);
    }
  
    @authenticate(STRATEGY.BEARER)
    @authorize({permissions: ['*']})
    @ratelimit(true, {
      max: +(process.env.AUTHENTICATION_RATE_LIMIT ?? '0'),
      keyGenerator: rateLimitKeyGenPublic,
    })
    @patch('/orderitems/{id}', {
      security: OPERATION_SECURITY_SPEC,
      responses: {
        [STATUS_CODE.NO_CONTENT]: {
          description: 'Orderitem PATCH success',
        },
      },
    })
    async updateById(
      @param.path.string('id') id: string,
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Orderitem, {partial: true}),
          },
        },
      })
      orderitem: Orderitem,
    ): Promise<void> {
      await this.orderitemService.updateById(id, orderitem);
    }
  
    @authenticate(STRATEGY.BEARER)
    @authorize({permissions: ['*']})
    @ratelimit(true, {
      max: +(process.env.AUTHENTICATION_RATE_LIMIT ?? '0'),
      keyGenerator: rateLimitKeyGenPublic,
    })
    @put('/orderitems/{id}', {
      security: OPERATION_SECURITY_SPEC,
      responses: {
        [STATUS_CODE.NO_CONTENT]: {
          description: 'Orderitem PUT success',
        },
      },
    })
    async replaceById(
      @param.path.string('id') id: string,
      @requestBody() orderitem: Orderitem,
    ): Promise<void> {
      await this.orderitemService.replaceById(id, orderitem);
    }
  
    @authenticate(STRATEGY.BEARER)
    @authorize({permissions: ['*']})
    @ratelimit(true, {
      max: +(process.env.AUTHENTICATION_RATE_LIMIT ?? '0'),
      keyGenerator: rateLimitKeyGenPublic,
    })
    @del('/orderitems/{id}', {
      security: OPERATION_SECURITY_SPEC,
      responses: {
        [STATUS_CODE.NO_CONTENT]: {
          description: 'Orderitem DELETE success',
        },
      },
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
      await this.orderitemService.deleteById(id);
    }
  }
  