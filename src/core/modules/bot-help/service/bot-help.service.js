import { allModulesInfo } from 'core/modules';
import { successResponse } from 'package/handler/bot-response';

class BotHelpServiceImpl {
    help() {
        return successResponse('Here am I:', this.#convertToString(allModulesInfo.getAllModulesInfo()));
    }

    /**
     *
     * @param {array} modulesInfo
     */
    #convertToString(modulesInfo) {
        return modulesInfo.reduce((prev, curr) => prev.concat(`  Command: ${curr.commandKey} ---> ${curr.description} \n`), '');
    }
}

export const BotHelp = new BotHelpServiceImpl();
