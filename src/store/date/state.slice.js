import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    mainCalendarView: 'week',
    chosenDate: new Date().getDate(),
    eventFormState: false
}
export const dateSlice = createSlice({
    name: 'state',
    initialState,
    reducers: {
        setCalendarView: (state, {payload}) => {
            if(state.mainCalendarView !== payload) state.mainCalendarView = payload
        },
        setChosenDate: (state, {payload}) => {
            if(state.chosenDate !== payload) state.chosenDate = payload
        },
        setEventFormState: (state) => {
            state.eventFormState = !state.eventFormState
        },
    }
})

export const {actions, reducer} = dateSlice