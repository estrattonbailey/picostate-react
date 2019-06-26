import test from 'ava'
import React from 'react'
import { shallow, mount, render, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import createStore from 'picostate'
import { Provider, connect } from './dist/picostate-react.js'

configure({ adapter: new Adapter() })

const Foo = connect((state, props) => ({
  title: props.alt ? 'world' : state.title
}))(function Comp (props) {
  return <h1>{props.title}</h1>
})

function App (props) {
  const store = createStore({ title: 'hello' })

  return (
    <Provider store={store}>
      <Foo />
      <Foo alt={props.alt} />
    </Provider>
  )
}

test('can access picostate', t => {
  const wrapper = render(<App />)
  t.is(wrapper.text(), 'hellohello')
})
test('computes based on props', t => {
  const wrapper = render(<App alt={true} />)
  t.is(wrapper.text(), 'helloworld')
})
