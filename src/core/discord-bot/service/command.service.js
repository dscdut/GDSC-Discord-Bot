import { COMMAND_PREFIX } from 'core/common/constant';
import { COMMAND_KEY } from 'core/common/enum/bot-command';
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
        }
    }

    #getCommandKey = message => message.slice(0, message.indexOf(' '));
}
