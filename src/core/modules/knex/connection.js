import knex from 'knex';
import { ConfigService } from 'package/config';
import { knexConfig } from '../../../../knexfile';

// const environment = ConfigService.getSingleton().get('NODE_ENV') || 'development';
const environment = 'development';
const config = knexConfig[environment];

export const dbService = knex(config);
