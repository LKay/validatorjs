import { ValidationMessages } from "../Messages"

const lang: ValidationMessages = {
  accepted: "The :attribute must be accepted.",
  alpha: "The :attribute field must contain only alphabetic characters.",
  alpha_dash: "The :attribute field may only contain alpha-numeric characters, as well as dashes and underscores.",
  alpha_num: "The :attribute field must be alphanumeric.",
  attributes: {},
  between: "The :attribute field must be between :min and :max.",
  confirmed: "The :attribute confirmation does not match.",
  def: "The :attribute attribute has errors.",
  different: "The :attribute and :different must be different.",
  digits: "The :attribute must be :digits digits.",
  email: "The :attribute format is invalid.",
  in: "The selected :attribute is invalid.",
  integer: "The :attribute must be an integer.",
  max: {
    numeric: "The :attribute may not be greater than :max.",
    string: "The :attribute may not be greater than :max characters."
  },
  min: {
    numeric: "The :attribute must be at least :min.",
    string: "The :attribute must be at least :min characters."
  },
  not_in: "The selected :attribute is invalid.",
  numeric: "The :attribute must be a number.",
  regex: "The :attribute format is invalid",
  required: "The :attribute field is required.",
  required_if: "The :attribute field is required when :other is :value.",
  same: "The :attribute and :same fields must match.",
  size: {
    numeric: "The :attribute must be :size.",
    string: "The :attribute must be :size characters."
  },
  string: "The :attribute must be a string.",
  url: "The :attribute format is invalid."
}

export default lang
