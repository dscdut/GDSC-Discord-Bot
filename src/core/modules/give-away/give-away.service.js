import { GiveAwayRequestProcess } from 'core/modules/give-away/give-away.request-process';
import { ScheduleService } from 'core/modules/give-away/give-away.schedule';
import { DiscordService } from 'core/config/discord.config';
import { formatDateForResponse } from 'core/utils';
import { formatResponseBoldText } from 'package/handler/bot-response';

class GiveAwayServiceImpl {
    async addGiveAway(content, messageId, channelId) {
        const giveAwayCommandProcess = new GiveAwayRequestProcess(content);
        const data = giveAwayCommandProcess.separateData();
        if (!data) {
            return formatResponseBoldText('Cú pháp chưa đúng');
        }
        ScheduleService.scheduleJob(channelId, messageId, data, DiscordService.client);
        return (`[${data.message}] - Time to roll: ${formatDateForResponse(data.date)}`);
    }
}

export const GiveAwayService = new GiveAwayServiceImpl();
