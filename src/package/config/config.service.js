import * as env from 'dotenv';
import { NotFoundEnvKey } from './error/not-found-env-key';

export class ConfigService {
    static #instance

    cache = false;

    /**
     *
     * @param {{ pathLookup?: String; cache?: Boolean; }} config
     */
    static config(config) {
        if (ConfigService.#instance) {
            throw new Error(`Class ${ConfigService.name} has been already configured`);
        }

        ConfigService.#instance = new ConfigService();

        env.config({
            path: config.pathLookup
        });
    }

    /**
     *
     * @returns {ConfigService}
     */
    static getSingleton() {
        return ConfigService.#instance;
    }

    /**
     *
     * @param {String} keyName
     * @returns {String}
     */
    get(keyName) {
        this.verifyKey(keyName);
        return process.env[keyName];
    }

    /**
     *
     * @param {String} keyName
     */
    verifyKey(keyName) {
        if (!process.env[keyName]) {
            throw new NotFoundEnvKey(keyName, process.env.NODE_ENV);
        }
    }
}
