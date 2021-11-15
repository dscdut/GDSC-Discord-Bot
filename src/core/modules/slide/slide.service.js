import { errorResponse, failResponse, successResponse } from 'package/handler/bot-response';
import { logger } from 'package/logger';
import { SlideRepository } from './slide.repository';
import { SlideRequestProcess } from './slide.request-process';

class SlideServiceImpl {
    constructor() {
        this.slideRepository = SlideRepository;
    }

    async addSlide(slideInfo) {
        const mapToModel = await new SlideRequestProcess(slideInfo)
            .checkValidUrl()
            .getSlideInfo();

        if (mapToModel) {
            if (await this.#checkIfExisted(mapToModel.title)) {
                return failResponse('Slide title already existed! please choose another title');
            }
            try {
                const insertedSlide = await this.slideRepository.insert(mapToModel, 'title');
                return successResponse(`Slide: "${insertedSlide[0]}" - successfully added!`);
            } catch (error) {
                logger.error(`Error with adding slide: ${error.detail}`);
                return failResponse(error.detail);
            }
        } else return errorResponse('Invalid command format, make sure slide\'s url must be like: https://<your slide url>');
    }

    async getSlideBySameAsTitle(slideTitle) {
        const slides = await this.slideRepository.getBySameAsTitle(slideTitle);

        if (slides.length <= 0) {
            return failResponse(`No slide was found with title: ${slideTitle}`);
        }
        return successResponse('Here are what I found:', this.#toBotRespondFormat(slides));
    }

    #toBotRespondFormat(slides) {
        let stringResponse = `\n> ${slides[0].title} : <${slides[0].url}>`;

        for (let i = 1; i <= slides.length - 1; i += 1) {
            stringResponse = stringResponse.concat('\n> ', `${slides[i].title}:  <${slides[i].url}> `);
        }
        return stringResponse;
    }

    async #checkIfExisted(slideTitle) {
        const slide = await this.slideRepository.getByTitle(slideTitle);
        if (slide.length > 0) return true;
        return false;
    }
}

export const SlideService = new SlideServiceImpl();
