import { BaseRepository } from 'package/repository';

class SlideRepositoryImpl extends BaseRepository {
    getBySameAsTitle(title) {
        return this.query().select('title', 'url').where('title', 'like', `%${title}%`);
    }

    getByTitle(title) {
        return this.query().select('title', 'url').where({ title });
    }
}

export const SlideRepository = new SlideRepositoryImpl('slides');
