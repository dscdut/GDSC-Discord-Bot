import express from 'express';
import './config/config-service.config';
import { AppBundle } from './config/bundle.config';
import { ModuleResolver } from './api';

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
