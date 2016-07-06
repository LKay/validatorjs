import { ErrorParams } from "../Errors";
export declare type RuleValidator = (value: any, ...params: any[]) => boolean | Promise<boolean> | void;
export declare class Rule {
    name: string;
    fn: RuleValidator;
    message: string;
    isAsync: boolean;
    constructor(name: string, fn: RuleValidator, message?: string, isAsync?: boolean);
    parseParams(params: Array<string>): Array<any>;
    getErrorParams(...params: any[]): ErrorParams;
}
