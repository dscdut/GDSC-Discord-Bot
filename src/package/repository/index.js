import connection from 'core/database';

export class BaseRepository {
    #table

    constructor(table) {
        this.#table = table;
    }

    query() {
        return connection(this.#table).clone();
    }

    insert(data = {}, columns = '*', trx) {
        if (trx) {
            return this.query().insert(data).transacting(trx).returning(columns);
        } return this.query().insert(data).returning(columns);
    }
}
