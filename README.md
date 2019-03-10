# @picostate/react
600 byte state management for React using [picostate](https://github.com/estrattonbailey/picostate).

## Install
```
npm i @picostate/react --save
```

## Usage
```javascript
import createStore from 'picostate'
import { Provider, connect, createAction } from '@picostate/react'

const store = createStore({
  count: 0
})

const renewLogin = createAction((store, actions) => {
  return id => {
    return renewAccessToken(id).then(token => {
      store.hydrate({ token })
      return token
    })
  }
})

const getUserAccount = createAction((store, actions) => {
  return id => {
    return actions.renewLogin(id)
      .then(token => {
        return getUserData(token).then(account => {
          store.hydrate({ account })
          return account
        })
      })
  }
})

const actions = {
  renewLogin,
  getUserAccount
}

const Counter = connect(
  (state, props) => ({
    count: state.count
  }),
  (actions, props) => ({
    getUserAccount: actions.getUserAccount
  })
)(props => (
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
  <Provider store={store} actions={actions}>
    <Counter />
  </Provider>
), document.body)
```

MIT
