import React from 'react'
import PropTypes from 'prop-types'

export class Provider extends preact.Component {
  constructor (props) {
    super(props)

    if (!props.store) {
      throw new Error('@picostate/react was not provided with a picostate store!')
    }

    this.store = props.store
    this.state = this.store.state
    this.store.listen(this.setState.bind(this))
  }

  getChildContext () {
    return {
      picostate: this.store
    }
  }

  render () {
    const { children } = this.props
    return children.pop ? children[0] : children
  }
}

Provider.childContextTypes = {
  picostate: PropTypes.object.isRequired
}
