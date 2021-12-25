import { DATE_FORMAT } from 'core/common/constant';

/**
 * @param {moment} date 
 *
 */
export function formatDateForResponse(date) {
    return `${date.format(DATE_FORMAT).toString()}`;
}
