import { COMMAND_TYPE } from 'core/common/enum/bot-command';
import { SlideService } from 'core/modules/slide';

class DiscordSlideServiceImpl {
    constructor() {
        this.slideService = SlideService;
    }

    actionByCommandType(message) {
        switch (message.slice(message.indexOf('_'), message.indexOf(' '))) {
            case COMMAND_TYPE.ADD: {
                const slideInfo = message.slice(message.indexOf(' ')).trim();
                return this.slideService.addSlide(slideInfo);
            }
        }
    }
}

export const DiscordSlideService = new DiscordSlideServiceImpl();
