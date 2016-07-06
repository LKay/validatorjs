import { Messages, ErrorMessages } from "./Messages";
export interface ErrorParams {
    [name: string]: string;
}
export interface ValidationError {
    name: string;
    params: ErrorParams;
}
export interface ValidationErrors {
    [field: string]: Array<ValidationError>;
}
export declare class Errors {
    private messages;
    errors: ValidationErrors;
    errorsCount: number;
    constructor(messages: Messages);
    clear(): void;
    add(attribute: string, error: ValidationError): void;
    get(attribute: string, lang?: string): Array<string>;
    first(attribute: string, lang?: string): string | boolean;
    all(lang?: string): ErrorMessages;
    has(attribute: string): boolean;
}
export declare class RuleValidatorError extends Error {
    constructor(name: string);
}
