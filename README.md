# @picostate/react
600 byte state management for React using [picostate](https://github.com/estrattonbailey/picostate).

> v2 brings support for React 16's context API

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

const Counter = connect((state, props) => ({
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

## license
MIT License © [Eric Bailey](https://estrattonbailey.com)
