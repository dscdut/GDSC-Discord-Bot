import { errorResponse, failResponse, successResponse } from 'package/handler/bot-response';
import { logger } from 'package/logger';
import { SlideRepository } from './slide.repository';

class SlideServiceImpl {
    constructor() {
        this.slideRepository = SlideRepository;
    }

    async addSlide(slideInfo) {
        if (this.#checkValidSlideTitle(slideInfo)) {
            const slideTitle = this.#getSlideTitle(slideInfo);
            const slideUrl = this.#getSlideUrl(slideInfo);

            const mapToModel = {
                title: slideTitle,
                url: slideUrl
            };

            try {
                const insertedSlide = await this.slideRepository.insert(mapToModel, 'title');
                return successResponse(`Slide: "${insertedSlide[0]}" - successfully added!`);
            } catch (error) {
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
