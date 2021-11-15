/* eslint-disable prefer-destructuring */
import fetch from 'node-fetch';
import { ConfigService } from 'package/config';
import { logger } from 'package/logger';

export class SlideRequestProcess {
    title;

    url;

    constructor(content) {
        this.content = content;
    }

    async shortenUrl() {
        const shortenToolBody = {
            url: this.url,
        };

        const shortenToolRes = await fetch(ConfigService.getSingleton().get('SHORTEN_TOOL_API'), {
            method: 'POST',
            body: JSON.stringify(shortenToolBody),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .catch(err => logger.error(err));
        return ConfigService.getSingleton().get('SHORTEN_TOOL_URL') + shortenToolRes.data;
    }

    checkValidUrl() {
        // eslint-disable-next-line no-useless-escape
        const urlExpression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
        const regex = new RegExp(urlExpression);
        if (this.content.match(regex)) {
            this.url = this.content.match(new RegExp(urlExpression))[0];
            this.title = this.content.slice(0, this.content.indexOf(this.url)).trim();
        }
        return this;
    }

    async getSlideInfo() {
        this.url = await this.shortenUrl();
        if (this.title && this.url) {
            return {
                title: this.title,
                url: this.url
            };
        }
    }
}
