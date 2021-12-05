import { BOT_INTENTS } from 'core/common/enum/bot-config';
import { BOT_EVENT } from 'core/common/enum/bot-event';
import { Client } from 'discord.js';
import { logger } from 'package/logger';
import { DiscordCommandServiceImpl } from 'core/discord-bot/service/command.service';

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
        this.client.on(BOT_EVENT.MESSAGE_CREATE, async req => {
            if (req.author.bot) {
                return;
            }
            const res = await new DiscordCommandServiceImpl().executeRequest(req);
            if (res) req.reply(res);
        });
        return this;
    }

    botLogin() {
        this.client.login(process.env.BOT_TOKEN);
    }
}

export const DiscordService = new DiscordConfig();
