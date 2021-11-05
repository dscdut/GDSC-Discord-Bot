import { format } from 'winston';

const {
    combine, timestamp,
    printf, colorize,
    label,
    json
} = format;

export class OutputFormat {
    static DEFAULT_DATE_FORMAT = 'DD-MM-YYYY HH:mm:ss';

    constructor(name) {
        this.name = name;
    }

    /**
     *
     * @override Override this method to change the date format
     */
    getDateFormat() {
        return OutputFormat.DEFAULT_DATE_FORMAT;
    }

    /**
     *
     * @override Override this method to change the log format
     */
    getPrintTranslationCb(log) {
        return `[${log.timestamp}] [${log.level}] ${log.label} ${log.message}`;
    }

    get() {
        return combine(
            json(),
            timestamp({ format: this.getDateFormat() }),
            format(info => {
                info.level = info.level.toUpperCase();
                return info;
            })(),
            colorize(),
            label({ label: this.name ? ` [${this.name}]` : '' }),
            printf(this.getPrintTranslationCb)
        );
    }
}
