import * as express from 'express';
import cors from 'cors';
import methodOverride from 'method-override';
import { ConfigService } from 'package/config';
import { logger } from 'package/logger';
import { InvalidFilter, InvalidResolver } from 'core/common/exception/system';
import { connectDatabase } from 'core/database';
import { DiscordService } from './discord.config';

export class AppBundle {
    BASE_PATH = '/api';

    static builder() {
        logger.info('App starts bundling!');
        return new AppBundle();
    }

    /**
     * @param {import("express-serve-static-core").Express} app
     */
    applyAppContext(app) {
        this.app = app;
        return this;
    }

    /**
     * Initial the express server
     */
    init() {
        logger.info(`App is running in mode: [${ConfigService.getSingleton().get('NODE_ENV')}]`);

        /**
         * Setting basic
         */
        this.app.use(cors({
            origin: ConfigService.getSingleton().get('CORS_ALLOW'),
            optionsSuccessStatus: 200
        }));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        /**
         * Setup method override method to use PUT, PATCH,...
         */
        this.app.use(methodOverride('X-HTTP-Method-Override'));
        this.app.use(
            methodOverride(req => {
                if (req.body && typeof req.body === 'object' && '_method' in req.body) {
                    const method = req.body._method;
                    delete req.body._method;

                    return method;
                }

                return undefined;
            }),
        );
        logger.info('Building the initial-config');
        return this;
    }

    /**
     *
     * @param {[Filter]} filters
     * @returns {AppBundle}
     */
    applyGlobalFilter(filters) {
        filters.forEach(filter => {
            if (filter.filter) {
                logger.info(`Building global filter: [${filter.constructor.name}]`);
                this.app.use(filter.filter);
            } else {
                throw new InvalidFilter(filter);
            }
        });
        return this;
    }

    applyResolver(resolver) {
        if (!resolver['resolve']) {
            throw new InvalidResolver(resolver);
        }
        this.app.use(this.BASE_PATH, resolver.resolve());
        return this;
    }

    runServer() {
        logger.info('App is now running');
        return this;
    }

    async runDiscordService() {
        await connectDatabase();

        logger.info('Discord service is now running');
        DiscordService
            .connectToDiscordBot()
            .runBotService()
            .botLogin();
    }
}
