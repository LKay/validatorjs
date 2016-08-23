import { Rules } from "../Rules"
import { Rule, RuleValidator } from "./Rule"
import { RuleValidatorError, ErrorParams } from "../Errors"

export type ValidatorMinParams = [number]

export class RuleMin extends Rule {

    public static ruleName: string = "min"

    public name: string = RuleMin.ruleName
    public fn: RuleValidator = (value: any, min: number) => {
        return (typeof value === "number" && value >= min) || (typeof value === "string" && value.length >= min) || false
    }

    public parseParams (params: Array<string>): ValidatorMinParams {
        const [_min]: Array<string> = params
        const min: number = parseInt(_min, 10)

        if (!_min || isNaN(min)) {
            throw new RuleValidatorError(this.name)
        }
        return [min]
    }

    public getErrorParams (min: number): ErrorParams {
        return { min : String(min) }
    }

}

Rules.registered[RuleMin.ruleName] = new RuleMin()
