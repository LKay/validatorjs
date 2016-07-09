import { ErrorParams } from "../Errors"

export type AsyncResult = boolean | boolean[] | [boolean, string]
export type RuleValidator = (value: any, ...params: any[]) => boolean | Promise<AsyncResult> | void

const ASYNC_TIMEOUT: number = 5000

export class Rule {

    public name: string
    public fn: RuleValidator
    public message: string
    public isAsync: boolean
    public timeout: number

    constructor (name: string, fn: RuleValidator, message?: string, isAsync: boolean = false, timeout: number = ASYNC_TIMEOUT) {
        this.name = name
        this.fn = fn
        this.message = message
        this.isAsync = isAsync
        this.timeout = timeout
    }

    public parseParams (params: Array<string>): Array<any> {
        return params
    }

    public getErrorParams (...params: any[]): ErrorParams {
        return {}
    }

}
