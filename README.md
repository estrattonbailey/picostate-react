# @picostate/react
400 byte state management for React.

## Install
```
npm i @picostate/react --save
```

## Usage
```javascript
import createStore from 'picostate'
import { Provider, connect } from '@picostate/react'

const store = createStore({
  count: 0
})

const Counter = connect(state => ({
  count: state.count
}))(props => (
  <div>
    <h1>The count is {props.count}</h1>

    <button onClick={e => {
      props.hydrate(state => ({
        count: state.count + 1
      }))()
    }}>Increment</button>
  </div>
))

render((
  <Provider store={store}>
    <Counter />
  </Provider>
), document.body)
```

MIT
