"use strict";
class Rule {
    constructor(name, fn, message, isAsync = false) {
        this.name = name;
        this.fn = fn;
        this.message = message;
        this.isAsync = isAsync;
    }
    parseParams(params) {
        return params;
    }
    getErrorParams(...params) {
        return {};
    }
}
exports.Rule = Rule;
//# sourceMappingURL=Rule.js.map