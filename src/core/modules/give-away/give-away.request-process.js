import { TITLE_VALUE_SEPARATOR, DATE_FORMAT, DEFAULT_TIME } from 'core/common/constant';
import moment from 'moment';

export class GiveAwayRequestProcess {
    constructor(content) {
        this.content = content;
    }

    seperateData() {
        const arr = this.content.split(TITLE_VALUE_SEPARATOR).map(e => e.trim());
        if (arr.length < 3) return null;
        const quantity = arr[0];
        const date = this.formatDate(arr[1]);
        const dateFormatted = this.validateDate(date);
        const message = arr[2];
        if (!dateFormatted || !this.validateQuantity(quantity)) {
            return null;
        }
        return {
            'date': dateFormatted,
            'quantity': quantity,
            'message': message,
        }
    }

    formatDate(date) {
        let dateDetail = date.split(' ');
        if (dateDetail.length == 1) {
            dateDetail = [DEFAULT_TIME, ...dateDetail];
        }
        return dateDetail;
    }

    validateQuantity(quantity) {
        const number = parseInt(quantity);
        if (Number.isNaN(number)) return false;
        return number > 0;
    }

    validateDate(date) {
        const dateWithFormat = moment(date, DATE_FORMAT);
        const now = moment(new Date());
        if (!dateWithFormat.isValid()) return null;
        if (dateWithFormat - now < 0) return null;
        return dateWithFormat;
    }
}