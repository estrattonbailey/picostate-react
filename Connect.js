import React from 'react'
import { Consumer } from './Context.js'

export function mapStateToProps (map) {
  return function wrapComponentWithState (Component) {
    return props => (
      <Consumer>
        {({ store }) => (
          <Component {...Object.assign(
            {},
            props,
            map(store.state, props),
            { hydrate: store.hydrate }
          )} />
        )}
      </Consumer>
    )
  }
}
