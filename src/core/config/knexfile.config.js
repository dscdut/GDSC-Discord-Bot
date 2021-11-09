import dotenv from 'dotenv';

dotenv.config({ path: `${__dirname}/../../../.env` });

module.exports = {
    development: {
        client: process.env.DB_TYPE,
        connection: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            charset: 'utf8'
        },
        migrations: {
            directory: `${__dirname}/../database/migrations`,
        },
        seeds: {
            directory: `${__dirname}/../database/seeds`
        },
    },

    staging: {
        client: process.env.DB_TYPE,
        connection: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: `${process.env.DB_NAME}_staging`,
            charset: 'utf8',
        },
        migrations: {
            directory: `${__dirname}/../database/migrations`,
        },
        seeds: {
            directory: `${__dirname}/../database/seeds`
        }
    },
};