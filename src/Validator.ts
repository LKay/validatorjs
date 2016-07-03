import { deprecate } from "core-decorators"
import { Rules, RuleCheck } from "./Rules"
import { Messages, ValidationMessages } from "./Messages"
import { Errors } from "./Errors"

export interface RulesSchema {
    [key: string]: string | Array<string> | RulesSchema
}

export type AttributeFormatter = (attribute: string) => string

class Validator {
    
    public input: any
    public messages: Messages
    public errors: Errors = new Errors()
    public errorCount: number = 0
    public rules: Rules

    public static lang: string = "en"
    public static attributeFormatter: AttributeFormatter = (attribute: string) => attribute.replace(/[_\[]/g, ' ').replace(/]/g, '')
    public static numericRules: Array<string> = ["integer", "numeric"]

    constructor (input: any, rules: RulesSchema, customMessages?: ValidationMessages) {
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
         */
    }

    public check (): void {}

    @deprecate("Method `checkAsync` is deprecated since 3.0.0. Use `check` instead.")
    public checkAsync (): void {
        this.check()
    }

    public static make (input: any, rules: RulesSchema, customMessages?: ValidationMessages): Validator {
        return new Validator(input, rules, customMessages)
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

    @deprecate("Method `registerAsync` is deprecated since 3.0.0. Use `register` instead.")
    public static registerAsync (name: string, fn: RuleCheck, message?: string): void {
        Validator.register(name, fn, message)
    }

}