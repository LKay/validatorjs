import { flatten } from "flat"
import * as objectPath from "object-path"
import { Validator } from "./Validator"
import { Rule, RuleValidator } from "./rules/Rule"
import { Errors } from "./Errors"
/* Predefined Rules */
import { RuleRequired } from "./rules/Required"
import { RuleMin } from "./rules/Min"
import {error} from "util";

export interface RegisteredRules {
    [name: string]: Rule
}

export interface ParsedValidator {
    name: string
    params: Array<any>
}

export interface ParsedRules {
    [name: string]: {
        bail: boolean
        validators: Array<ParsedValidator>
    }}

export class Rules {

    public hasAsync: boolean = false
    private rules: ParsedRules
    private errors: Errors

    public static registered: RegisteredRules = {
        "min"      : RuleMin.make(),
        "required" : RuleRequired.make()
    }

    public static register (name: string, fn: RuleValidator, message?: string, isAsync: boolean = false): void {
        Rules.registered[name] = new Rule(name, fn, message, isAsync)
    }

    constructor (rules: any, errors: Errors) {
        this.errors = errors
        this.rules = this.parseRules(flatten(rules, { safe : true }))

        console.warn(this.rules)
    }

    public getRules (): ParsedRules {
        return this.rules
    }

    public validate (input: any): boolean {
        this.errors.clear()

        Object.keys(this.rules).forEach((field: string) => {
            let passes: boolean = true

            this.rules[field].validators.forEach((rule: ParsedValidator) => {
                if (this.rules[field].bail && !passes) {
                    return
                }

                const value: any = objectPath.get(input, field)
                const result = Rules.registered[rule.name].fn(value, ...rule.params, input)

                if (!result) {
                    passes = false
                    const errorParams = Rules.registered[rule.name].getErrorParams(...rule.params)
                    this.errors.add(field, { name : rule.name, params : errorParams })
                }
            })
        })

        return this.errors.errorsCount === 0
    }

    public validateAsync (input: any): Promise<boolean> {
        return Validator.Promise.resolve(true)
    }

    private parseRules (rules: any): any {
        const registeredRules: Array<string> = Object.keys(Rules.registered)

        return Object.keys(rules).reduce((parsed: ParsedRules, field: string) => {
            const fieldRules: string | Array<string> = rules[field]
            let _rules: Array<string> = []

            if (typeof fieldRules === "string") {
                _rules = fieldRules.split("|")
            } else if (Array.isArray(fieldRules)) {
                _rules = fieldRules
            }

            const bail: boolean = _rules.indexOf("bail") !== -1

            _rules.filter((_) => _ !== "bail").forEach((rule: string) => {
                let params: Array<string> = []
                const [name, _params] = rule.split(":")

                if (registeredRules.indexOf(name) === -1) {
                    return
                }

                if (Rules.registered[name].isAsync) {
                    this.hasAsync = true
                }

                if (_params) {
                    params = _params.split(",")
                }

                if (!parsed[field]) {
                    parsed[field] = { bail, validators: [] }
                }

                parsed[field].validators.push({ name, params : Rules.registered[name].parseParams(params) })
            })

            return parsed
        }, {})
    }

}