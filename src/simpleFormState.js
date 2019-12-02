import React, { useState } from 'react'
import baseProxy from './baseProxy'
import { validateState, validateField } from './validator'

export function useSimpleFormState (state) {
  let baseModel = baseProxy(state)

  const getStateValues = (state) => {
    let stateValues = {}

    Object.entries(state).forEach((item) => {
      let [key, value] = item
      stateValues[key] = typeof value === 'object' ? value.default : value
    })

    return stateValues
  }

  const getState = () => {
    return { state: data, errors: errors }
  }

  const setState = (name, value) => {
    baseModel[name] = value
    setData(getStateValues(baseModel.__GET_TARGET__))
  }

  const validate = (name = '') => {
    const target = baseModel.__GET_TARGET__

    if (!name) {
      return validateAll(target)
    }

    return validateItem(name, target)
  }

  const validateAll = state => {
    let validationErrors = validateState(state)

    setErrors(validationErrors)
  }

  const validateItem = (name, state) => {
    const item = state[name]

    if (item) {
      return validateField(item)
    }

    return []
  }

  const [data, setData] = useState(getStateValues(state))
  const [errors, setErrors] = useState({})
  return [baseModel, setState, getState, validate]
}

