"use strict";
const Rule_1 = require("./Rule");
const Errors_1 = require("../Errors");
const isAsync = false;
const name = "min";
const validator = (value, min) => {
    return (typeof value === "number" && value >= min) || (typeof value === "string" && value.length >= min) || false;
};
class RuleMin extends Rule_1.Rule {
    constructor() {
        super(name, validator, null, isAsync);
    }
    static make() {
        return new RuleMin();
    }
    parseParams(params) {
        const [_min] = params;
        const min = parseInt(_min, 10);
        if (!_min || isNaN(min)) {
            throw new Errors_1.RuleValidatorError(this.name);
        }
        return [min];
    }
    getErrorParams(min) {
        return { min: String(min) };
    }
}
exports.RuleMin = RuleMin;
//# sourceMappingURL=Min.js.map