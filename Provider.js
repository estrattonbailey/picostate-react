import React from 'react'
import { Provider as ContextProvider } from './Context.js'

export class Picostate extends React.Component {
  constructor (props) {
    super(props)

    if (!props.store) {
      throw new Error('@picostate/react was not provided with a picostate store')
    }

    props.store.listen(this.setState.bind(this))
  }

  render () {
    const { store, children } = this.props

    return (
      <ContextProvider value={{ store }}>
        {children}
      </ContextProvider>
    )
  }
}
