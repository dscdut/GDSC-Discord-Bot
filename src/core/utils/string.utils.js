import slugify from 'slugify';

export const unAccentVietnamese = str => slugify(
    str, {
        replacement: ' ',
        locale: 'vi',
        trim: true
    }
);

export const toSnippetFormat = content => `\`\`\`${content}\`\`\` `;

export const toCodeFormat = str => `\`${str}\``;

export const toBold = str => `**${str}**`;

export const isUrl = value => {
    // eslint-disable-next-line no-useless-escape
    const urlExpression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
    const regex = new RegExp(urlExpression);
    return regex.test(value);
};
