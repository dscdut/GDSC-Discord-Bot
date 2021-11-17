import { BaseRepository } from 'package/repository';

class WarehouseRepositoryImpl extends BaseRepository {
    getBySameAsTitle(title) {
        return this.query().select('title', 'value').where('title', 'like', `%${title}%`);
    }

    getByTitle(title) {
        return this.query().select('title', 'value').where({ title });
    }
}

export const WarehouseRepository = new WarehouseRepositoryImpl('warehouse');
