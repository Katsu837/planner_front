import {createSlice} from "@reduxjs/toolkit";

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const initialState = {
    date: new Date().getDate(),
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
    day: new Date().getDay(),
    countDayOfMonth: 33 - new Date(new Date().getFullYear(), new Date().getMonth(), 33).getDate(),
    monthNames: monthNames,
    dayOfWeek: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'St', 'Su']
}
export const dateSlice = createSlice({
    name: 'date',
    initialState,
    reducers: {
        setMonth: (state, {payload}) => {
            if (payload !== state.currentMonth) {
                state.currentMonth = payload
                state.countDayOfMonth = 33 - new Date(state.currentYear, payload, 33).getDate()
            }
        },
        setYear: (state, {payload}) => {
            if(payload !== state.currentYear) state.currentYear = payload
        },
        setDate: (state, {payload}) => {
            if(payload !== state.date) state.date = payload
        }

    }
})

export const {actions, reducer} = dateSlice