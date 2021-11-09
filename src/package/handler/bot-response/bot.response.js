import { STATUS } from './enum/bot.response.enum';

function formatResponseText(content) {
    return `\`\`\`${content}\`\`\` `;
}

export function successResponse(message) {
    const response = `[${STATUS.SUCCESS}] | ${message}`;
    return formatResponseText(response);
}

export function failResponse(message) {
    const response = `[${STATUS.FAIL}] | ${message}`;
    return formatResponseText(response);
}

export function errorResponse(message) {
    const response = `[${STATUS.ERROR}] | ${message}`;
    return formatResponseText(response);
}
