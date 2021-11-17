import { errorResponse, failResponse, successResponse } from 'package/handler/bot-response';
import { logger } from 'package/logger';
import { checkIfValidCommand } from './warehouse.middleware';
import { WarehouseRepository } from './warehouse.repository';
import { WarehouseRequestProcess } from './warehouse.request-process';

export class WarehouseServiceImpl {
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
                return failResponse('Title already existed! please choose another one');
            }
            try {
                const insertedData = await this.warehouseRepository.insert(mapToModel, 'title');
                return successResponse(`Successfully added: "${insertedData[0]}"`);
            } catch (error) {
                logger.error(`Error with adding record: ${error.detail}`);
                return failResponse(error.detail);
            }
        } else return errorResponse('Invalid command format');
    }

    async getBySameAsTitle(title) {
        const responses = await this.warehouseRepository.getBySameAsTitle(title);

        if (responses.length <= 0) {
            return failResponse(`No record was found with title: ${title}`);
        }
        return successResponse('Here are what I found:', this.#toBotRespondFormat(responses));
    }

    #toBotRespondFormat(slides) {
        let stringResponse = '';

        for (let i = 0; i <= slides.length - 1; i += 1) {
            stringResponse = stringResponse.concat('\n> ', `${slides[i].title}:  ${slides[i].value}`);
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