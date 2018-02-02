import React from 'react'
import PropTypes from 'prop-types'

export function mapStateToProps (map) {
  return function wrapComponentWithState (Component) {
    function Connect (props, { picostate }) {
      return (
        <Component {...Object.assign(
          {},
          props,
          map(picostate.state),
          { hydrate: picostate.hydrate }
        )} />
      )
    }

    Connect.contextTypes = {
      picostate: PropTypes.object.isRequired
    }

    return Connect
  }
}
