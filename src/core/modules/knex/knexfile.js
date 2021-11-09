import { ConfigService } from 'package/config';
import '../../config/config-service.config';

require('dotenv').config();

export const knexConfig = {
    development: {
        client: ConfigService.getSingleton().get('DB_TYPE'),
        connection: {
            host: ConfigService.getSingleton().get('DB_HOST'),
            port: ConfigService.getSingleton().get('DB_PORT'),
            user: ConfigService.getSingleton().get('DB_USER'),
            password: ConfigService.getSingleton().get('DB_PASS'),
            database: ConfigService.getSingleton().get('DB_NAME'),
            charset: 'utf8'
        },
        migrations: {
            directory: `${__dirname}/src/config/knex/migrations`,
        },
        seeds: {
            directory: `${__dirname}/src/config/knex/seeds`
        },
    },

    staging: {
        client: ConfigService.getSingleton().get('DB_TYPE'),
        connection: {
            host: ConfigService.getSingleton().get('DB_HOST'),
            port: ConfigService.getSingleton().get('DB_PORT'),
            user: ConfigService.getSingleton().get('DB_USER'),
            password: ConfigService.getSingleton().get('DB_PASS'),
            database: `${ConfigService.getSingleton().get('DB_NAME')}_staging`,
            charset: 'utf8'
        },
        migrations: {
            directory: `${__dirname}/src/config/knex/migrations`,
        },
        seeds: {
            directory: `${__dirname}/src/config/knex/seeds`
        }
    },
};
