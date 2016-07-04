import { Rule } from "./rules/Rule"
import { flatten } from "./Utils"

export type RuleSync = (value: any, requirement: any, attribute: string) => boolean
export type RuleAync = (value: any, requirement: any, attribute: string, done?: Function) => Promise<boolean> | void
export type RuleCheck = RuleSync | RuleAync

export interface RegisteredRules {
    [name: string]: Rule
}

export class Rules {

    public hasAsync: boolean = false
    private rules: any

    public static registered: RegisteredRules = {
        "required": null
    }

    public static register (name: string, checkFn: RuleCheck, message?: string): void {
        Rules.registered[name] = new Rule(name, checkFn, message)
    }

    constructor (rules: any) {
        this.rules = this.parseRules(flatten(rules))

        console.warn(this.rules)
    }

    public getRules (): any {
        return this.rules
    }

    private parseRules (rules: any): any {
        const registeredRules: Array<string> = Object.keys(Rules.registered)

        return Object.keys(rules).reduce((parsed: any, field: string) => {
            const fieldRules: string | Array<string> = rules[field]
            let _rules: Array<string> = []

            if (typeof fieldRules === "string") {
                _rules = fieldRules.split("|")
            } else if (Array.isArray(fieldRules)) {
                _rules = fieldRules
            }

            _rules
                .filter((rule) => registeredRules.indexOf(rule) !== -1)
                .forEach((rule: string) => {
                    let params: Array<string> = []
                    const [name, _params] = rule.split(":")

                    if (_params) {
                        params = _params.split(",")
                    }
                    parsed[field] = { name, params }
                })
            return parsed
        }, {})
    }

}