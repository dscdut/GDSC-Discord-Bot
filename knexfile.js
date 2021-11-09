import './src/core/config/config-service.config';
import { ConfigService } from './src/package/config/config.service';

module.exports = {
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
            directory: `${__dirname}/src/core/database/migrations`,
        },
        seeds: {
            directory: `${__dirname}/src/core/database/seeds`
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
            directory: `${__dirname}/src/core/database/migrations`,
        },
        seeds: {
            directory: `${__dirname}/src/core/database/seeds`
        }
    },
};
