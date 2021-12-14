import { ModulesInfoHandler } from 'package/handler/module-info.handler';
import { WareHouseInfo } from './warehouse';
import { GiveAwayInfo } from './give-away';

export const allModulesInfo = ModulesInfoHandler
    .builder()
    .collectAllModulesInfo([
        WareHouseInfo, GiveAwayInfo
    ]);
