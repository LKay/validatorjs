import { ErrorParams } from "../Errors"

export type RuleValidator = (value: any, ...params: any[]) => boolean | Promise<boolean> | void

export class Rule {

    public name: string
    public fn: RuleValidator
    public message: string
    public isAsync: boolean
    
    constructor (name: string, fn: RuleValidator, message?: string, isAsync: boolean = false) {
        this.name = name
        this.fn = fn
        this.message = message
        this.isAsync = isAsync
    }

    public parseParams (params: Array<string>): Array<any> {
        return params
    }
    
    public getErrorParams (...params: any[]): ErrorParams {
        return {}
    }

    /*
    public validate (value: any, options: any, attribute: string): any {
        return this.checkFn(value, options, attribute)
    }

    public validateAsync (value: any, options: any, attribute: string): Promise<boolean> {
        if (this.async) {
            return new Promise((resolve, reject) => {
                const done: Function = () => resolve()

                if ((this.checkFn as Function).name === "async") {
                    const result = this.checkFn(value, options, attribute)
                    if (["object", "function"].indexOf(typeof result) !== -1 && typeof result.then === "function") {
                        return this.checkFn(value, options, attribute)
                            .then((result: boolean) => resolve(result))
                            .catch((e: any) => {
                                console.error(e)
                                resolve(false)
                            })
                    } else if (typeof result === "boolean") {
                        return resolve(result)
                    } else {
                        console.warn("Result of validator function is not of type boolean.")
                        return resolve(false)
                    }
                }
                return this.checkFn(value, options, attribute, resolve)
            })
        }
        return Promise.resolve(this.validate(value, options, attribute))
    }
    */
    
}