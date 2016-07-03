export interface ErrorMessages {
    [field: string]: Array<string>
}

export class Errors {

    public errors: ErrorMessages = {} as ErrorMessages

    public add (attribute: string, message: string): void {
        if (!this.has(attribute)) {
            this.errors[attribute] = []
        }

        if (this.errors[attribute].indexOf(message) === -1) {
            this.errors[attribute].push(message)
        }
    }

    public get (attribute: string): Array<string> {
        return this.errors[attribute] || []
    }

    public first (attribute: string): string | boolean {
        if (this.has(attribute)) {
            return this.errors[attribute][0]
        }
        return false
    }

    public all (): ErrorMessages {
        return this.errors
    }

    public has (attribute: string): boolean {
        return this.errors.hasOwnProperty(attribute)
    }

}