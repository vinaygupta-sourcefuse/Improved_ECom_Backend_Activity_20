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
  
  import {Product} from '../models';
  
  export class ProductController {
    constructor(
      @restService(Product)
      public productService: ModifiedRestService<Product>,
    ) {}
  
    @authenticate(STRATEGY.BEARER)
    @authorize({permissions: ['*']})
    @ratelimit(true, {
      max: +(process.env.AUTHENTICATION_RATE_LIMIT ?? '0'),
      keyGenerator: rateLimitKeyGenPublic,
    })
    @post('/products', {
      security: OPERATION_SECURITY_SPEC,
      responses: {
        [STATUS_CODE.OK]: {
          description: 'Product model instance',
          content: {'application/json': {schema: getModelSchemaRef(Product)}},
        },
      },
    })
    async create(
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Product, {
              title: 'NewProduct',
            }),
          },
        },
      })
      product: Product,
    ): Promise<Product> {
      return this.productService.create(product);
    }
  
    @authenticate(STRATEGY.BEARER)
    @authorize({permissions: ['*']})
    @get('/products/count', {
      security: OPERATION_SECURITY_SPEC,
      responses: {
        [STATUS_CODE.OK]: {
          description: 'Product model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.where(Product) where?: Where<Product>,
    ): Promise<Count> {
      return this.productService.count(where);
    }
  
    @authenticate(STRATEGY.BEARER)
    @authorize({permissions: ['*']})
    @get('/products', {
      security: OPERATION_SECURITY_SPEC,
      responses: {
        [STATUS_CODE.OK]: {
          description: 'Array of Product model instances',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: getModelSchemaRef(Product, {includeRelations: true}),
              },
            },
          },
        },
      },
    })
    async find(
      @param.filter(Product) filter?: Filter<Product>,
    ): Promise<Product[]> {
      return this.productService.find(filter);
    }
  
    @authenticate(STRATEGY.BEARER)
    @authorize({permissions: ['*']})
    @patch('/products', {
      security: OPERATION_SECURITY_SPEC,
      responses: {
        [STATUS_CODE.OK]: {
          description: 'Product PATCH success count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async updateAll(
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Product, {partial: true}),
          },
        },
      })
      product: Product,
      @param.where(Product) where?: Where<Product>,
    ): Promise<Count> {
      return this.productService.update(product, where);
    }
  
    @authenticate(STRATEGY.BEARER)
    @authorize({permissions: ['*']})
    @get('/products/{id}', {
      security: OPERATION_SECURITY_SPEC,
      responses: {
        [STATUS_CODE.OK]: {
          description: 'Product model instance',
          content: {
            'application/json': {
              schema: getModelSchemaRef(Product, {includeRelations: true}),
            },
          },
        },
      },
    })
    async findById(
      @param.path.string('id') id: string,
      @param.filter(Product, {exclude: 'where'}) filter?: FilterExcludingWhere<Product>,
    ): Promise<Product> {
      return this.productService.findById(id, filter);
    }
  
    @authenticate(STRATEGY.BEARER)
    @authorize({permissions: ['*']})
    @patch('/products/{id}', {
      security: OPERATION_SECURITY_SPEC,
      responses: {
        [STATUS_CODE.NO_CONTENT]: {
          description: 'Product PATCH success',
        },
      },
    })
    async updateById(
      @param.path.string('id') id: string,
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Product, {partial: true}),
          },
        },
      })
      product: Product,
    ): Promise<void> {
      await this.productService.updateById(id, product);
    }
  
    @authenticate(STRATEGY.BEARER)
    @authorize({permissions: ['*']})
    @put('/products/{id}', {
      security: OPERATION_SECURITY_SPEC,
      responses: {
        [STATUS_CODE.NO_CONTENT]: {
          description: 'Product PUT success',
        },
      },
    })
    async replaceById(
      @param.path.string('id') id: string,
      @requestBody() product: Product,
    ): Promise<void> {
      await this.productService.replaceById(id, product);
    }
  
    @authenticate(STRATEGY.BEARER)
    @authorize({permissions: ['*']})
    @del('/products/{id}', {
      security: OPERATION_SECURITY_SPEC,
      responses: {
        [STATUS_CODE.NO_CONTENT]: {
          description: 'Product DELETE success',
        },
      },
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
      await this.productService.deleteById(id);
    }
  }
  