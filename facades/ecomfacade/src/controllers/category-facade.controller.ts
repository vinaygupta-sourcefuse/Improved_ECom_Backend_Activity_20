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
  
  import {Category} from '../models';
  
  export class CategoryController {
    constructor(
      @restService(Category) public categoryService: ModifiedRestService<Category>,
    ) {}
  
    @authenticate(STRATEGY.BEARER)
    @authorize({permissions: ['*']})
    @ratelimit(true, {
      max: +(process.env.AUTHENTICATION_RATE_LIMIT ?? '0'),
      keyGenerator: rateLimitKeyGenPublic,
    })
    @post('/categories', {
      security: OPERATION_SECURITY_SPEC,
      responses: {
        [STATUS_CODE.OK]: {
          description: 'Category model instance',
          content: {'application/json': {schema: getModelSchemaRef(Category)}},
        },
      },
    })
    async create(
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Category, {
              title: 'NewCategory',
            }),
          },
        },
      })
      category: Category,
    ): Promise<Category> {
      return this.categoryService.create(category);
    }
  
    @authenticate(STRATEGY.BEARER)
    @authorize({permissions: ['*']})
    @ratelimit(true, {
      max: +(process.env.AUTHENTICATION_RATE_LIMIT ?? '0'),
      keyGenerator: rateLimitKeyGenPublic,
    })
    @get('/categories/count', {
      security: OPERATION_SECURITY_SPEC,
      responses: {
        [STATUS_CODE.OK]: {
          description: 'Category count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(@param.where(Category) where?: Where<Category>): Promise<Count> {
      return this.categoryService.count(where);
    }
  
    @authenticate(STRATEGY.BEARER)
    @authorize({permissions: ['*']})
    @ratelimit(true, {
      max: +(process.env.AUTHENTICATION_RATE_LIMIT ?? '0'),
      keyGenerator: rateLimitKeyGenPublic,
    })
    @get('/categories', {
      security: OPERATION_SECURITY_SPEC,
      responses: {
        [STATUS_CODE.OK]: {
          description: 'Array of Category instances',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: getModelSchemaRef(Category, {includeRelations: true}),
              },
            },
          },
        },
      },
    })
    async find(@param.filter(Category) filter?: Filter<Category>): Promise<Category[]> {
      return this.categoryService.find(filter);
    }
  
    @authenticate(STRATEGY.BEARER)
    @authorize({permissions: ['*']})
    @ratelimit(true, {
      max: +(process.env.AUTHENTICATION_RATE_LIMIT ?? '0'),
      keyGenerator: rateLimitKeyGenPublic,
    })
    @patch('/categories', {
      security: OPERATION_SECURITY_SPEC,
      responses: {
        [STATUS_CODE.OK]: {
          description: 'Category PATCH success count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async updateAll(
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Category, {partial: true}),
          },
        },
      })
      category: Category,
      @param.where(Category) where?: Where<Category>,
    ): Promise<Count> {
      return this.categoryService.update(category, where);
    }
  
    @authenticate(STRATEGY.BEARER)
    @authorize({permissions: ['*']})
    @ratelimit(true, {
      max: +(process.env.AUTHENTICATION_RATE_LIMIT ?? '0'),
      keyGenerator: rateLimitKeyGenPublic,
    })
    @get('/categories/{id}', {
      security: OPERATION_SECURITY_SPEC,
      responses: {
        [STATUS_CODE.OK]: {
          description: 'Category instance',
          content: {
            'application/json': {
              schema: getModelSchemaRef(Category, {includeRelations: true}),
            },
          },
        },
      },
    })
    async findById(
      @param.path.number('id') id: number,
      @param.filter(Category, {exclude: 'where'}) filter?: FilterExcludingWhere<Category>,
    ): Promise<Category> {
      return this.categoryService.findById(`${id}`, filter);
    }
  
    @authenticate(STRATEGY.BEARER)
    @authorize({permissions: ['*']})
    @ratelimit(true, {
      max: +(process.env.AUTHENTICATION_RATE_LIMIT ?? '0'),
      keyGenerator: rateLimitKeyGenPublic,
    })
    @patch('/categories/{id}', {
      security: OPERATION_SECURITY_SPEC,
      responses: {
        [STATUS_CODE.NO_CONTENT]: {
          description: 'Category PATCH success',
        },
      },
    })
    async updateById(
      @param.path.number('id') id: number,
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Category, {partial: true}),
          },
        },
      })
      category: Category,
    ): Promise<void> {
      await this.categoryService.updateById(`${id}`, category);
    }
  
    @authenticate(STRATEGY.BEARER)
    @authorize({permissions: ['*']})
    @ratelimit(true, {
      max: +(process.env.AUTHENTICATION_RATE_LIMIT ?? '0'),
      keyGenerator: rateLimitKeyGenPublic,
    })
    @put('/categories/{id}', {
      security: OPERATION_SECURITY_SPEC,
      responses: {
        [STATUS_CODE.NO_CONTENT]: {
          description: 'Category PUT success',
        },
      },
    })
    async replaceById(
      @param.path.number('id') id: number,
      @requestBody() category: Category,
    ): Promise<void> {
      await this.categoryService.replaceById(`${id}`, category);
    }
  
    @authenticate(STRATEGY.BEARER)
    @authorize({permissions: ['*']})
    @ratelimit(true, {
      max: +(process.env.AUTHENTICATION_RATE_LIMIT ?? '0'),
      keyGenerator: rateLimitKeyGenPublic,
    })
    @del('/categories/{id}', {
      security: OPERATION_SECURITY_SPEC,
      responses: {
        [STATUS_CODE.NO_CONTENT]: {
          description: 'Category DELETE success',
        },
      },
    })
    async deleteById(@param.path.number('id') id: number): Promise<void> {
      await this.categoryService.deleteById(`${id}`);
    }
  }
  