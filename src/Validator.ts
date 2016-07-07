import { Rules, ParsedRules } from "./Rules"
import { RuleValidator } from "./rules/Rule"
import { Messages, MessagesStatic, ValidationMessages } from "./Messages"
import { Errors } from "./Errors"

export type AttributeFormatter = (attribute: string) => string

const formatter: AttributeFormatter = (attribute: string) => attribute.replace(/[_\[]/g, ' ').replace(/]/g, '')

export class Validator {

    /* Promise A+ */
    public static Promise: PromiseConstructor = Promise

    /* Defaults */
    public static lang: string = "en"
    public static attributeFormatter: AttributeFormatter = formatter
    public static Messages: MessagesStatic = Messages

    public input: any
    public rules: Rules
    public messages: Messages
    public errors: Errors

    constructor (input: any, rules: any, messages?: any) {
        this.input = input
        this.messages = new Messages(messages)
        this.errors = new Errors(this.messages)
        this.rules = new Rules(rules, this.errors)
    }

    public check (): boolean {
        if (this.rules.hasAsync) {
            throw new Error("Cannot synchronously validate schema containing asynchronous rules.")
        }
        return this.rules.validate(this.input)
    }

    public checkAsync (passes?: Function, fails?: Function): Promise<boolean> {
        return this.rules.validateAsync(this.input)
    }

    public passes (callback?: Function): boolean | Promise<boolean> {
        if (this.rules.hasAsync) {
            return this.checkAsync(callback)
        }
        return this.check()
    }

    public fails (callback?: Function): boolean | Promise<boolean> {
        if (this.rules.hasAsync) {
            return this.checkAsync(null, callback)
                .then((result: boolean) => Validator.Promise.resolve(!result))
        }
        return !this.check()
    }

    public static make (input: any, rules: any, messages?: any): Validator {
        return new Validator(input, rules, messages)
    }

    public static setMessages (lang: string, messages: ValidationMessages): void {
        Messages.messages[lang] = messages
    }

    public static getMessages (lang: string = Validator.lang): ValidationMessages {
        return Messages.messages[lang]
    }

    public static useLang (lang: string): void {
        Validator.lang = lang
    }

    public static getDefaultLang (): string {
        return Validator.lang
    }

    public static setAttributeFormatter (formatter: AttributeFormatter): void {

    }

    public static register (name: string, fn: RuleValidator, message?: string): void {
        Rules.register(name, fn, message)
    }
    
    public static registerAsync (name: string, fn: RuleValidator, message?: string): void {
        Rules.register(name, fn, message, true)
    }

}
