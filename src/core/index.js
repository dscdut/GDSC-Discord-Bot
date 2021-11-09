import express from 'express';
import './config/config-service.config';
import { ModuleResolver } from './api';
import { AppBundle } from './config/bundle.config';

const app = express();

(async () => {
    AppBundle
        .builder()
        .applyAppContext(app)
        .init()
        .applyResolver(ModuleResolver)
        .runServer()
        .runDiscordService();
})();

export default app;
