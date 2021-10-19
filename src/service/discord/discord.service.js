import { Client } from 'discord.js';
import { GoogleService } from 'service/google';

require('dotenv').config();

class DiscordServiceImpl {
    client

    constructor() {
        this.client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES'] });
    }

    connectToDiscordBot() {
        this.client.on('ready', () => {
            console.log(`Logged in as ${this.client.user.username}!`);
        });
        return this;
    }

    runBotService() {
        this.client.on('messageCreate', async msg => {
            if (msg.content === 'hello' || msg.content === 'hi') {
                msg.reply('tiếng việt không nói, nói tiếng anh cc');
            }
            if (msg.content === 'name?') {
                msg.reply(this.client.user.username);
            }
            if (msg.content === 'a') {
                GoogleService.getGoogleSheetData(msg);
            }
        });
        return this;
    }

    botLogin() {
        this.client.login(process.env.BOT_TOKEN);
    }
}

export const DiscordService = new DiscordServiceImpl();
