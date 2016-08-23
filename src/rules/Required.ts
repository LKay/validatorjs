import { Rules } from "../Rules"
import { Rule, RuleValidator } from "./Rule"

export class RuleRequired extends Rule {

    public static ruleName: string = "required"

    public name: string = RuleRequired.ruleName
    public fn: RuleValidator = (value: any) => {
        return typeof value === "string" ? value.replace(/\s/g, "").length > 0 : [undefined, null].indexOf(value) === -1
    }

}

Rules.registered[RuleRequired.ruleName] = new RuleRequired()
