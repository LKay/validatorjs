"use strict";
const flat_1 = require("flat");
const objectPath = require("object-path");
const Validator_1 = require("./Validator");
const Rule_1 = require("./rules/Rule");
const Required_1 = require("./rules/Required");
const Min_1 = require("./rules/Min");
class Rules {
    constructor(rules, errors) {
        this.hasAsync = false;
        this.errors = errors;
        this.rules = this.parseRules(flat_1.flatten(rules, { safe: true }));
        console.warn(this.rules);
    }
    static register(name, fn, message, isAsync = false) {
        Rules.registered[name] = new Rule_1.Rule(name, fn, message, isAsync);
    }
    getRules() {
        return this.rules;
    }
    validate(input) {
        this.errors.clear();
        Object.keys(this.rules).forEach((field) => {
            let passes = true;
            this.rules[field].validators.forEach((rule) => {
                if (this.rules[field].bail && !passes) {
                    return;
                }
                const value = objectPath.get(input, field);
                const result = Rules.registered[rule.name].fn(value, ...rule.params, input);
                if (!result) {
                    passes = false;
                    const errorParams = Rules.registered[rule.name].getErrorParams(...rule.params);
                    this.errors.add(field, { name: rule.name, params: errorParams });
                }
            });
        });
        return this.errors.errorsCount === 0;
    }
    validateAsync(input) {
        return Validator_1.Validator.Promise.resolve(true);
    }
    parseRules(rules) {
        const registeredRules = Object.keys(Rules.registered);
        return Object.keys(rules).reduce((parsed, field) => {
            const fieldRules = rules[field];
            let _rules = [];
            if (typeof fieldRules === "string") {
                _rules = fieldRules.split("|");
            }
            else if (Array.isArray(fieldRules)) {
                _rules = fieldRules;
            }
            const bail = _rules.indexOf("bail") !== -1;
            _rules.filter((_) => _ !== "bail").forEach((rule) => {
                let params = [];
                const [name, _params] = rule.split(":");
                if (registeredRules.indexOf(name) === -1) {
                    return;
                }
                if (Rules.registered[name].isAsync) {
                    this.hasAsync = true;
                }
                if (_params) {
                    params = _params.split(",");
                }
                if (!parsed[field]) {
                    parsed[field] = { bail: bail, validators: [] };
                }
                parsed[field].validators.push({ name: name, params: Rules.registered[name].parseParams(params) });
            });
            return parsed;
        }, {});
    }
}
Rules.registered = {
    "min": Min_1.RuleMin.make(),
    "required": Required_1.RuleRequired.make()
};
exports.Rules = Rules;
//# sourceMappingURL=Rules.js.map