"use strict";
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
//# sourceMappingURL=Required.js.map