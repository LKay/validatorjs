import { Validator } from "../src/Validator"

const fields = {
    name : "abc"
}

const rules = {
    name : "required|min:3",
    test : "async",
    foo: {
        bar : "required"
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

console.warn(validator.passes(), validator.fails())