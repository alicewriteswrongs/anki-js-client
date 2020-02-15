import React from "react"
import "./App.css"
import { Provider } from "react-redux"
import { Provider as ReduxQueryProvider } from "redux-query-react"

import HomePage from "./HomePage"

import store from "./store"

export const getQueries = state => state.queries

function App() {
  return (
    <Provider store={store}>
      <ReduxQueryProvider queriesSelector={getQueries}>
        <HomePage />
      </ReduxQueryProvider>
    </Provider>
  )
}

export default App
