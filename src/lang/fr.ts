import { ValidationMessages } from "../Messages"

const lang: ValidationMessages = {
  accepted: "Le champs :attribute doit être accepté.",
  alpha: "Le champs :attribute ne peut contenir que des caractères alphabétiques.",
  alpha_dash: "Le champs :attribute ne peut contenir que des caractères alphanumériques, des tirets et underscores.",
  alpha_num: "Le champs :attribute doit être alphanumérique.",
  attributes: {},
  between: "Le champs :attribute doit être compris entre :min and :max.",
  confirmed: "Le champs :attribute ne correspond pas.",
  def: "Le champs :attribute contient un attribut erroné.",
  different: "Le champs :attribute et :different doivent être differents.",
  digits: "Le champs :attribute doit être de :digits chiffres.",
  email: "Le champs :attribute contient un format invalide.",
  in: "Le champs :attribute est invalide.",
  integer: "Le champs :attribute doit être un entier.",
  max: {
    numeric: "Le champs :attribute ne doit être supérieur à :max.",
    string: "Le champs :attribute ne doit être plus de :max characters."
  },
  min: {
    numeric: "Le champs :attribute doit être contenir au moins :min.",
    string: "Le champs :attribute doit être contenir au moins :min caractères."
  },
  not_in: "Le champs :attribute est invalide.",
  numeric: "Le champs :attribute doit être un numéro.",
  regex: "Le format du champs :attribute est invalide.",
  required: "Le champs :attribute est obligatoire.",
  required_if: "Le champs :attribute est obligatoire quand :other est :value.",
  same: "Le champs :attribute et :same doivent correspondre.",
  size: {
    numeric: "La taille du champs :attribute doit être :size.",
    string: "La taille du champs :attribute doit être de :size caractères."
  },
  url: "Le format du champs :attribute est invalide."
}

export default lang
