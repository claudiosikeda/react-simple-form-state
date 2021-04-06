import { useState, useCallback } from 'react'
import _ from 'lodash'
import { validateState, validateField } from './validator'

function useSimpleFormState(config) {
  const [baseModel, setBaseModel] = useState(null)
  const [errors, setErrors] = useState({})
  const proxy = new Proxy({}, {
    get: (target, prop) => {
      if (prop === 'GET_STATE') return baseModel

      const model = _.get(baseModel, prop)
      if (_.isUndefined(model)) {
        _.set(target, prop, '')
        setBaseModel({ ...baseModel, ...target })
        return ''
      }

      return model
    },
    set: (target, prop, value) => {
      _.set(target, prop, value)
      setBaseModel({ ...baseModel, ...target })
      return true
    },
  })

  const set = useCallback((prop, value = '') => {
    if (_.isString(prop)) {
      const model = { ...baseModel }
      _.set(model, prop, value)
      setBaseModel(model)
    }

    if (_.isObject(prop)) {
      setBaseModel(prop)
    }
  }, [])

  const _getErrors = () => errors

  const _validateAll = (state) => {
    const validationErrors = validateState(state)
    setErrors(validationErrors)
  }

  const _validateItem = (name, state) => {
    const item = _.get(state, name)

    if (item && item.validate) {
      const validationErrors = validateField(item)

      if (validationErrors.length) {
        setErrors({ ...errors, [name]: validationErrors })
      } else {
        delete errors[name]
        setErrors({ ...errors })
      }

      return validationErrors
    }

    return []
  }

  const validate = (name = '') => {
    if (!name) {
      return _validateAll(config)
    }

    return _validateItem(name, config)
  }

  return [proxy, set, { state: baseModel, validate, errors: _getErrors }]
}

export default useSimpleFormState
