import React, { useState, useContext } from 'react'
import { Context } from './Context.js'

export function usePicostate (mapStateToProps, actions) {
  if (typeof mapStateToProps === 'object') {
    actions = mapStateToProps
    mapStateToProps = undefined
  }

  const { store } = useContext(Context)

  const wrappedActions = Object.keys(actions || {}).reduce((obj, key) => {
    obj[key] = (...args) => actions[key](store.hydrate.bind(store), ...args)
    return obj
  }, {})

  return [
    mapStateToProps ? mapStateToProps(store.state) : store.state,
    wrappedActions
  ]
}
