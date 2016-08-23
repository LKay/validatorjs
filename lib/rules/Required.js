"use strict";
const Rules_1 = require("../Rules");
const Rule_1 = require("./Rule");
const isAsync = false;
const name = "require";
const validator = (value) => {
    return [undefined, null].indexOf(value) === -1 || (typeof value === "string" && value.replace(/\s/g, "").length > 0);
};
class RuleRequired extends Rule_1.Rule {
    constructor() {
        super(name, validator, null, isAsync);
    }
    static make() {
        return new RuleRequired();
    }
}
exports.RuleRequired = RuleRequired;
Rules_1.Rules.registered[name] = RuleRequired.make();
//# sourceMappingURL=Required.js.map