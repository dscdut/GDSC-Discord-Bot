import { failResponse, successResponse } from 'package/handler/bot-response';
import { GiveAwayRequestProcess } from 'core/modules/give-away/give-away.request-process';
import { ScheduleService } from 'core/modules/give-away/give-away.schedule';
import { DiscordService } from 'core/config/discord.config';
import { formatDateForResponse } from 'core/utils';

class GiveAwayServiceImpl {
    async addGiveAway(content, messageId, channelId) {
        const giveAwayCommandProcess = new GiveAwayRequestProcess(content);
        const data = giveAwayCommandProcess.separateData();
        if (!data) {
            return failResponse('Failed', 'Invalid command! Time cannot be set to the past & Quantity must be a positive number');
        }
        ScheduleService.scheduleJob(channelId, messageId, data, DiscordService.client);
        return successResponse('Successfully setup give-away event',
            `[${data.message} - Time to roll: ${formatDateForResponse(data.date)}`);
    }
}

export const GiveAwayService = new GiveAwayServiceImpl();
