import * as findIndex from "array-find-index"
import { Validator } from "./Validator"
import { Messages, ErrorMessages } from "./Messages"

export interface ErrorParams {
    [name: string]: string
}

export interface ValidationError {
    name: string
    params: ErrorParams
}

export interface ValidationErrors {
    [field: string]: Array<ValidationError>
}

export class Errors {

    private messages: Messages
    public errors: ValidationErrors = {}
    public errorsCount: number = 0

    constructor (messages: Messages) {
        this.messages = messages
    }

    public clear (): void {
        this.errorsCount = 0
        this.errors = {}
    }

    public add (attribute: string, error: ValidationError): void {
        if (!this.has(attribute)) {
            this.errors[attribute] = []
        }

        if (findIndex(this.errors[attribute], (_: ValidationError) => _.name === error.name) === -1) {
            this.errors[attribute].push(error)
        }
        this.errorsCount++
    }

    public get (attribute: string, lang: string = Validator.lang): Array<string> {
        return this.messages.getMessages(attribute, this.errors[attribute], lang)
    }

    public first (attribute: string, lang: string = Validator.lang): string | boolean {
        if (this.has(attribute)) {
            return this.messages.getMessage(attribute, this.errors[attribute][0], lang)
        }
        return false
    }

    public all (lang: string = Validator.lang): ErrorMessages {
        return this.messages.getErrorMessages(this.errors, lang)
    }

    public has (attribute: string): boolean {
        return this.errors.hasOwnProperty(attribute)
    }

}

export class RuleValidatorError extends Error {
    constructor (name: string) {
        super(`ValidatorError: Parameters for rule '${name}' have incorrect format.`)
    }
}