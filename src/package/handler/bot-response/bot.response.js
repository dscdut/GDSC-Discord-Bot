import { BOT_RESPONSE_STATUS } from './enum/bot.response.enum';

function formatResponseText(content) {
    return `\`\`\`${content}\`\`\` `;
}

export function successResponse(message, data) {
    if (data) {
        return formatResponseText(`[${BOT_RESPONSE_STATUS.SUCCESS}] | ${message}\n  ${data}`);
    }
    return formatResponseText(`[${BOT_RESPONSE_STATUS.SUCCESS}] | ${message}`);
}

export function failResponse(message, data) {
    if (data) {
        return formatResponseText(`[${BOT_RESPONSE_STATUS.FAIL}] | ${message}\n ${data}`);
    }
    return formatResponseText(`[${BOT_RESPONSE_STATUS.FAIL}] | ${message}`);
}

export function errorResponse(message, data) {
    if (data) {
        return formatResponseText(`[${BOT_RESPONSE_STATUS.ERROR}] | ${message}\n ${data}`);
    }
    return formatResponseText(`[${BOT_RESPONSE_STATUS.ERROR}] | ${message}`);
}
