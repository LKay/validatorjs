import { Rules } from "../Rules"
import { Rule, RuleValidator } from "./Rule"
import { ErrorParams } from "../Errors"

export type ValidatorRegexParams = [RegExp]

export class RuleRegex extends Rule {

    public static ruleName: string = "regex"

    public name: string = RuleRegex.ruleName
    public fn: RuleValidator = (value: any, pattern: RegExp) => {
        return pattern.test(value)
    }

    public parseParams (params: Array<string>): ValidatorRegexParams {
        const [_pattern]: Array<string> = params

        const mod: RegExp = /[g|i|m|u|y]{1,5}$/
        const flag: Array<any> = _pattern.match(mod)

        const pattern: RegExp = new RegExp(_pattern.replace(mod, "").slice(1, -1), flag ? flag[0] : "")

        return [pattern]
    }

    public getErrorParams (pattern: RegExp): ErrorParams {
        return { pattern : String(pattern) }
    }

}

Rules.registered[RuleRegex.ruleName] = new RuleRegex()
