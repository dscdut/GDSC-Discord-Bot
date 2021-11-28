import { ModulesInfoHandler } from 'package/handler/module-info.handler';
import { WareHouseInfo } from './warehouse';

export const allModulesInfo = ModulesInfoHandler
    .builder()
    .collectAllModulesInfo([WareHouseInfo]);
