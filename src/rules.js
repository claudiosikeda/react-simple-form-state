const rules = ruleName => {
  return {
    valid: item => {
      const validation = validations[ruleName]
      if (validation) {
        return !validation(item)
      }
    }
  }
}

/**
 * rules should return true if invalid.
 */
const validations = {
  required: item => {
    return !item.default
  },
  include: item => {
    return !item.validate.include.list.includes(item.default)
  },
  exclude: item => {
    return item.validate.exclude.list.includes(item.default)
  },
  maxLength: item => {
    return item.default && item.default.length > item.validate.maxLength.length
  },
  minLength: item => {
    return !item.default || item.default.length < item.validate.minLength.length
  },
}

export default rules
