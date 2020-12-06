import { createStore, combineReducers } from "redux"
import { sandbox } from "./sandboxReducers"

const reducers = {
  sandbox
}

const rootReducer = combineReducers(reducers)

export const configureStore = () => createStore(rootReducer)
