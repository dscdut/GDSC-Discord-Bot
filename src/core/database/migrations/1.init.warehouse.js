import { logger } from '../../../package/logger';

export async function up(knex) {
    logger.info('Migrating the DB with Warehouse table');
    await knex.schema.createTable('warehouse', table => {
        table.increments('id').primary();
        table.string('title').unique().notNullable();
        table.string('value').notNullable();
    });
}

export async function down(knex) {
    await knex.schema.dropTable('warehouse');
}
