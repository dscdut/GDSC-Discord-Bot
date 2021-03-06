import { COMMAND_PREFIX } from 'core/common/constant';
import { COMMAND_KEY } from 'core/common/enum/bot-command';
import { BaseModuleInfo } from 'core/infrastructure/module/base.module-info';

export const GiveAwayInfo = BaseModuleInfo
    .builder()
    .addModuleInformation({
        name: 'GiveAway',
    })
    .registerInfo([
        {
            commandKey: COMMAND_PREFIX + COMMAND_KEY.GIVE_AWAY,
            description: 'Setting up a give-away event',
            format: `${COMMAND_PREFIX + COMMAND_KEY.GIVE_AWAY}: [MESSAGE] >> [HH:mm DD/MM/YYYY] >> [ITEM-1]:[QUANTITY-1], [ITEM-2]:[QUANTITY-2], ...`
        }
    ]);
