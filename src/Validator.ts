import { deprecate } from "core-decorators"
import { Rules, RuleCheck } from "./Rules"
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
    public errors: Errors = new Errors()
    public errorCount: number = 0

    constructor (input: any, rules: any, messages?: any) {
        this.input = input
        this.rules = new Rules(rules)
    }

    public check (): boolean {
        return true
    }

    public checkAsync (passes: Function, fails: Function): Promise<boolean> {
        return Validator.Promise.resolve(true)
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

    public static register (name: string, fn: RuleCheck, message?: string): void {

    }

    @deprecate("Method `registerAsync` is deprecated since 3.0.0. Use `register` instead.", { url : "https://git.io/vKfmt" })
    public static registerAsync (name: string, fn: RuleCheck, message?: string): void {
        Validator.register(name, fn, message)
    }

}