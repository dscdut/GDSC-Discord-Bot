import { allModulesInfo } from 'core/modules';

class BotHelpServiceImpl {
    help() {
        return { data: `\`\`\`${this.#convertTooString(allModulesInfo.getAllModulesInfo())}\`\`\`` };
    }

    /**
     *
     * @param {array} modulesInfo
     */
    #convertTooString(modulesInfo) {
        return modulesInfo.reduce((prev, curr) => prev.concat(`Command: ${curr.commandKey} ---> ${curr.description} \n`), '');
    }
}

export const BotHelp = new BotHelpServiceImpl();
