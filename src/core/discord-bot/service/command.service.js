import { COMMAND_PREFIX } from 'core/common/constant';
import { COMMAND_KEY } from 'core/common/enum/bot-command';
import { WarehouseService } from 'core/modules/warehouse';
import { GiveAwayService } from 'core/modules/give-away';
import { DiscordService } from 'core/config/discord.config';

export class DiscordCommandServiceImpl {
    constructor() {
        this.warehouseService = WarehouseService;
    }

    async executeRequest(req) {
        const commandKey = this.#getCommandKey(req.content);
        switch (commandKey) {
            case COMMAND_PREFIX + COMMAND_KEY.ADD: {
                return WarehouseService.add(req.content.replace(commandKey, '').trim());
            }
            case COMMAND_PREFIX + COMMAND_KEY.GET: {
                return WarehouseService.getBySameAsTitle(req.content.replace(commandKey, '').trim());
            }
            case COMMAND_PREFIX + COMMAND_KEY.GIVE_AWAY: {
                return GiveAwayService.addGiveAway(
                    req.content.replace(commandKey + ':', '').trim(), 
                    req.id, 
                    req.channelId, 
                    DiscordService.client
                );
            }
        }
    }

    #getCommandKey = (message) => {
        message = message.slice(0, message.indexOf(' '));
        message = message.indexOf(':') > 0 ? message.slice(0, message.indexOf(':')) : message;
        return message;
    };
}
