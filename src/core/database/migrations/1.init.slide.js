import { logger } from '../../../package/logger';

export async function up(knex) {
    logger.info('Migrating the DB with slides table');
    await knex.schema.createTable('slides', table => {
        table.increments('id').primary();
        table.string('title').unique().notNullable();
        table.string('url').notNullable();
    });
}

export async function down(knex) {
    await knex.schema.dropTable('slides');
}
