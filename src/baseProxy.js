const handler = {
  get: (target, prop) => {
    if (prop === '__GET_TARGET__') {
      return target
    }

    let value = ''
    const model = target[prop]
    if (model !== undefined) {
      value = typeof model === 'object' ? model.default : model
    }

    return value
  },

  set: (target, property, value) => {
    const model = target[property]
    if (typeof model === 'object') {
      value = { ...model, default: value || '' }
    }

    target[property] = value
    return true
  }
}

const baseProxy = state => { return new Proxy(state, handler) }
export default baseProxy

