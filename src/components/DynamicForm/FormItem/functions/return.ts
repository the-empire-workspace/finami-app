import Validation from './validation'

const setValidData = (element: any, data: any, name: any, value: any) => {
  let validation = true
  if (element.name === name) {
    validation = validation && Validation(element.validations, value, data)
    data[name] = {value, validation}
    return data
  }
  if (element.defaultValue === data[element.name]?.value) {
    if (element.defaultValue === undefined) element.defaultValue = ''
    let validate =
      validation && Validation(element.validations, element.defaultValue, data)
    data[element.name] = {value: element.defaultValue, validation: validate}
    return data
  }
  return data
}

const returnForm = (
  value: any,
  form: any,
  name: any,
  data: any,
  setData: any,
  setValidate: any,
) => {
  let changed

  for (let element of form) {
    if (element.element === 'multiple') {
      for (let item of element.element_array)
        changed = setValidData(item, data, name, value)
      continue
    }
    changed = setValidData(element, data, name, value)
  }

  setData(changed)
  setValidate(data[name].validation)

  const reduceValid = (prev: any, current: any) => prev && current[1].validation

  let validation =
    Object.keys(data)?.length < 2
      ? data[name].validation
      : Object.entries(data).reduce(reduceValid, true)

  return {value: data, validation}
}

export default returnForm
