import test from 'ava'
import window from './test.setup.js'
import React from 'react'
import { shallow, mount, render, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import createStore from 'picostate'
import { Picostate, connect } from './dist/picostate-react.js'

configure({ adapter: new Adapter() })

const Simple = connect((state, props) => ({
  title: props.alt ? 'world' : state.title
}))(function Comp (props) {
  return <h1>{props.title}</h1>
})

function sayHello (hydrate, ...rest) {
  hydrate(state => {
    return {
      title: state.title + ' world'
    }
  })()
}

const Actions = connect(state => ({
  title: state.title
}), {
  sayHello
})(function Comp (props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <button className='one' onClick={props.sayHello}>Say Hello</button>
      <button className='two' onClick={e => {
        props.hydrate({ title: 'hydrated' })()
      }}>Hydrate</button>
    </div>
  )
})

function App (props) {
  const store = createStore({ title: 'hello' })

  return (
    <Picostate store={store}>
      {props.children}
    </Picostate>
  )
}

test('can access picostate', t => {
  const wrapper = render(
    <App>
      <Simple />
      <Simple />
    </App>
  )
  t.is(wrapper.text(), 'hellohello')
})
test('computes based on props', t => {
  const wrapper = render(
    <App>
      <Simple />
      <Simple alt={true} />
    </App>
  )
  t.is(wrapper.text(), 'helloworld')
})
test('does not require args', t => {
  const Foo = connect()(props => <div>test</div>)

  const wrapper = render(
    <App>
      <Foo />
    </App>
  )

  t.is(wrapper.text(), 'test')
})
test('actions work', t => {
  const wrapper = mount((
    <App>
      <Actions />
    </App>
  ), {
    attachTo: window.document.body.children[0]
  })

  wrapper.find('.one').simulate('click')
  t.is(wrapper.find('h1').text(), 'hello world')

  wrapper.unmount()
})
test('hydrate works directly', t => {
  const wrapper = mount((
    <App>
      <Actions />
    </App>
  ), {
    attachTo: window.document.body.children[0]
  })

  wrapper.find('.two').simulate('click')
  t.is(wrapper.find('h1').text(), 'hydrated')
})
