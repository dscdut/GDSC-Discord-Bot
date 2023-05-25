import moment from 'moment';
import 'moment-timezone';

import {
    TITLE_VALUE_SEPARATOR,
    DATE_FORMAT,
    GMT7_TIMEZONE,
    DEFAULT_SCHEDULE_TIME
} from 'core/common/constant';

export class GiveAwayRequestProcess {
    constructor(content) {
        this.content = content;
    }

    separateData() {
        const commandInfo = this.content
            .split(TITLE_VALUE_SEPARATOR)
            .map(e => e.trim());
        if (commandInfo.length < 3) return null;
        const message = commandInfo[0];
        const rollDate = this.getDateFromCommand(commandInfo[1]);
        const items = this.getDetailQuantity(commandInfo[2]);
        if (
            !rollDate
            || !this.validateQuantity(items)
        ) {
            return null;
        }
        const quantity = Object.values(items).reduce((x, y) => x + y, 0);
        return {
            date: rollDate,
            items,
            message,
            quantity,
        };
    }

    getDateFromCommand(date) {
        try {
            let dateDetail = date.split(' ');

            if (dateDetail.length === 1) {
                dateDetail = [DEFAULT_SCHEDULE_TIME, ...dateDetail];
            }
            const formatedDate = moment(dateDetail, DATE_FORMAT)
                .tz(GMT7_TIMEZONE, true);

            const now = moment().tz(GMT7_TIMEZONE);

            if (
                !formatedDate.isValid()
                || (formatedDate.isBefore(now))
            ) {
                return null;
            }

            return formatedDate;
        } catch (error) {
            return null;
        }
    }

    getDetailQuantity(msg) {
        const itemMsg = msg.split(',');
        const items = {};
        itemMsg.forEach(e => {
            const details = e.split(':');
            const itemQuantity = Number.parseFloat(details[1]);
            items[details[0].trim()] = itemQuantity;
        });
        return items;
    }

    validateQuantity(items) {
        const quantites = Object.values(items);
        return !quantites.some(x => (
            !Number.isInteger(x) || x < 1
        ));
    }
}
