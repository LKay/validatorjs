import { ErrorParams } from "../Errors";
export declare type AsyncResult = boolean | boolean[] | [boolean, string];
export declare type RuleValidator = (value: any, ...params: any[]) => boolean | Promise<AsyncResult> | void;
export declare class Rule {
    name: string;
    fn: RuleValidator;
    message: string;
    isAsync: boolean;
    timeout: number;
    constructor(name: string, fn: RuleValidator, message?: string, isAsync?: boolean, timeout?: number);
    parseParams(params: Array<string>): Array<any>;
    getErrorParams(...params: any[]): ErrorParams;
}
