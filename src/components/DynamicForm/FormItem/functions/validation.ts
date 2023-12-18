const Validation = (validations: any, value: any, formData: any) => {
  var validates = true
  for (var val in validations)
    switch (val) {
      case 'regex':
        if (validations[val]?.test(value)) {
          validates = validates && true
          break
        }

        validates = validates && false
        break
      case 'minLength':
        if (validations[val] <= String(value)?.length) {
          validates = validates && true
          break
        }
        validates = validates && false
        break
      case 'maxLength':
        if (validations[val] >= String(value)?.length) {
          validates = validates && true
          break
        }
        validates = validates && false

        break
      case 'required':
        if (validations[val]) {
          if (value !== undefined && value !== null)
            if (value?.length !== 0) {
              validates = validates && true
              break
            }
          validates = validates && false
        }
        break
      case 'equal':
        if (value === formData[validations[val]]) {
          validates = validates && true
          break
        }
        validates = validates && false
        break
      case 'number':
        if (typeof value === 'number') {
          validates = validates && true
          break
        }
        validates = validates && false
        break
      default:
        break
    }

  if (!('required' in validations)) if (!value) validates = true

  return validates
}

export default Validation
