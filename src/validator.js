import validations from './validations'

export const validateState = state => {
  let validationErrors = {}

  Object.keys(state).forEach(key => {
    let item = state[key]

    if (typeof item === 'object') {
      let errors = validateField(item)
      if (errors.length) {
        validationErrors[key] = errors
      }
    }
  })

  return validationErrors
}

export const validateField = item => {
  let errors = []

  Object.keys(item).forEach(key => {
    let validation = item[key]
    let rule = validations[key]

    if (typeof validation !== 'default' && rule) {
      if (rule(item)) {
        errors.push(item[key].message)
      }
    }
  })

  return errors
}
