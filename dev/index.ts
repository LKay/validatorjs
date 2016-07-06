import Validator from "../src/index"

const fields = {
    name : "abc"
}

const rules = {
    name : "required|min:3",
    test : "async",
    foo: {
        bar : "bail|required|min:3"
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

console.warn(validator.passes())
console.warn(validator.errors.all())
console.warn(validator.errors.get("foo.bar"))
console.warn(validator.errors.first("foo.bar", "es"))