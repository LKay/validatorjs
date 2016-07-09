import { flatten } from "flat"
import objectAssign = require("object-assign")
import * as objectPath from "object-path"
import { Validator, AsyncCallback } from "./Validator"
import { Rule, RuleValidator, AsyncResult } from "./rules/Rule"
import { Errors, AsyncTimeoutError } from "./Errors"
/* Predefined Rules */
import { RuleRequired } from "./rules/Required"
import { RuleMin } from "./rules/Min"

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
        numeric: boolean
        validators: Array<ParsedValidator>
    }
}

export type AsyncDone = (result: boolean, reason?: string) => void

export class Rules {

    public hasAsync: boolean = false
    private rules: ParsedRules
    private errors: Errors

    public static numericRules: Array<string> = ["integer", "numeric"]

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
    }

    public getRules (): ParsedRules {
        return this.rules
    }

    public validate (input: any): boolean {
        this.errors.clear()

        Object.keys(this.rules).forEach((field: string) => {
            const value: any = objectPath.get(input, field)
            let passes: boolean = true

            this.rules[field].validators.forEach((rule: ParsedValidator) => {
                if (this.rules[field].bail && !passes) {
                    return
                }

                const result = Rules.registered[rule.name].fn(value, ...rule.params, input)

                if (!result) {
                    passes = false
                    const errorParams = Rules.registered[rule.name].getErrorParams(...rule.params)
                    const numeric: boolean = this.rules[field].numeric
                    this.errors.add(field, { name : rule.name, numeric, params : errorParams })
                }
            })
        })

        return this.errors.errorsCount === 0
    }

    public validateAsync (input: any, passes?: AsyncCallback, fails?: AsyncCallback): Promise<boolean> {
        this.errors.clear()

        let sequence: Promise<boolean> = Validator.Promise.resolve(true)
        let allPass: boolean = true

        Object.keys(this.rules).forEach((field: string) => {
            const value: any = objectPath.get(input, field)

            this.rules[field].validators.forEach((rule: ParsedValidator) => {
                const ruleValidator = Rules.registered[rule.name]

                const handleError = (reason?: string) => {
                    allPass = false
                    const errorParams = ruleValidator.getErrorParams(...rule.params)
                    const numeric: boolean = this.rules[field].numeric
                    this.errors.add(field, { name : rule.name, numeric, params : objectAssign({}, errorParams, { reason }) })
                }

                sequence = sequence.then((passes: boolean) =>{
                    if (this.rules[field].bail && !passes) {
                        return Validator.Promise.resolve(false)
                    }

                    if (!ruleValidator.isAsync) {
                        const syncResult = ruleValidator.fn(value, ...rule.params, input)
                        if (!syncResult) {
                            handleError()
                        }
                        return Validator.Promise.resolve(syncResult as boolean)
                    }

                    return new Validator.Promise((resolve: Function, reject: Function) => {
                        const timer = setTimeout(() => {
                            reject(new AsyncTimeoutError(rule.name, ruleValidator.timeout))
                        }, ruleValidator.timeout)
                        
                        const done: AsyncDone = (result: boolean, reason?: string) => {
                            clearTimeout(timer)
                            if (!result) {
                                handleError(reason)
                            }
                            resolve(result)
                        }

                        const asyncResult: any = ruleValidator.fn(value, ...rule.params, done, input)

                        /* Check if returned value is Promise instance and handle its processing */
                        if (!!asyncResult && ["object", "function"].indexOf(typeof asyncResult) !== -1 && typeof asyncResult.then === "function") {
                            asyncResult
                                .then((result: AsyncResult) => {
                                    if (Array.isArray(result)) {
                                        const [res, reason] = result as [boolean, string]
                                        done(res, reason)
                                    } else {
                                        done(result)
                                    }
                                })
                                .catch((e: any) => done(false, String(e)))
                        }
                    })
                })
            })
        })
        return sequence
            .then(() => {
                if (typeof passes === "function") {
                    passes(allPass)
                }
                if (typeof fails === "function") {
                    fails(!allPass)
                }
                return Validator.Promise.resolve(allPass)
            })
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
            const numeric: boolean = _rules.some((_: string) => Rules.numericRules.indexOf(_) !== -1)

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
                    parsed[field] = { bail, numeric, validators: [] }
                }

                parsed[field].validators.push({ name, params : Rules.registered[name].parseParams(params) })
            })

            return parsed
        }, {})
    }

}