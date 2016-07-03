export interface ErrorMessages {
    [field: string]: Array<string>;
}
export declare class Errors {
    errors: ErrorMessages;
    add(attribute: string, message: string): void;
    get(attribute: string): Array<string>;
    first(attribute: string): string | boolean;
    all(): ErrorMessages;
    has(attribute: string): boolean;
}
