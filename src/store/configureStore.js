import { createStore, combineReducers, applyMiddleware } from "redux"
import { thunk } from "redux-thunk"

import { formReducers } from "../reducers/formReducers"

const configureStore = () => {
    const store = createStore(combineReducers({
      form:formReducers
    }), applyMiddleware(thunk))

    return store
}

export default configureStore