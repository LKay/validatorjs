"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const core_decorators_1 = require("core-decorators");
const Errors_1 = require("./Errors");
class Validator {
    constructor(input, rules, customMessages) {
        this.errors = new Errors_1.Errors();
        this.errorCount = 0;
    }
    check() { }
    checkAsync() {
        this.check();
    }
    static make(input, rules, customMessages) {
        return new Validator(input, rules, customMessages);
    }
    static setMessages(lang, messages) {
    }
    static getMessages(lang) {
        return {};
    }
    static useLang(lang) {
    }
    static getDefaultLang() {
        return "";
    }
    static setAttributeFormatter(formatter) {
    }
    static stopOnError(attributes) {
    }
    static register(name, fn, message) {
    }
    static registerAsync(name, fn, message) {
        Validator.register(name, fn, message);
    }
}
Validator.lang = "en";
Validator.attributeFormatter = (attribute) => attribute.replace(/[_\[]/g, ' ').replace(/]/g, '');
Validator.numericRules = ["integer", "numeric"];
__decorate([
    core_decorators_1.deprecate("Method `checkAsync` is deprecated since 3.0.0. Use `check` instead.")
], Validator.prototype, "checkAsync", null);
__decorate([
    core_decorators_1.deprecate("Method `registerAsync` is deprecated since 3.0.0. Use `register` instead.")
], Validator, "registerAsync", null);
//# sourceMappingURL=Validator.js.map