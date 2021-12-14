import { DISCORD_EMOJI } from 'core/common/constant/discord-emoji.constant';
import { allModulesInfo } from 'core/modules';
import { toBold, toCodeFormat } from 'core/utils';

class BotHelpServiceImpl {
    help() {
        return `Here am I:\n${this.#convertToResponseFormat(allModulesInfo.getAllModulesInfo())}`;
    }

    /**
     *
     * @param {array} modulesInfo
     */
    #convertToResponseFormat(modulesInfo) {
        return modulesInfo.reduce((prev, curr) => prev.concat(`> ${toBold(curr.description)}:\n> ${DISCORD_EMOJI.POINT_RIGHT}${toCodeFormat(curr.format)}\n`), '');
    }
}

export const BotHelp = new BotHelpServiceImpl();
