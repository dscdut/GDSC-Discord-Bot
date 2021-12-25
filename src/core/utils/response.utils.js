/**
 * @param {moment} date 
 *
 */
export function formatDateForResponse(date) {
    return `${date.date()}/${date.month()}/${date.year()} - ${date.hour()}:${date.minute()}:00]`;
}
