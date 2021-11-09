import { COMMAND_PREFIX } from 'core/common/constant';
import { COMMAND_OF } from 'core/common/enum/bot-command';
import { DiscordSlideService } from '../slide/service';

export class DiscordCommandService {
    constructor(msg) {
        this.msg = msg.content;
        this.commandType = this.msg.slice(0, this.msg.indexOf('_'));
        this.discordSlideService = DiscordSlideService;
    }

    async actionByCommand() {
        switch (this.commandType) {
            case COMMAND_PREFIX + COMMAND_OF.SLIDE: {
                const response = await this.discordSlideService.actionByCommandType(this.msg);
                return response;
            }
        }
    }
}
