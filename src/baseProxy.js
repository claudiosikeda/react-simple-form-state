import _ from 'lodash'

const handler = {
  get: (target, prop) => {
    if (prop === '__GET_TARGET__') {
      return target
    }

    let value = ''
    const model = _.get(target, prop)
    if (!_.isUndefined(model)) {
      value = _.isObject(model) ? model.default : model
    }

    return value
  },

  set: (target, property, value) => {
    const model = _.get(target, property)
    if (_.isObject(model)) {
      value = { ...model, default: value || '' }
    }

    target[property] = value
    return true
  }
}

const baseProxy = state => {
  return new Proxy(state || {}, handler)
}
export default baseProxy
