/* eslint-disable no-useless-escape */
/* eslint-disable prefer-destructuring */
import { TITLE_VALUE_SEPARATOR } from 'core/common/constant';
import fetch from 'node-fetch';
import { ConfigService } from 'package/config';
import { logger } from 'package/logger';

export class WarehouseRequestProcess {
    title;

    value;

    constructor(content) {
        this.content = content;
    }

    static async shortenUrl(longUrl) {
        const shortenToolBody = {
            url: longUrl,
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

    static checkIfUrl(value) {
        // eslint-disable-next-line no-useless-escape
        const urlExpression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
        const regex = new RegExp(urlExpression);
        return regex.test(value);
    }

    getTitle() {
        const indexOfTitleValueSeparator = this.content.indexOf(TITLE_VALUE_SEPARATOR);
        this.title = this.content.slice(0, indexOfTitleValueSeparator).trim();
        return this;
    }

    async getValue() {
        const indexOfTitleValueSeparator = this.content.indexOf(TITLE_VALUE_SEPARATOR);
        const valueFromContent = this.content.slice(indexOfTitleValueSeparator + TITLE_VALUE_SEPARATOR.length).trim();

        if (WarehouseRequestProcess.checkIfUrl(valueFromContent)) {
            const shortedUrl = await WarehouseRequestProcess.shortenUrl(valueFromContent);
            this.value = `<${shortedUrl}>`;
        } else this.value = valueFromContent;

        return this;
    }

    getDataFromContent() {
        return {
            title: this.title,
            value: this.value
        };
    }
}
