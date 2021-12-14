import { TITLE_VALUE_SEPARATOR, DATE_FORMAT, DEFAULT_SCHEDULE_TIME } from 'core/common/constant';
import moment from 'moment';

export class GiveAwayRequestProcess {
    constructor(content) {
        this.content = content;
    }

    separateData() {
        const commandInfo = this.content.split(TITLE_VALUE_SEPARATOR).map(e => e.trim());
        if (commandInfo.length < 3) return null;
        const quantity = commandInfo[0];
        const date = this.formatDate(commandInfo[1]);
        const dateFormatted = this.validateDate(date);
        const message = commandInfo[2];
        if (!dateFormatted || !this.validateQuantity(quantity)) {
            return null;
        }
        return {
            date: dateFormatted,
            quantity,
            message,
        };
    }

    formatDate(date) {
        let dateDetail = date.split(' ');
        if (dateDetail.length === 1) {
            dateDetail = [DEFAULT_SCHEDULE_TIME, ...dateDetail];
        }
        return dateDetail;
    }

    validateQuantity(quantity) {
        const number = parseInt(quantity, 10);
        if (Number.isNaN(number)) return false;
        return number > 0;
    }

    validateDate(date) {
        const formattedDate = moment(date, DATE_FORMAT);
        const now = moment(new Date());
        if (!formattedDate.isValid() || (formattedDate - now < 0)) return null;
        return formattedDate;
    }
}
