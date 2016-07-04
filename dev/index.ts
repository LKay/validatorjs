import { Validator } from "../src/Validator"

const fields = {
    name : ""
}

const rules = {
    name : "required|min:3",
    foo: {
        bar : "string"
    }
}

const messages = {
    "name.required": "REQUIRED CUSTOM",
    name : {
        min : "MIN CUSTOM"
    }
}

console.warn(Validator)

const validator = new Validator(fields, rules, messages)

console.warn(validator)