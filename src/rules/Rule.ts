import { RuleCheck } from "../Rules"

export class Rule {

    public name: string
    public checkFn: RuleCheck
    public message: string
    public async: boolean
    
    constructor (name: string, fn: RuleCheck, message?: string) {
        this.name = name
        this.checkFn = fn
        this.message = message
        this.async = Rule.isAsync(this.checkFn)
    }

    public static isAsync (fn: Function) {
        return fn.arguments.length === 4 || fn.name === "async"
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