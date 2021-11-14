import { COMMAND_PREFIX } from 'core/common/constant';
import { COMMAND_OF } from 'core/common/enum/bot-command';
import { DiscordSlideService } from '../slide/service';

class DiscordCommandServiceImpl {
    constructor() {
        this.discordSlideService = DiscordSlideService;
    }

    executeRequest(req) {
        const commandType = this.#getCommandType(req.content);
        switch (commandType) {
            case COMMAND_PREFIX + COMMAND_OF.SLIDE: {
                return this.discordSlideService.executeByCommandType(req);
            }
        }
    }

    #getCommandType = message => message.slice(0, message.indexOf('_'));
}

export const DiscordCommandService = new DiscordCommandServiceImpl();
