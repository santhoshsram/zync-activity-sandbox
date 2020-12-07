import { createStore, combineReducers } from "redux"
import { sandbox } from "./sandboxReducers"
import { activity } from "./activity/activityReducers"

const reducers = {
  sandbox,
  activity
}

const rootReducer = combineReducers(reducers)

export const configureStore = () => createStore(rootReducer)
