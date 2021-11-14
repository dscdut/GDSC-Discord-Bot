import { BOT_RESPONSE_STATUS } from './enum/bot.response.enum';

function formatResponseText(content) {
    return `\`\`\`${content}\`\`\` `;
}

export function successResponse(message, data) {
    const response = `[${BOT_RESPONSE_STATUS.SUCCESS}] | ${message}`;
    if (data) {
        return {
            status: formatResponseText(response),
            data
        };
    }
    return { status: formatResponseText(response) };
}

export function failResponse(message, data) {
    const response = `[${BOT_RESPONSE_STATUS.FAIL}] | ${message}`;
    if (data) {
        return {
            status: formatResponseText(response),
            data
        };
    }
    return { status: formatResponseText(response) };
}

export function errorResponse(message, data) {
    const response = `[${BOT_RESPONSE_STATUS.ERROR}] | ${message}`;
    if (data) {
        return {
            status: formatResponseText(response),
            data
        };
    }
    return { status: formatResponseText(response) };
}
