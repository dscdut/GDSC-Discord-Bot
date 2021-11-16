import { COMMAND_PREFIX } from 'core/common/constant';
import { COMMAND_KEY } from 'core/common/enum/bot-command';
import { WarehouseService } from 'core/modules/warehouse';

(() => { console.log(WarehouseService); })();

class DiscordCommandServiceImpl {
    constructor() {
        this.warehouseService = WarehouseService;
        console.log(this.warehouseService);
    }

    executeRequest(req) {
        const commandKey = this.#getCommandKey(req.content);
        switch (commandKey) {
            case COMMAND_PREFIX + COMMAND_KEY.ADD: {
                return this.warehouseService.add(req.content.replace(commandKey, '').trim());
            }
        }
    }

    #getCommandKey = message => message.slice(0, message.indexOf(' '));
}

export const DiscordCommandService = new DiscordCommandServiceImpl();

// import { COMMAND_PREFIX } from 'core/common/constant';
// import { COMMAND_OF } from 'core/common/enum/bot-command';
// import { DiscordSlideService } from '../slide/service';

// class DiscordCommandServiceImpl {
//     constructor() {
//         this.discordSlideService = DiscordSlideService;
//     }

//     executeRequest(req) {
//         const commandType = this.#getCommandType(req.content);
//         switch (commandType) {
//             case COMMAND_PREFIX + COMMAND_OF.SLIDE: {
//                 return this.discordSlideService.executeByCommandType(req.content.replace(commandType, ''));
//             }
//         }
//     }

//     #getCommandType = message => message.slice(0, message.indexOf('_'));
// }

// export const DiscordCommandService = new DiscordCommandServiceImpl();
