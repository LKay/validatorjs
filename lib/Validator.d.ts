import { Rules } from "./Rules";
import { RuleValidator } from "./rules/Rule";
import { Messages, MessagesStatic, ValidationMessages } from "./Messages";
import { Errors } from "./Errors";
export declare type AttributeFormatter = (attribute: string) => string;
export declare class Validator {
    static Promise: PromiseConstructor;
    static lang: string;
    static attributeFormatter: AttributeFormatter;
    static Messages: MessagesStatic;
    input: any;
    rules: Rules;
    messages: Messages;
    errors: Errors;
    constructor(input: any, rules: any, messages?: any);
    check(): boolean;
    checkAsync(passes?: Function, fails?: Function): Promise<boolean>;
    passes(callback?: Function): boolean | Promise<boolean>;
    fails(callback?: Function): boolean | Promise<boolean>;
    static make(input: any, rules: any, messages?: any): Validator;
    static setMessages(lang: string, messages: ValidationMessages): void;
    static getMessages(lang?: string): ValidationMessages;
    static useLang(lang: string): void;
    static getDefaultLang(): string;
    static setAttributeFormatter(formatter: AttributeFormatter): void;
    static register(name: string, fn: RuleValidator, message?: string): void;
    static registerAsync(name: string, fn: RuleValidator, message?: string): void;
}
