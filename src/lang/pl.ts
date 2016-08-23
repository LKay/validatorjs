import { ValidationMessages } from "../Messages"

const lang: ValidationMessages = {
    accepted: "Pole :attribute musi być zaakceptowane.",
    alpha: "Pole :attribute może zawierać tylko litery.",
    alpha_dash: "Pole :attribute moze zawierać tylko litery, myślnik i podrkeślenie.",
    alpha_num: "Pole :attribute moze zawierac tylko znaki alfanumeryczne.",
    attributes: {},
    between: "Pole :attribute musi mieć długość od :min do :max.",
    confirmed: "Pole :attribute nie spełnia warunku potwierdzenia.",
    def: "Pole :attribute zawiera błędy.",
    different: "Pola :attribute i :different muszą się różnić.",
    digits: "Pole :attribute może zawierać tylko cyfry ze zbioru :digits.",
    email: "Pole :attribute ma niepoprawny format adresu email.",
    in: "Pole :attribute musi należeć do zbioru :in.",
    integer: "Pole :attribute musi być liczbą całkowitą.",
    max: {
        numeric: "Pole :attribute nie moze być większe :max.",
        string: "Pole :attribute nie moze być dłuższe niż :max znaków."
    },
    min: {
        numeric: "Pole :attribute musi być równe conajmniej :min.",
        string: "Pole :attribute musi zawierać conajmniej :min znaków."
    },
    not_in: "Pole :attribute nie może należeć do zbioru :not_in.",
    numeric: "Pole :attribute musi być liczbą.",
    regex: "Pole :attribute nie spełnia warunku.",
    required: "Pole :attribute jest wymagane.",
    required_if: "Pole :attribute jest wymagane jeśli pole :other jest równe :value.",
    same: "Pola :attribute i :same muszą być takie same.",
    size: {
        numeric: "Pole :attribute musi być równe :size.",
        string: "Pole :attribute musi zawierać :size znaków."
    },
    string: "Pole :attribute musi być ciągiem znaków.",
    url: "Pole :attribute musi być poprawnym adresem URL."
}

export default lang
