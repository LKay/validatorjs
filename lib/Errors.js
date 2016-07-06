"use strict";
const findIndex = require("array-find-index");
const Validator_1 = require("./Validator");
class Errors {
    constructor(messages) {
        this.errors = {};
        this.errorsCount = 0;
        this.messages = messages;
    }
    clear() {
        this.errorsCount = 0;
        this.errors = {};
    }
    add(attribute, error) {
        if (!this.has(attribute)) {
            this.errors[attribute] = [];
        }
        if (findIndex(this.errors[attribute], (_) => _.name === error.name) === -1) {
            this.errors[attribute].push(error);
        }
        this.errorsCount++;
    }
    get(attribute, lang = Validator_1.Validator.lang) {
        return this.messages.getMessages(attribute, this.errors[attribute], lang);
    }
    first(attribute, lang = Validator_1.Validator.lang) {
        if (this.has(attribute)) {
            return this.messages.getMessage(attribute, this.errors[attribute][0], lang);
        }
        return false;
    }
    all(lang = Validator_1.Validator.lang) {
        return this.messages.getErrorMessages(this.errors, lang);
    }
    has(attribute) {
        return this.errors.hasOwnProperty(attribute);
    }
}
exports.Errors = Errors;
class RuleValidatorError extends Error {
    constructor(name) {
        super(`ValidatorError: Parameters for rule '${name}' have incorrect format.`);
    }
}
exports.RuleValidatorError = RuleValidatorError;
//# sourceMappingURL=Errors.js.map