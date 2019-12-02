const validations = {
  required: item => {
    return !item.default
  },
  include: item => {
    return !item.include.list.includes(item.default)
  },
  exclude: item => {
    return item.exclude.list.includes(item.default)
  },
  maxLength: item => {
    return item.default && item.default.length > item.maxLength.length
  },
  minLength: item => {
    return !item.default || item.default.length < item.minLength.length
  },
}

export default validations
