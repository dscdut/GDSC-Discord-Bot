import { COMMAND_TYPE } from 'core/common/enum/bot-command';
import { SlideService } from 'core/modules/slide';

class DiscordSlideServiceImpl {
    constructor() {
        this.slideService = SlideService;
    }

    async actionByCommandType(message) {
        switch (message.slice(message.indexOf('_'), message.indexOf(' '))) {
            case COMMAND_TYPE.ADD: {
                const insertedSlide = await this.callAddSlideService(message);
                return insertedSlide;
            }
        }
    }

    async callAddSlideService(message) {
        const slideInfo = message.slice(message.indexOf(' '));
        const insertedSlide = await this.slideService.addSlide(slideInfo.trim());
        return insertedSlide;
    }
}

export const DiscordSlideService = new DiscordSlideServiceImpl();
