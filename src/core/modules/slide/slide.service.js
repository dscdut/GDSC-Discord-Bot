import fetch from 'node-fetch';
import { ConfigService } from 'package/config';
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

            if (await this.#checkIfExisted(slideTitle)) {
                return failResponse('Slide title already existed! please choose another title');
            }
            const mapToModel = await this.#mapToModel(slideTitle, slideUrl);

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

    async getSlideSameAsTitle(slideTitle) {
        if (this.#checkValidSlideTitle(slideTitle)) {
            const title = this.#getSlideTitle(slideTitle);
            const slides = await this.slideRepository.getSameAsTitle(title);

            if (slides.length <= 0) {
                return failResponse(`No slide was found with title: ${title}`);
            }
            return successResponse('Here are what I found:', this.#toBotRespondFormat(slides));
        }

        return errorResponse('Slide\'s title must begin with character double quote (")');
    }

    #checkValidSlideTitle(content) {
        return content.indexOf('"') === 0;
    }

    #getSlideTitle(content) {
        return content.slice(content.indexOf('"') + 1, content.lastIndexOf('"')).trim();
    }

    #getSlideUrl(content) {
        return content.slice(content.lastIndexOf('"') + 1).trim();
    }

    async #mapToModel(slideTitle, slideUrl) {
        const shortenToolBody = {
            url: slideUrl,
            slug: slideTitle.replaceAll(' ', '_')
        };

        const shortenToolRes = await fetch(ConfigService.getSingleton().get('SHORTEN_TOOL_API'), {
            method: 'POST',
            body: JSON.stringify(shortenToolBody),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .catch(err => logger.error(err));

        return {
            title: slideTitle,
            url: ConfigService.getSingleton().get('SHORTEN_TOOL_URL') + shortenToolRes.data
        };
    }

    #toBotRespondFormat(slides) {
        let stringResponse = `\n> ${slides[0].title} : <${slides[0].url}>`;

        for (let i = 1; i < slides.length - 1; i += 1) {
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
