import { Client } from 'discord.js';
import { COMMAND, COMMAND_PREFIX } from 'enum/bot-command';
import { BOT_INTENTS } from 'enum/bot-config';
import { BOT_EVENT } from 'enum/bot-event';
import { GoogleService } from 'service/google';

require('dotenv').config();

class DiscordServiceImpl {
    client

    constructor() {
        this.client = new Client({ intents: [BOT_INTENTS.GUILDS, BOT_INTENTS.GUILD_MESSAGES, BOT_INTENTS.DIRECT_MESSAGES] });
    }

    connectToDiscordBot() {
        this.client.on(BOT_EVENT.READY, () => {
            console.log(`Logged in as ${this.client.user.username}!`);
        });
        return this;
    }

    runBotService() {
        this.client.on(BOT_EVENT.MESSAGE_CREATE, async msg => {
            if (msg.content === 'hello' || msg.content === 'hi') {
                msg.reply('Tiếng việt không nói, nói tiếng anh cc');
            }
            if (msg.content === 'name?') {
                msg.reply(this.client.user.username);
            }
            if (msg.content === COMMAND_PREFIX.GET_SLIDE_PREFIX + COMMAND.GET_SLIDE) {
                const data = await GoogleService.getGoogleSheetData();
                const toStringData = data.reduce((prev, curr) => `${prev + curr[0]}: ${curr[1]} \n`, '');
                await msg.reply(toStringData);
                console.log('Bot has sent the data');
            }
        });
        return this;
    }

    botLogin() {
        this.client.login(process.env.BOT_TOKEN);
    }
}

export const DiscordService = new DiscordServiceImpl();
