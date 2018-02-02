import React from 'react'
import PropTypes from 'prop-types'

export function mapStateToProps (map) {
  return function wrapComponentWithState (Component) {
    function Connect (props, { picostate }) {
      return (
        <Comp {...Object.assign({}, props, map(picostate.state), {
          hydrate: picostate.hydrate
        })} />
      )
    }

    Connect.childContextTypes = {
      picostate: PropTypes.object.isRequired
    }

    return Connect
  }
}
