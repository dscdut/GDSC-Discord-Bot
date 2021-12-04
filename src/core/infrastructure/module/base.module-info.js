import { ArgumentRequired } from 'package/handler/exceptions';
import { logger } from 'package/logger';

export class BaseModuleInfo {
    #moduleInformation

    #commandDescription =[]

    static builder() {
        return new BaseModuleInfo();
    }

    /**
     * @param
     * {
     *  name: String,
     * }
     *  */

    addModuleInformation({ name }) {
        if (!name) {
            throw new ArgumentRequired('name of module', 'addPrefix function');
        }
        this.#moduleInformation = {
            name
        };
        return this;
    }

    /**
     * @param {
        [{
            commandKey: string,
            description?: string,
        }]
    } apis
     */
    registerInfo(commandsInfo) {
        logger.info(`Collecting info of module: ${this.#moduleInformation.name}`);
        commandsInfo.forEach(commandInfo => {
            const {
                description, commandKey
            } = commandInfo;

            if (!commandKey) {
                throw new ArgumentRequired(`commandKey of ${this.#moduleInformation.module}`, 'register function');
            }

            if (description) {
                this.#commandDescription.push({ commandKey, description });
            } else {
                this.#commandDescription.push({ commandKey, description: 'No description for this command' });
            }
        });
        return this;
    }

    collectInfo() {
        return this.#commandDescription;
    }
}
