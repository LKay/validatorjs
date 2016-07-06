import { Rule, RuleValidator } from "./Rule"
import { RuleValidatorError, ErrorParams } from "../Errors"

const isAsync: boolean = false
const name: string = "min"
const validator: RuleValidator = (value: any, min: number) => {
    return (typeof value === "number" && value >= min) || (typeof value === "string" && value.length >= min) || false
}

export type ValidatorMinParams = [number]

export class RuleMin extends Rule {

    constructor () {
        super(name, validator, null, isAsync)
    }

    public static make (): RuleMin {
        return new RuleMin()
    }
    
    public parseParams (params: Array<string>): ValidatorMinParams {
        const [_min] = params
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