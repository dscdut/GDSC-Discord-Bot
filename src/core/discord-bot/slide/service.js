import { COMMAND_TYPE } from 'core/common/enum/bot-command';
import { SlideService } from 'core/modules/warehouse';

class DiscordSlideServiceImpl {
    constructor() {
        this.slideService = SlideService;
    }

    executeByCommandType(message) {
        const commandType = this.#getMessageCommand(message);
        switch (commandType) {
            case COMMAND_TYPE.ADD: {
                const slideInfo = this.#getMessageContent(message);
                return this.slideService.addSlide(slideInfo.replace(commandType, '').trim());
            }
            case COMMAND_TYPE.GET: {
                const slideTitle = this.#getMessageContent(message);
                return this.slideService.getSlideBySameAsTitle(slideTitle.replace(commandType, '').trim());
            }
        }
    }

    #getMessageCommand = message => message.slice(message.indexOf('_'), message.indexOf(' '));

    #getMessageContent = message => message.slice(message.indexOf(' ')).trim()
}

export const DiscordSlideService = new DiscordSlideServiceImpl();
