/* eslint-disable no-case-declarations */
import { COMMAND, COMMAND_PREFIX } from 'core/common/enum/bot-command';
import { SlideService } from 'core/modules/slide';

class DiscordSlideServiceImpl {
    constructor() {
        this.slideService = SlideService;
    }

    async getDataByMessage(client, msg) {
        switch (msg.content) {
            case 'hello':
            case 'hi':
                return this.slideService.helloCase();
            case 'name?':
                return this.slideService.nameCase(client);
            case COMMAND_PREFIX.GET_SLIDE_PREFIX + COMMAND.GET_SLIDE:
                return this.slideService.getSlideCase();
        }
    }
}

export const DiscordSlideService = new DiscordSlideServiceImpl();
