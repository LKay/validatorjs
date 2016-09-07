import { Rules } from "../Rules"
import { Rule, RuleValidator } from "./Rule"

export class RuleAlpha extends Rule {

    public static ruleName: string = "alpha"

    public static regex: RegExp = /^[a-z]+$/i

    public name: string = RuleAlpha.ruleName
    public fn: RuleValidator = (value: any) => {
        return RuleAlpha.regex.test(value)
    }

}

Rules.registered[RuleAlpha.ruleName] = new RuleAlpha()
