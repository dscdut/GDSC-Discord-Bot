import knex from 'knex';
import { ConfigService } from 'package/config';
import { logger } from 'package/logger';
import knexConfig from '../config/knexfile.config';

const environment = ConfigService.getSingleton().get('NODE_ENV') || 'development';
const config = knexConfig[environment];

const connection = knex(config);
export default connection;

export const getTransaction = () => connection.transaction();

export const connectDatabase = async () => {
    try {
        await connection.raw('SELECT 1');
        logger.info('Database connected successfully');
    } catch (error) {
        logger.error('Database connection error, please check your connection');
    }
};
