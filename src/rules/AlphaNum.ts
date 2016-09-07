import { Rules } from "../Rules"
import { Rule, RuleValidator } from "./Rule"

export class RuleAlphaNum extends Rule {

    public static ruleName: string = "alpha_num"

    public static regex: RegExp = /^[a-z0-9]+$/i

    public name: string = RuleAlphaNum.ruleName
    public fn: RuleValidator = (value: any) => {
        return RuleAlphaNum.regex.test(value)
    }

}

Rules.registered[RuleAlphaNum.ruleName] = new RuleAlphaNum()
