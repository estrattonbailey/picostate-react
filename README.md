# @picostate/react

[picostate](https://github.com/estrattonbailey/picostate) adapter for React.
**750 bytes gzipped.**

### Features

- familiar Redux-like API
- no boilerplate
- hooks!
- all the benefits of
  [picostate](https://github.com/estrattonbailey/picostate#features)

### Install

```
npm i @picostate/react --save
```

# Usage

```javascript
import React from "react";
import { render } from "react-dom";
import createStore from "picostate";
import { Picostate, connect } from "@picostate/react";

const store = createStore({ count: 0 });

function increment(hydrate) {
  hydrate(state => ({ count: state.count + 1 }))();
}

function decrement(hydrate) {
  hydrate(state => ({ count: state.count - 1 }))();
}

const Counter = connect(
  state => ({ count: state.count }),
  { increment, decrement }
)(props => {
  return (
    <div>
      <h1>The count is {props.count}</h1>
      <button onClick={props.increment}>+</button>
      <button onClick={props.decrement}>-</button>
    </div>
  );
});

function CounterHook(props) {
  const [state, actions] = usePicostate({ increment, decrement });

  return (
    <div>
      <h1>The count is {state.count}</h1>
      <button onClick={actions.increment}>+</button>
      <button onClick={actions.decrement}>-</button>
    </div>
  );
}

render(
  <Picostate store={store}>
    <Counter />
    <CounterHook />
  </Picostate>,
  document.getElementById("root")
);
```

## License

MIT License © [Eric Bailey](https://estrattonbailey.com)
