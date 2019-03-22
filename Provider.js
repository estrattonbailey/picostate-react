import React from 'react'
import { Provider as ContextProvider } from './Context.js'

export class Provider extends React.Component {
  constructor (props) {
    super(props)

    if (!props.store) {
      throw new Error('@picostate/react was not provided with a picostate store')
    }

    this.store = props.store
    this.state = this.store.state
    this.store.listen(this.setState.bind(this))
  }

  render () {
    const { children } = this.props

    return (
      <ContextProvider value={{ picostate: this.store }}>
        {children.pop ? children[0] : children}
      </ContextProvider>
    )
  }
}
