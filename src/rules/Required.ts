import { Rule, RuleValidator } from "./Rule"
import { ErrorParams } from "../Errors"

const isAsync: boolean = false
const name: string = "require"
const validator: RuleValidator = (value: any) => {
    return [undefined, null].indexOf(value) === -1 || (typeof value === "string" && value.replace(/\s/g, "").length > 0)
}

export class RuleRequired extends Rule {

    constructor () {
        super(name, validator, null, isAsync)
    }

    public static make (): RuleRequired {
        return new RuleRequired()
    }

}