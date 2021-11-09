import { DiscordSlideService } from 'core/discord-bot/slide/service';
import { BOT_INTENTS } from 'core/common/enum/bot-config';
import { BOT_EVENT } from 'core/common/enum/bot-event';
import { Client } from 'discord.js';
import { logger } from 'package/logger';

class DiscordConfig {
    client

    constructor() {
        this.client = new Client({ intents: [BOT_INTENTS.GUILDS, BOT_INTENTS.GUILD_MESSAGES, BOT_INTENTS.DIRECT_MESSAGES] });
    }

    connectToDiscordBot() {
        this.client.on(BOT_EVENT.READY, () => {
            logger.info(`Logged in as ${this.client.user.username}!`);
        });
        return this;
    }

    runBotService() {
        this.client.on(BOT_EVENT.MESSAGE_CREATE, async msg => {
            const data = await DiscordSlideService.getDataByMessage(this.client, msg);
            if (data) msg.reply(data);
        });
        return this;
    }

    botLogin() {
        this.client.login(process.env.BOT_TOKEN);
    }
}

export const DiscordService = new DiscordConfig();
