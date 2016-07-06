import * as objectPath from "object-path"
import { ValidationError, ValidationErrors } from "./Errors"
import { Validator } from "./Validator"
import en from "./lang/en"

export interface ValidationMessages {
    [name: string]: string | ValidationMessages
}

export interface CustomValidationMessages extends ValidationMessages {
    custom?: ValidationMessages
}

export interface LocalisedMessages {
    [lang: string]: ValidationMessages
}

export interface ErrorMessages {
    [field: string]: Array<string>
}

export class Messages {
    
    public static messages: LocalisedMessages = { en }
    
    public customMessages: CustomValidationMessages
    
    constructor (messages?: ValidationMessages) {
        this.customMessages = messages || {}
        this.customMessages.custom = this.customMessages.custom || {}
    }

    getErrorMessages (errors: ValidationErrors, lang: string): ErrorMessages {
        return Object.keys(errors).reduce((messages: ErrorMessages, field: string) => {
            messages[field] = this.getMessages(field, errors[field], lang)
            return messages
        }, {} as ErrorMessages)
    }

    getMessages (field: string, errors: Array<ValidationError>, lang: string) {
        return errors.map((error: ValidationError) => this.getMessage(field, error, lang))
    }

    getMessage (field: string, error: ValidationError, lang: string): string {
        const key: string = `${field}.${error.name}`
        const template = objectPath.get(this.customMessages.custom, key)
                         || objectPath.get(this.customMessages.custom, field)
                         || objectPath.get(this.customMessages, error.name)
                         || objectPath.get(Messages.messages[lang], error.name)
                         || key

        return Object.keys(error.params).reduce(
            (message: string, param: string) => message.replace(`:${param}`, error.params[param]),
            template as string
        ).replace(":attribute", Validator.attributeFormatter(field))
    }
}