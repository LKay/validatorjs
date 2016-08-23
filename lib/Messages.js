"use strict";
const objectPath = require("object-path");
const Validator_1 = require("./Validator");
const en_1 = require("./lang/en");
class Messages {
    constructor(messages) {
        this.attributeNames = {};
        this.customMessages = messages || {};
        this.customMessages.custom = this.customMessages.custom || {};
    }
    getErrorMessages(errors, lang) {
        return Object.keys(errors).reduce((messages, field) => {
            messages[field] = this.getMessages(field, errors[field], lang);
            return messages;
        }, {});
    }
    getMessages(field, errors, lang) {
        return errors.map((error) => this.getMessage(field, error, lang));
    }
    getMessage(field, error, lang) {
        const key = `${field}.${error.name}`;
        const template = objectPath.get(this.customMessages.custom, `${key}.${error.numeric ? "numeric" : "string"}`)
            || objectPath.get(this.customMessages.custom, key)
            || objectPath.get(this.customMessages.custom, field)
            || objectPath.get(this.customMessages, error.name)
            || objectPath.get(Messages.messages[lang], error.name)
            || key;
        return Object.keys(error.params).reduce((message, param) => message.replace(`:${param}`, error.params[param]), template).replace(":attribute", Validator_1.Validator.attributeFormatter(objectPath.get(this.attributeNames, field, field)));
    }
}
Messages.messages = { en: en_1.default };
exports.Messages = Messages;
//# sourceMappingURL=Messages.js.map