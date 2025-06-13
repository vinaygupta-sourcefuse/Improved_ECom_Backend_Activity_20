import { BootMixin } from '@loopback/boot';
import { ApplicationConfig } from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import * as dotenv from 'dotenv';
import * as dotenvExt from 'dotenv-extended';
import { AuthenticationComponent, Strategies } from 'loopback4-authentication';
import {
  AuthorizationBindings,
  AuthorizationComponent,
} from 'loopback4-authorization';
import { HelmetSecurityBindings } from 'loopback4-helmet';
import { RateLimitSecurityBindings } from 'loopback4-ratelimiter';
import {
  CoreComponent,
  SecureSequence,
  rateLimitKeyGen,
  AuthCacheSourceName,
  SFCoreBindings,
  BearerVerifierBindings,
  BearerVerifierComponent,
  BearerVerifierConfig,
  BearerVerifierType,
  SECURITY_SCHEME_SPEC,
  ProxyBuilderBindings,
  ProxyBuilderComponent,
} from '@sourceloop/core';
import { RepositoryMixin } from '@loopback/repository';
import { RestApplication } from '@loopback/rest';
import { ServiceMixin } from '@loopback/service-proxy';
import path from 'path';
import * as openapi from './openapi.json';
import { Cart, Product, Order, Orderitem, Category } from './models';
import { BearerTokenVerifyProvider } from './provider/bearer-token-verify.provider';

export { ApplicationConfig };

export class EcomfacadeApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    const port = 3000;
    dotenv.config();
    dotenvExt.load({
      schema: '.env.example',
      errorOnMissing: process.env.NODE_ENV !== 'test',
      includeProcessEnv: true,
    });
    options.rest = options.rest ?? {};
    options.rest.basePath = process.env.BASE_PATH ?? '';
    options.rest.port = +(process.env.PORT ?? port);
    options.rest.host = process.env.HOST;
    options.rest.openApiSpec = {
      endpointMapping: {
        [`${options.rest.basePath}/openapi.json`]: {
          version: '3.0.0',
          format: 'json',
        },
      },
    };

    super(options);

    // To check if monitoring is enabled from env or not
    const enableObf = !!+(process.env.ENABLE_OBF ?? 0);
    // To check if authorization is enabled for swagger stats or not
    const authentication =
      process.env.SWAGGER_USER && process.env.SWAGGER_PASSWORD ? true : false;
    const obj = {
      enableObf,
      obfPath: process.env.OBF_PATH ?? '/obf',
      openapiSpec: openapi,
      authentication: authentication,
      swaggerUsername: process.env.SWAGGER_USER,
      swaggerPassword: process.env.SWAGGER_PASSWORD,

    }
    this.bind(SFCoreBindings.config).to(obj);
    this.component(CoreComponent);

    // Set up the custom sequence
    this.sequence(SecureSequence);

    this.bind(HelmetSecurityBindings.CONFIG).to({
      referrerPolicy: {
        policy: 'same-origin',
      },
      contentSecurityPolicy: {
        directives: {
          frameSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
        },
      },
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
      },
    });

    this.bind(RateLimitSecurityBindings.CONFIG).to({
      name: AuthCacheSourceName,
      max: parseInt(process.env.RATE_LIMIT_REQUEST_CAP ?? '100'),
      keyGenerator: rateLimitKeyGen,
    });

    // Add authentication component
    this.component(AuthenticationComponent);

    // Add bearer verifier component
    this.bind(BearerVerifierBindings.Config).to({
      type: BearerVerifierType.facade,
    } as BearerVerifierConfig);
    this.component(BearerVerifierComponent);

    this.bind(Strategies.Passport.BEARER_TOKEN_VERIFIER).toProvider(
      BearerTokenVerifyProvider,
    );

    // Add authorization component
    this.bind(AuthorizationBindings.CONFIG).to({
      allowAlwaysPaths: ['/explorer', '/openapi.json'],
    });
    this.component(AuthorizationComponent);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });

    this.bind(ProxyBuilderBindings.CONFIG).to(
      [
        {
          baseUrl: `http://127.0.0.1:3012`,
          configs: [
            {
              model: Cart,
              basePath: '/carts',
            },
          ],
        },
        {
          baseUrl: `http://localhost:3012`,
          configs: [
            {
              model: Product,
              basePath: '/products',
            },
          ],
        },
        {
          baseUrl: `http://localhost:3012`,
          configs: [
            {
              model: Order,
              basePath: '/orders',
            },
          ],
        },
        {
          baseUrl: `http://localhost:3012`,
          configs: [
            {
              model: Orderitem,
              basePath: '/orderitems',
            },
          ],
        },
        {
          baseUrl: `http://localhost:3012`,
          configs: [
            {
              model: Category,
              basePath: '/categories',
            },
          ],
        },
        //  {
        //    baseUrl: `http://localhost:3045`,
        //    configs: [
        //      {
        //        model: Notifications,
        //        basePath: '/notifications',
        //      },
        //    ],
        //  },
        //  {
        //    baseUrl: `http://localhost:3011`,
        //    configs: [
        //      {
        //        model: User,
        //        basePath: '/users',
        //      },
        //    ],
        //  },
      ]);
    this.component(RestExplorerComponent);
    this.component(ProxyBuilderComponent);



    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

    this.api({
      openapi: '3.0.0',
      info: {
        title: 'ecomfacade',
        version: '1.0.0',
      },
      paths: {},
      components: {
        securitySchemes: SECURITY_SCHEME_SPEC,
      },
      servers: [{ url: '/' }],
    });
  }
}
