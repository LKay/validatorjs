"use strict";
class Errors {
    constructor() {
        this.errors = {};
    }
    add(attribute, message) {
        if (!this.has(attribute)) {
            this.errors[attribute] = [];
        }
        if (this.errors[attribute].indexOf(message) === -1) {
            this.errors[attribute].push(message);
        }
    }
    get(attribute) {
        return this.errors[attribute] || [];
    }
    first(attribute) {
        if (this.has(attribute)) {
            return this.errors[attribute][0];
        }
        return false;
    }
    all() {
        return this.errors;
    }
    has(attribute) {
        return this.errors.hasOwnProperty(attribute);
    }
}
exports.Errors = Errors;
//# sourceMappingURL=Errors.js.map