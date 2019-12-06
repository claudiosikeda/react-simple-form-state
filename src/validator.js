import rules from './rules'

export const validateState = state => {
  let validationErrors = {}

  Object.keys(state).forEach(key => {
    let item = state[key]

    if (typeof item === 'object') {
      if (item.validate) {
        let errors = validateField(item)

        if (errors.length) {
          validationErrors[key] = errors
        }
      } else {
        validationErrors[key] = validateState(item)
      }
    }
  })

  return validationErrors
}

export const validateField = item => {
  let errors = []

  Object.keys(item.validate).forEach(validation => {
    let rule = rules(validation)
    if (!rule.valid(item)) {
      errors.push(item.validate[validation].message)
    }
  })

  return errors
}
