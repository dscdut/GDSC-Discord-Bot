import { BOT_RESPONSE_STATUS } from './enum/bot.response.enum';

function formatResponseText(content) {
    return `\`\`\`${content}\`\`\` `;
}

export function successResponse(message) {
    const response = `[${BOT_RESPONSE_STATUS.SUCCESS}] | ${message}`;
    return formatResponseText(response);
}

export function failResponse(message) {
    const response = `[${BOT_RESPONSE_STATUS.FAIL}] | ${message}`;
    return formatResponseText(response);
}

export function errorResponse(message) {
    const response = `[${BOT_RESPONSE_STATUS.ERROR}] | ${message}`;
    return formatResponseText(response);
}
