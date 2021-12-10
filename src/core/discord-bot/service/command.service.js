import { COMMAND_PREFIX } from 'core/common/constant';
import { COMMAND_KEY } from 'core/common/enum/bot-command';
import { BotHelp } from 'core/modules/bot-help/service/bot-help.service';
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
            case COMMAND_PREFIX + COMMAND_KEY.GET_ALL: {
                return WarehouseService.getAll();
            }
            case COMMAND_PREFIX + COMMAND_KEY.HELP: {
                return BotHelp.help();
            }
            case COMMAND_PREFIX + COMMAND_KEY.GIVE_AWAY: {
                return GiveAwayService.addGiveAway(
                    req.content.replace(`${commandKey}:`, '').trim(),
                    req.id,
                    req.channelId,
                    DiscordService.client
                );
            }
        }
    }

    #getCommandKey = message => {
        if (message.indexOf(' ') !== -1) {
            message = message.slice(0, message.indexOf(' '));
        }
        if (message.indexOf(':') !== -1) {
            message = message.slice(0, message.indexOf(':'));
        }
        return message;
    };
}
