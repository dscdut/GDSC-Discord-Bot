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
            description: 'Save your note as keyword',
            format: `${COMMAND_PREFIX + COMMAND_KEY.ADD} [KEYWORD] >> [VALUE]`
        },
        {
            commandKey: COMMAND_PREFIX + COMMAND_KEY.GET,
            description: 'Get your note by keyword',
            format: `${COMMAND_PREFIX + COMMAND_KEY.GET} [KEYWORD]`
        },
        {
            commandKey: COMMAND_PREFIX + COMMAND_KEY.GET_ALL,
            description: 'Retrieve all your notes',
            format: `${COMMAND_PREFIX + COMMAND_KEY.GET_ALL}`
        }
    ]);
