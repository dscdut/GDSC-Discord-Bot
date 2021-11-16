import { TITLE_VALUE_SEPARATOR } from 'core/common/constant';

export function checkIfValidCommand(content) {
    return content.includes(TITLE_VALUE_SEPARATOR);
}
