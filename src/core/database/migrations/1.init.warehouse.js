import { logger } from '../../../package/logger';

const vietnameseUnAccent = `CREATE OR REPLACE FUNCTION vn_unaccent(text)
RETURNS text AS
$func$
SELECT lower(translate($1,
'¹²³ÀÁẢẠÂẤẦẨẬẪÃÄÅÆàáảạâấầẩẫậãäåæĀāĂẮẰẲẴẶăắằẳẵặĄąÇçĆćĈĉĊċČčĎďĐđÈÉẸÊẾỀỄỆËèéẹêềếễệëĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨÌÍỈỊÎÏìíỉịîïĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłÑñŃńŅņŇňŉŊŋÒÓỎỌÔỐỒỔỖỘỐỒỔỖỘƠỚỜỞỠỢÕÖòóỏọôốồổỗộơớờỡợởõöŌōŎŏŐőŒœØøŔŕŖŗŘřßŚśŜŝŞşŠšŢţŤťŦŧÙÚỦỤƯỪỨỬỮỰÛÜùúủụûưứừửữựüŨũŪūŬŭŮůŰűŲųŴŵÝýÿŶŷŸŹźŻżŽžёЁ',
'123AAAAAAAAAAAAAAaaaaaaaaaaaaaaAaAAAAAAaaaaaaAaCcCcCcCcCcDdDdEEEEEEEEEeeeeeeeeeEeEeEeEeEeGgGgGgGgHhHhIIIIIIIiiiiiiiIiIiIiIiIiJjKkkLlLlLlLlLlNnNnNnNnnNnOOOOOOOOOOOOOOOOOOOOOOOooooooooooooooooooOoOoOoEeOoRrRrRrSSsSsSsSsTtTtTtUUUUUUUUUUUUuuuuuuuuuuuuUuUuUuUuUuUuWwYyyYyYZzZzZzеЕ'));
$func$ LANGUAGE sql IMMUTABLE;`;

const addTitleIndexing = `
ALTER TABLE warehouse ADD COLUMN title_tsv tsvector;

CREATE OR REPLACE FUNCTION warehouse_title_tsv_trigger_func()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.title_tsv = to_tsvector(vn_unaccent(NEW.title));
RETURN NEW;
END $$;

CREATE TRIGGER warehouse_title_tsv_trigger BEFORE INSERT OR UPDATE
OF title ON warehouse FOR EACH ROW
EXECUTE PROCEDURE warehouse_title_tsv_trigger_func();
`;
const removeTitleIndexing = `
  DROP FUNCTION IF EXISTS warehouse_title_tsv_trigger_func();
`;

export function up(knex) {
    logger.info('Migrating the DB with Warehouse table');
    return Promise.all([
        knex.schema.createTable('warehouse', table => {
            table.increments('id').primary();
            table.string('title').unique().notNullable();
            table.string('value').notNullable();
        })
            .then(() => knex.schema.raw(vietnameseUnAccent))
            . then(() => knex.schema.raw(addTitleIndexing))
    ]);
}

export function down(knex) {
    return Promise.all([
        knex.schema.dropTableIfExists('warehouse'),
        knex.schema.raw(removeTitleIndexing),
    ]);
}
