import { DiscordService } from 'service/discord';

DiscordService
    .connectToDiscordBot()
    .runBotService()
    .botLogin();
