import React from 'react'
import { Consumer } from './Context.js'

export function mapStateToProps (mapStateToProps, actions) {
  return function wrapComponentWithState (Component) {
    return props => (
      <Consumer>
        {({ store }) => {
          const wrappedActions = Object.keys(actions || {}).reduce((obj, key) => {
            obj[key] = (...args) => actions[key](store.hydrate.bind(store), ...args)
            return obj
          }, {})

          return (
            <Component {...Object.assign(
              {},
              props,
              mapStateToProps ? mapStateToProps(store.state, props) : {},
              wrappedActions,
              { hydrate: store.hydrate.bind(store) }
            )} />
          )
        }}
      </Consumer>
    )
  }
}
