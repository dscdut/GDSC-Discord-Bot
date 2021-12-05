import express from 'express';
import './config/config-service.config';
// import { ModuleResolver } from './api';
import { AppBundle } from './config/bundle.config';
import { allModulesInfo } from './modules';

const app = express();

(async () => {
    AppBundle
        .builder()
        .applyAppContext(app)
        .init()
        // .applyResolver(ModuleResolver)
        .runServer()
        .runDiscordService();
    // eslint-disable-next-line no-unused-expressions
    allModulesInfo;
})();

export default app;
