import { Rules } from "../Rules"
import { Rule, RuleValidator } from "./Rule"
import { RuleValidatorError, ErrorParams } from "../Errors"

export type ValidatorMinParams = [number]

export class RuleMax extends Rule {

    public static ruleName: string = "max"

    public name: string = RuleMax.ruleName
    public fn: RuleValidator = (value: any, min: number) => {
        return (typeof value === "number" && value <= min) || (typeof value === "string" && value.length <= min) || false
    }

    public parseParams (params: Array<string>): ValidatorMinParams {
        const [_max]: Array<string> = params
        const max: number = parseInt(_max, 10)

        if (!_max || isNaN(max)) {
            throw new RuleValidatorError(this.name)
        }
        return [max]
    }

    public getErrorParams (max: number): ErrorParams {
        return { max : String(max) }
    }

}

Rules.registered[RuleMax.ruleName] = new RuleMax()
