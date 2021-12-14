import { COMMAND_PREFIX } from 'core/common/constant';
import { COMMAND_KEY } from 'core/common/enum/bot-command';
import {
    isUrl, toCodeFormat, toSnippetFormat, unAccentVietnamese
} from 'core/utils';
import { logger } from 'package/logger';
import { checkIfValidCommand } from '../warehouse.middleware';
import { WarehouseRepository } from '../warehouse.repository';
import { WarehouseRequestProcess } from './warehouse.request-process';

class WarehouseServiceImpl {
    constructor() {
        this.warehouseRepository = WarehouseRepository;
    }

    async add(content) {
        if (checkIfValidCommand(content)) {
            const mapToModel = await new WarehouseRequestProcess(content)
                .getTitle()
                .getValue()
                .then(val => val.getDataFromContent());

            if (await this.#checkIfExisted(mapToModel.title)) {
                return toSnippetFormat('Title already existed! please choose another one');
            }
            try {
                const insertedData = await this.warehouseRepository.insert(mapToModel, 'title');
                return toSnippetFormat(`Successfully added: "${insertedData[0]}"`);
            } catch (error) {
                logger.error(`Error with adding record: ${error.detail}`);
                return toSnippetFormat(error.detail);
            }
        } else return toSnippetFormat('Invalid command format');
    }

    async getBySameAsTitle(title) {
        const unAccentTitle = unAccentVietnamese(title);
        const responses = await this.warehouseRepository.getBySameAsTitle(title, unAccentTitle);
        if (responses.length <= 0) {
            return `No record was found with title: "${toCodeFormat(title)}". \nMy searching skill is still not perfect, please check again your typo or try to retrieve all data with: "${toCodeFormat(COMMAND_PREFIX + COMMAND_KEY.GET_ALL)}"`;
        }
        return (`Here are what I found: \n${this.#toBotRespondFormat(responses)}`);
    }

    async getAll() {
        const responses = await this.warehouseRepository.getAll(['title', 'value']);

        if (responses.length <= 0) {
            return toSnippetFormat('No record was found');
        }
        return (`Here are what I found: \n${this.#toBotRespondFormat(responses)}`);
    }

    #toBotRespondFormat(responses) {
        let stringResponse = '';

        for (let i = 0; i <= responses.length - 1; i += 1) {
            stringResponse = stringResponse.concat(`> ${i >= 0 && i < 9 ? `0${i + 1}` : i + 1}. `,
                `${responses[i].title}: ${isUrl(responses[i].value) ? `<${responses[i].value}>` : `${responses[i].value}`}\n`);
        }
        return stringResponse;
    }

    async #checkIfExisted(title) {
        const data = await this.warehouseRepository.getByTitle(title);
        if (data.length > 0) return true;
        return false;
    }
}

export const WarehouseService = new WarehouseServiceImpl();
