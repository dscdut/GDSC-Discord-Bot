export class NotFoundEnvKey extends Error {
    constructor(key, nodeEnv) {
        super(`Can not retrieve the key: ${key}, please provide it in the ${nodeEnv}.env file`);
    }
}
