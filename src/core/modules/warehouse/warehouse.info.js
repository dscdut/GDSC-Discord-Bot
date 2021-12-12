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
            description: 'Add a resource from your input'
        },
        {
            commandKey: COMMAND_PREFIX + COMMAND_KEY.GET,
            description: 'Get resources which are same as your input'
        },
    ]);
