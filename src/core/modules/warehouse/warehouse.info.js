import { COMMAND_PREFIX } from 'core/common/constant';
import { COMMAND_KEY } from 'core/common/enum/bot-command';
import { BaseModuleInfo } from 'core/infrastructure/module/base.module-info';

export const WareHouseInfo = BaseModuleInfo
    .builder()
    .addModuleInformation({
        name: 'WareHouse'
    })
    .registerInfo([
        {
            commandKey: COMMAND_PREFIX + COMMAND_KEY.ADD,
            description: 'Save your take note',
            format: `${COMMAND_PREFIX + COMMAND_KEY.ADD} [KEYWORD] >> [VALUE]`
        },
        {
            commandKey: COMMAND_PREFIX + COMMAND_KEY.GET,
            description: 'Get your note by it\'s title',
            format: `${COMMAND_PREFIX + COMMAND_KEY.GET} [KEYWORD]`
        },
        {
            commandKey: COMMAND_PREFIX + COMMAND_KEY.GET_ALL,
            description: 'Retrieve all your notes',
            format: `${COMMAND_PREFIX + COMMAND_KEY.GET_ALL}`
        },
        {
            commandKey: COMMAND_PREFIX + COMMAND_KEY.GIVE_AWAY,
            description: 'Setting up a give-away event',
            format: `${COMMAND_PREFIX + COMMAND_KEY.GIVE_AWAY}:[QUANTITY] >> [DATE TIME] >> [MESSAGE]`
        }
    ]);
