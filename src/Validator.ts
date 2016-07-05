import { deprecate } from "core-decorators"
import {Rules, ParsedRules, ParsedRule} from "./Rules"
import { RuleValidator } from "./rules/Rule"
import { Messages, ValidationMessages } from "./Messages"
import { Errors } from "./Errors"

export type AttributeFormatter = (attribute: string) => string

const formatter: AttributeFormatter = (attribute: string) => attribute.replace(/[_\[]/g, ' ').replace(/]/g, '')

export class Validator {

    /* Promise A+ */
    public static Promise: PromiseConstructor = Promise

    /* Defaults */
    public static lang: string = "en"
    public static attributeFormatter: AttributeFormatter = formatter

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


    /*
    constructor (input: any, rules: RulesSchema, customMessages?: ValidationMessages) {
        this.input = input
        this.messages = new Messages()
        this.rules = new Rules(rules)
        /*
         var lang = Validator.getDefaultLang();
         this.input = this._flattenObject(input);

         this.messages = Lang._make(lang);
         this.messages._setCustom(customMessages);
         this.setAttributeFormatter(Validator.prototype.attributeFormatter);

         this.errors = new Errors();
         this.errorCount = 0;

         this.hasAsync = false;
         this.rules = this._parseRules(rules);

    }
    */

    public static make (input: any, rules: any, messages?: any): Validator {
        return new Validator(input, rules, messages)
    }

    public static setMessages (lang: string, messages: ValidationMessages): void {

    }

    public static getMessages (lang?: string): ValidationMessages {
        return {}
    }

    public static useLang (lang: string): void {

    }

    public static getDefaultLang (): string {
        return ""
    }

    public static setAttributeFormatter (formatter: AttributeFormatter): void {

    }

    public static stopOnError (attributes: boolean | Array<string>): void {

    }

    public static register (name: string, fn: RuleValidator, message?: string): void {
        Rules.register(name, fn, message)
    }
    
    public static registerAsync (name: string, fn: RuleValidator, message?: string): void {
        Rules.register(name, fn, message, true)
    }

}