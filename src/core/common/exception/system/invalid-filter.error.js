export class InvalidFilter extends Error {
    constructor(filter) {
        super(`${filter.constructor.name} don't contain the filter method to apply to the context`);
    }
}
