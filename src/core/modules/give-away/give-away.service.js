import { GiveAwayRequestProcess } from 'core/modules/give-away/give-away.request-process';
import { ScheduleService } from 'core/modules/give-away/give-away.schedule';
import { DiscordService } from 'core/config/discord.config';
import { formatDateForResponse, toSnippetFormat } from 'core/utils';
import { logger } from 'package/logger';

class GiveAwayServiceImpl {
    async addGiveAway(content, messageId, channelId) {
        try {
            const giveAwayCommandProcess = new GiveAwayRequestProcess(content);
            const data = giveAwayCommandProcess.separateData();
            if (!data) {
                return toSnippetFormat('Invalid command! Time cannot be set to the past & Quantity must be a positive number');
            }
            ScheduleService.scheduleJob(channelId, messageId, data, DiscordService.client);
            return toSnippetFormat(`Successfully setup giveaway event\n\n${data.message} - Time to roll: ${formatDateForResponse(data.date)}`);
        } catch (error) {
            logger.error(error);
        }
    }
}

export const GiveAwayService = new GiveAwayServiceImpl();
