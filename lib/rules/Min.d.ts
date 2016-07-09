import { Rule } from "./Rule";
import { ErrorParams } from "../Errors";
export declare type ValidatorMinParams = [number];
export declare class RuleMin extends Rule {
    constructor();
    static make(): RuleMin;
    parseParams(params: Array<string>): ValidatorMinParams;
    getErrorParams(min: number): ErrorParams;
}
