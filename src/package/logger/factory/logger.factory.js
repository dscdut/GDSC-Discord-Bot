import { createLogger as create, transports } from 'winston';
import { OutputFormat } from '../format';

export class LoggerFactory {
    static globalLogger = LoggerFactory.create();

    static create(name) {
        return create({
            transports: [new transports.Console()],
            format: new OutputFormat(name).get()
        });
    }
}
