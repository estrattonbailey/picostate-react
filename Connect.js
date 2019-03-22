import React from 'react'
import { Consumer } from './Context.js'

export function mapStateToProps (map) {
  return function wrapComponentWithState (Component) {
    return props => (
      <Consumer>
        {({ picostate }) => (
          <Component {...Object.assign(
            {},
            props,
            map(picostate.state, props),
            { hydrate: picostate.hydrate }
          )} />
        )}
      </Consumer>
    )
  }
}
