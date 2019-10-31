import { applyMiddleware, createStore, combineReducers } from "redux"
import { entitiesReducer, queriesReducer, queryMiddleware } from "redux-query"

export const getQueries = state => state.queries
export const getEntities = state => state.entities

const reducer = combineReducers({
  entities: entitiesReducer,
  queries: queriesReducer
})

// this is hacky and will only work when everything goes perfectly
// but, you know, fuck it
const networkInterface = (url, method, networkOptions) => {
  const { body } = networkOptions

  return {
    execute: async cb => {
      const response = await fetch(url, {
        method,
        body: JSON.stringify(body)
      })
      const { result } = await response.json()
      cb(undefined, response.status, result)
    }
  }
}

const store = createStore(
  reducer,
  applyMiddleware(queryMiddleware(networkInterface, getQueries, getEntities))
)

export default store
