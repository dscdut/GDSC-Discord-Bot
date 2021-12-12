import { failResponse, successResponse } from 'package/handler/bot-response';
import { GiveAwayRequestProcess } from 'core/modules/give-away/give-away.request-process';
import { ScheduleService } from 'core/modules/give-away/give-away.schedule';
import { DiscordService } from 'core/config/discord.config';

class GiveAwayServiceImpl {
    async addGiveAway(content, messageId, channelId) {
        const giveAwayCommandProcess = new GiveAwayRequestProcess(content);
        const data = giveAwayCommandProcess.separateData();
        if (!data) {
            return failResponse('Failed', 'Invalid command! Time cannot be set to the past & Quantity must be a positive number');
        }
        ScheduleService.scheduleJob(channelId, messageId, data, DiscordService.client);
        return successResponse('Successfully setup give-away event',
            `[${data.message} - Time to roll: ${data.date.date()}/${data.date.month()}/${data.date.year()} - ${data.date.hour()}:${data.date.minute()}:00}]`);
    }
}

export const GiveAwayService = new GiveAwayServiceImpl();
