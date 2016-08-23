import { ErrorParams } from "../Errors"

export type AsyncResult = boolean | boolean[] | [boolean, string]
export type RuleValidator = (value: any, ...params: any[]) => boolean | Promise<AsyncResult> | void

const ASYNC_TIMEOUT: number = 5000

export class Rule {

    public name: string
    public fn: RuleValidator
    public message: string
    public isAsync: boolean = false
    public timeout: number = ASYNC_TIMEOUT

    constructor (name?: string, fn?: RuleValidator, message?: string, isAsync?: boolean, timeout?: number) {
        this.name = name || this.name
        this.fn = fn || this.fn
        this.message = message || this.message
        this.isAsync = isAsync || this.isAsync
        this.timeout = timeout || this.timeout
    }

    public parseParams (params: Array<string>): Array<any> {
        return params
    }

    public getErrorParams (...params: any[]): ErrorParams {
        return {}
    }

}
