import { ValidationError, ValidationErrors } from "./Errors";
export interface ValidationMessages {
    [name: string]: string | ValidationMessages;
}
export interface CustomValidationMessages extends ValidationMessages {
    custom?: ValidationMessages;
}
export interface LocalisedMessages {
    [lang: string]: ValidationMessages;
}
export interface ErrorMessages {
    [field: string]: Array<string>;
}
export interface MessagesStatic {
    messages: LocalisedMessages;
}
export declare class Messages {
    static messages: LocalisedMessages;
    customMessages: CustomValidationMessages;
    constructor(messages?: ValidationMessages);
    getErrorMessages(errors: ValidationErrors, lang: string): ErrorMessages;
    getMessages(field: string, errors: Array<ValidationError>, lang: string): string[];
    getMessage(field: string, error: ValidationError, lang: string): string;
}
