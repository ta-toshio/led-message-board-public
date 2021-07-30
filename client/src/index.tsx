import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import { ThemeProvider, CSSReset } from "@chakra-ui/core"
import ReactGA from 'react-ga'
import reducer from './reducers'
import App from './App'
import * as serviceWorker from './serviceWorker'

const middleware = []

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
} else {
  ReactGA.initialize('UA-xxx-1')
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

ReactDOM.render(
  <ThemeProvider>
    <CSSReset />
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
  ,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
