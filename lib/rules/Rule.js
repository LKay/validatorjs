"use strict";
const ASYNC_TIMEOUT = 5000;
class Rule {
    constructor(name, fn, message, isAsync = false, timeout = ASYNC_TIMEOUT) {
        this.name = name;
        this.fn = fn;
        this.message = message;
        this.isAsync = isAsync;
        this.timeout = timeout;
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