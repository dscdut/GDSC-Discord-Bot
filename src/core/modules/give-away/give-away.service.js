
import { failResponse, successResponse } from 'package/handler/bot-response';
import { GiveAwayRequestProcess } from 'core/modules/give-away/give-away.request-process';
import { ScheudleService } from 'core/modules/give-away/give-away.schedule';
import { DiscordService } from 'core/config/discord.config';

class GiveAwayServiceImpl {
    constructor() {}

    async addGiveAway(content, messageId, channelId) {
        const giveAwayCommandProcess = new GiveAwayRequestProcess(content);
        const data = giveAwayCommandProcess.seperateData();
        if (!data) {
            return failResponse('Failed', 'Invalid command! Time cannot be set to the past & Quantity must be a positive number');
        }
        ScheudleService.scheduleJob(channelId, messageId, data, DiscordService.client);
        return successResponse('Successfully setup give-away event', `[${data.message} - Time to roll: ${data.date.toLocaleString()}]`);
    }
}

export const GiveAwayService = new GiveAwayServiceImpl();