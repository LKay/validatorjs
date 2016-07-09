"use strict";
const Rules_1 = require("./Rules");
const Messages_1 = require("./Messages");
const Errors_1 = require("./Errors");
const formatter = (attribute) => attribute.replace(/[_\[]/g, ' ').replace(/]/g, '');
class Validator {
    constructor(input, rules, messages) {
        this.input = input;
        this.messages = new Messages_1.Messages(messages);
        this.errors = new Errors_1.Errors(this.messages);
        this.rules = new Rules_1.Rules(rules, this.errors);
    }
    check() {
        if (this.rules.hasAsync) {
            throw new Error("Cannot synchronously validate schema containing asynchronous rules.");
        }
        return this.rules.validate(this.input);
    }
    checkAsync(passes, fails) {
        return this.rules.validateAsync(this.input, passes, fails);
    }
    passes(callback) {
        if (this.rules.hasAsync) {
            return this.checkAsync(callback);
        }
        return this.check();
    }
    fails(callback) {
        if (this.rules.hasAsync) {
            return this.checkAsync(null, callback)
                .then((result) => Validator.Promise.resolve(!result));
        }
        return !this.check();
    }
    static make(input, rules, messages) {
        return new Validator(input, rules, messages);
    }
    static setMessages(lang, messages) {
        Messages_1.Messages.messages[lang] = messages;
    }
    static getMessages(lang = Validator.lang) {
        return Messages_1.Messages.messages[lang];
    }
    static useLang(lang) {
        Validator.lang = lang;
    }
    static getDefaultLang() {
        return Validator.lang;
    }
    static setAttributeFormatter(formatter) {
        Validator.attributeFormatter = formatter;
    }
    static register(name, fn, message) {
        Rules_1.Rules.register(name, fn, message);
    }
    static registerAsync(name, fn, message) {
        Rules_1.Rules.register(name, fn, message, true);
    }
}
Validator.Promise = Promise;
Validator.lang = "en";
Validator.attributeFormatter = formatter;
Validator.Messages = Messages_1.Messages;
exports.Validator = Validator;
//# sourceMappingURL=Validator.js.map