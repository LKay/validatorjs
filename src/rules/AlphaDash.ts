import { Rules } from "../Rules"
import { Rule, RuleValidator } from "./Rule"

export class RuleAlphaDash extends Rule {

    public static ruleName: string = "alpha_dash"

    public static regex: RegExp = /^[a-z\-]+$/i

    public name: string = RuleAlphaDash.ruleName
    public fn: RuleValidator = (value: any) => {
        return RuleAlphaDash.regex.test(value)
    }

}

Rules.registered[RuleAlphaDash.ruleName] = new RuleAlphaDash()
