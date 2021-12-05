import { COMMAND_PREFIX } from 'core/common/constant';
import { COMMAND_KEY } from 'core/common/enum/bot-command';
import { BotHelp } from 'core/modules/bot-help/service/bot-help.service';
import { WarehouseService } from 'core/modules/warehouse';

export class DiscordCommandServiceImpl {
    constructor() {
        this.warehouseService = WarehouseService;
    }

    executeRequest(req) {
        const commandKey = this.#getCommandKey(req.content);
        switch (commandKey) {
            case COMMAND_PREFIX + COMMAND_KEY.ADD: {
                return WarehouseService.add(req.content.replace(commandKey, '').trim());
            }
            case COMMAND_PREFIX + COMMAND_KEY.GET: {
                return WarehouseService.getBySameAsTitle(req.content.replace(commandKey, '').trim());
            }
            case COMMAND_PREFIX + COMMAND_KEY.HELP: {
                return BotHelp.help();
            }
        }
    }

    #getCommandKey = message => {
        if (message.indexOf(' ') !== -1) {
            return message.slice(0, message.indexOf(' '));
        }
        return message;
    }
}
