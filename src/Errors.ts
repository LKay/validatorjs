import { Validator } from "./Validator"
import { Messages } from "./Messages"

export interface ErrorMessages {
    [field: string]: Array<string>
}

export class Errors {

    private messages: Messages
    public errors: ErrorMessages = {} as ErrorMessages
    public errorsCount: number = 0

    constructor (messages: Messages) {
        this.messages = messages
    }

    public clear (): void {
        this.errorsCount = 0
        this.errors = {} as ErrorMessages
    }

    public add (attribute: string, message: string): void {
        if (!this.has(attribute)) {
            this.errors[attribute] = []
        }

        if (this.errors[attribute].indexOf(message) === -1) {
            this.errors[attribute].push(message)
        }
        this.errorsCount++
    }

    public get (attribute: string, lang: string = Validator.lang): Array<string> {
        return this.errors[attribute] || []
    }

    public first (attribute: string, lang: string = Validator.lang): string | boolean {
        if (this.has(attribute)) {
            return this.errors[attribute][0]
        }
        return false
    }

    public all (lang: string = Validator.lang): ErrorMessages {
        return this.errors
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