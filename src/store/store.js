import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {reducer as dateReducer} from './date/date.slice'
import {reducer as stateReducer} from './date/state.slice'

const rootReducer = combineReducers({
    date: dateReducer,
    state: stateReducer,
})
export const store = configureStore({
    reducer: rootReducer
})