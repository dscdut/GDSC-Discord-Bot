import { COMMAND_PREFIX } from 'core/common/constant';
import { COMMAND_OF } from 'core/common/enum/bot-command';
import { DiscordSlideService } from '../slide/service';

class DiscordCommandServiceImpl {
    constructor() {
        this.discordSlideService = DiscordSlideService;
    }

    actionByCommand(message) {
        const commandType = message.slice(0, message.indexOf('_'));
        switch (commandType) {
            case COMMAND_PREFIX + COMMAND_OF.SLIDE: {
                return this.discordSlideService.actionByCommandType(message);
            }
        }
    }
}

export const DiscordCommandService = new DiscordCommandServiceImpl();
