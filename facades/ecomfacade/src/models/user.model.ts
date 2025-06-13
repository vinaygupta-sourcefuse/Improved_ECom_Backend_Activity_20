import {Entity, model, property} from '@loopback/repository';

@model()
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  user_id?: number;

  @property({
    type: 'string',
    id: true,
    required: true,
  })
  username: string;

  @property({
    type: 'string',
     jsonSchema: {
      pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}$',
    },
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  role: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: false,
    default: ['2'],
  })
  permissions: string[];

  @property({
    type: 'string',
    required: false,
  })
  google_user_id?: string;
  
  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
