import { Rule, RuleValidator } from "./rules/Rule";
import { Errors } from "./Errors";
export interface RegisteredRules {
    [name: string]: Rule;
}
export interface ParsedValidator {
    name: string;
    params: Array<any>;
}
export interface ParsedRules {
    [name: string]: {
        bail: boolean;
        validators: Array<ParsedValidator>;
    };
}
export declare class Rules {
    hasAsync: boolean;
    private rules;
    private errors;
    static registered: RegisteredRules;
    static register(name: string, fn: RuleValidator, message?: string, isAsync?: boolean): void;
    constructor(rules: any, errors: Errors);
    getRules(): ParsedRules;
    validate(input: any): boolean;
    validateAsync(input: any): Promise<boolean>;
    private parseRules(rules);
}
