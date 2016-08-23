import { ValidationMessages } from "../Messages"

const lang: ValidationMessages = {
  accepted: "Вы должны принять :attribute.",
  alpha: "Поле :attribute может содержать только буквы.",
  alpha_dash: "Поле :attribute может содержать только буквы, цифры, дефисы и символы подчёркивания.",
  alpha_num: "Поле :attribute может содержать только буквы и цифры.",
  attributes: {},
  between: "Поле :attribute должно быть между :min и :max.",
  confirmed: "Поле :attribute не совпадает с подтверждением.",
  def: "Поле :attribute содержит ошибки.",
  different: "Поля :attribute и :different должны различаться.",
  digits: "Длина цифрового поля :attribute должна быть :digits.",
  email: "Поле :attribute должно быть действительным электронным адресом.",
  in: "Выбранное значение для :attribute ошибочно.",
  integer: "Поле :attribute должно быть целым числом.",
  max: {
    numeric: "Значение поля :attribute должно быть меньше или равно :max.",
    string: "Количество символов в поле :attribute не может превышать :max."
  },
  min: {
    numeric: "Значение поля :attribute должно быть больше или равно :min.",
    string: "Количество символов в поле :attribute должно быть не менее :min."
  },
  not_in: "Выбранное значение для :attribute ошибочно.",
  numeric: "Поле :attribute должно быть числом.",
  regex: "Неверный формат поля :attribute.",
  required: "Поле :attribute обязательно для заполнения.",
  required_if: "Поле :attribute требуется когда значения поля :other равно :value.",
  same: "Значение :attribute должно совпадать с :same.",
  size: {
    numeric: "Значение поля :attribute должно быть равным :size.",
    string: "Количество символов в поле :attribute должно быть равно :size."
  },
  url: "Поле :attribute должно содержать валидный URL."
}

export default lang