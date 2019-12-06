import { useState } from 'react'
import baseProxy from './baseProxy'
import { validateState, validateField } from './validator'
import dot from 'dot-object'
import _ from 'lodash'

export function useSimpleFormState (config) {

  const setState = (prop, value = '') => {
    if (typeof prop === 'string') {
      baseModel[prop] = value
    }

    if (typeof prop === 'object') {
      Object.entries(prop).forEach((item) => {
        let [key, value] = item
        baseModel[key] = value
      })
    }

    setData(_getStateValues(baseModel.__GET_TARGET__))
  }

  const validate = (name = '') => {
    if (!name) {
      return _validateAll(config)
    }

    return _validateItem(name, config)
  }

  const _getState = () => {
    return dot.object({ ...data })
  }

  const _getErrors = () => {
    return errors
  }

  const _getStateValues = (state) => {
    let stateValues = {}

    Object.entries(state).forEach((item) => {
      let [key, value] = item
      if (typeof value === 'object' && [null, undefined].includes(value.default)) {
        value = _getStateValues(value)
      } else {
        value = typeof value === 'object' ? value.default : value
      }

      stateValues[key] = value
    })

    return dot.dot(stateValues)
  }

  const _validateAll = state => {
    let validationErrors = validateState(state)
    setErrors(validationErrors)
  }

  const _validateItem = (name, state) => {
    const item = _.get(state, name)

    if (item && item.validate) {
      let validationErrors = validateField(item)

      if (validationErrors.length) {
        setErrors({...errors, [name]: validationErrors})
      } else {
        delete errors[name]
        setErrors({...errors})
      }

      return validationErrors
    }

    return []
  }

  const baseModel = baseProxy(config)
  const [data, setData] = useState(_getStateValues(config))
  const [errors, setErrors] = useState({})
  return [baseModel, { setState, validate, state: _getState, errors: _getErrors }]
}

