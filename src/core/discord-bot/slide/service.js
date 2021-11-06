/* eslint-disable no-case-declarations */
import { COMMAND, COMMAND_PREFIX } from 'core/common/enum/bot-command';

class DiscordSlideServiceImpl {
    async getDataByMessage(client, msg) {
        switch (msg.content) {
            case 'hello':
            case 'hi':
                return this.helloCase();
            case 'name?':
                return this.nameCase(client);
            case COMMAND_PREFIX.GET_SLIDE_PREFIX + COMMAND.GET_SLIDE:
                return this.getSlideCase();
        }
    }

    async helloCase() {
        return 'get fuck off, hoe!!';
    }

    async nameCase(client) {
        return client.user.username;
    }

    async getSlideCase() {
        return 'slide returned, bitch';
    }
}

export const DiscordSlideService = new DiscordSlideServiceImpl();
