"use strict";
const flat_1 = require("flat");
const objectAssign = require("object-assign");
const objectPath = require("object-path");
const Validator_1 = require("./Validator");
const Rule_1 = require("./rules/Rule");
const Errors_1 = require("./Errors");
class Rules {
    constructor(rules, errors) {
        this.hasAsync = false;
        this.errors = errors;
        this.rules = this.parseRules(flat_1.flatten(rules, { safe: true }));
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
            const value = objectPath.get(input, field);
            let passes = true;
            if (this.rules[field].sometimes && value === undefined) {
                return;
            }
            this.rules[field].validators.forEach((rule) => {
                if (this.rules[field].bail && !passes) {
                    return;
                }
                const result = Rules.registered[rule.name].fn(value, ...rule.params, input);
                if (!result) {
                    passes = false;
                    const errorParams = Rules.registered[rule.name].getErrorParams(...rule.params);
                    const numeric = this.rules[field].numeric;
                    this.errors.add(field, { name: rule.name, numeric: numeric, params: errorParams });
                }
            });
        });
        return this.errors.errorsCount === 0;
    }
    validateAsync(input, passes, fails) {
        this.errors.clear();
        let sequence = Validator_1.Validator.Promise.resolve(true);
        let allPass = true;
        Object.keys(this.rules).forEach((field) => {
            const value = objectPath.get(input, field);
            if (this.rules[field].sometimes && value === undefined) {
                return;
            }
            this.rules[field].validators.forEach((rule) => {
                const ruleValidator = Rules.registered[rule.name];
                const handleError = (reason) => {
                    allPass = false;
                    const errorParams = ruleValidator.getErrorParams(...rule.params);
                    const numeric = this.rules[field].numeric;
                    this.errors.add(field, { name: rule.name, numeric: numeric, params: objectAssign({}, errorParams, { reason: reason }) });
                };
                sequence = sequence.then((passes) => {
                    if (this.rules[field].bail && !passes) {
                        return Validator_1.Validator.Promise.resolve(false);
                    }
                    if (!ruleValidator.isAsync) {
                        const syncResult = ruleValidator.fn(value, ...rule.params, input);
                        if (!syncResult) {
                            handleError();
                        }
                        return Validator_1.Validator.Promise.resolve(syncResult);
                    }
                    return new Validator_1.Validator.Promise((resolve, reject) => {
                        const timer = setTimeout(() => {
                            reject(new Errors_1.AsyncTimeoutError(rule.name, ruleValidator.timeout));
                        }, ruleValidator.timeout);
                        const done = (result, reason) => {
                            clearTimeout(timer);
                            if (!result) {
                                handleError(reason);
                            }
                            resolve(result);
                        };
                        const asyncResult = ruleValidator.fn(value, ...rule.params, done, input);
                        if (!!asyncResult && ["object", "function"].indexOf(typeof asyncResult) !== -1 && typeof asyncResult.then === "function") {
                            asyncResult
                                .then((result) => {
                                if (Array.isArray(result)) {
                                    const [res, reason] = result;
                                    done(res, reason);
                                }
                                else {
                                    done(result);
                                }
                            })
                                .catch((e) => done(false, String(e)));
                        }
                    });
                });
            });
        });
        return sequence
            .then(() => {
            if (typeof passes === "function") {
                passes(allPass);
            }
            if (typeof fails === "function") {
                fails(!allPass);
            }
            return Validator_1.Validator.Promise.resolve(allPass);
        });
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
            const sometimes = _rules.indexOf("sometimes") !== -1;
            const numeric = _rules.some((_) => Rules.numericRules.indexOf(_) !== -1);
            _rules.filter((_) => ["bail", "sometimes"].indexOf(_) === -1).forEach((rule) => {
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
                    parsed[field] = { bail: bail, sometimes: sometimes, numeric: numeric, validators: [] };
                }
                parsed[field].validators.push({ name: name, params: Rules.registered[name].parseParams(params) });
            });
            return parsed;
        }, {});
    }
}
Rules.numericRules = ["integer", "numeric"];
Rules.registered = {};
exports.Rules = Rules;
//# sourceMappingURL=Rules.js.map