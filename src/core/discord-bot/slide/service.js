import { COMMAND_TYPE } from 'core/common/enum/bot-command';
import { SlideService } from 'core/modules/slide';

class DiscordSlideServiceImpl {
    constructor() {
        this.slideService = SlideService;
    }

    async actionByCommandType(message) {
        switch (message.slice(message.indexOf('_'), message.indexOf(' '))) {
            case COMMAND_TYPE.ADD: {
                const slideInfo = message.slice(message.indexOf(' ')).trim();
                const insertedSlide = await this.slideService.addSlide(slideInfo);
                return insertedSlide;
            }
        }
    }
}

export const DiscordSlideService = new DiscordSlideServiceImpl();
