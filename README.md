# @picostate/react
[picostate](https://github.com/estrattonbailey/picostate) adapter for React.
**500 bytes gzipped.**

### Features
- familiar API
- fully thunk-able
- all the benefits of
  [picostate](https://github.com/estrattonbailey/picostate#features)

```javascript
import React from 'react'
import { render } from 'react-dom'
import createStore from 'picostate'
import { Picostate, connect } from '@picostate/react'

const store = createStore({ count: 0 })

const Counter = connect(
  state => ({ count: state.count }),
  {
    increment (hydrate) {
      hydrate(state => ({ count: state.count + 1 }))()
    }
  }
)(props => (
  <div>
    <h1>The count is {props.count}</h1>
    <button onClick={props.increment}>Increment</button>
  </div>
))

render((
  <Picostate store={store}>
    <Counter />
  </Picostate>
), document.getElementById('root'))
```

### Install
```
npm i @picostate/react --save
```

## license
MIT License © [Eric Bailey](https://estrattonbailey.com)
