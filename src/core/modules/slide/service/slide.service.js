import { getTransaction } from 'core/database';
import { errorResponse, failResponse, successResponse } from 'package/handler/bot-response';
import { logger } from 'package/logger';

class SlideServiceImpl {
    async addSlide(slideInfo) {
        if (this.#checkValidSlideTitle(slideInfo)) {
            const trx = await getTransaction();
            const slideTitle = this.#getSlideTitle(slideInfo);
            const slideUrl = this.#getSlideUrl(slideInfo);

            const mapToModel = {
                slide_title: slideTitle,
                slide_url: slideUrl
            };

            try {
                const insertedSlide = await trx('slides').insert(mapToModel).returning('slide_title');

                await trx.commit();

                logger.info(`Inserted with slide title: ${insertedSlide[0]}`);
                return successResponse(`Slide: "${insertedSlide[0]}" - successfully added!`);
            } catch (error) {
                await trx.rollback();

                logger.error(`Error with adding slide: ${error.detail}`);
                return failResponse(error.detail);
            }
        } else {
            return errorResponse('Slide\'s title must begin with character double quote (")');
        }
    }

    #getSlideTitle(content) {
        return content.slice(content.indexOf('"') + 1, content.lastIndexOf('"')).trim();
    }

    #getSlideUrl(content) {
        return content.slice(content.lastIndexOf('"') + 1).trim();
    }

    #checkValidSlideTitle(content) {
        return content.indexOf('"') === 0;
    }
}

export const SlideService = new SlideServiceImpl();
