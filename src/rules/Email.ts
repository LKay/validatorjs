import { Rules } from "../Rules"
import { Rule, RuleValidator } from "./Rule"

export class RuleEmail extends Rule {

    public static ruleName: string = "email"

    // tslint:disable-next-line:max-line-length
    public static regex: RegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

    public name: string = RuleEmail.ruleName
    public fn: RuleValidator = (value: any) => {
        return RuleEmail.regex.test(value)
    }

}

Rules.registered[RuleEmail.ruleName] = new RuleEmail()
