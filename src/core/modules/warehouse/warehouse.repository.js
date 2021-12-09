import { BaseRepository } from 'package/repository';

class WarehouseRepositoryImpl extends BaseRepository {
    getBySameAsTitle(title, unAccentTitle) {
        return this.query().select('title', 'value').where('title', 'like', `%${title}%`).orWhereRaw(`title_tsv @@ to_tsquery('${unAccentTitle.replaceAll(' ', ' | ')}')`);
    }

    getByTitle(title) {
        return this.query().select('title', 'value').where({ title });
    }
}

export const WarehouseRepository = new WarehouseRepositoryImpl('warehouse');
