import React, {useEffect, useLayoutEffect, useState} from 'react';
import style from './mainCalendar.module.css'
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../../store/date/state.slice.js";
import Day from "./Day.jsx";
import plus from "../../../img/plus.png"
import EventForm from "./EventForm.jsx";
import {useLoaderData} from "react-router-dom";
const MainCalendar = () => {
    const {mainCalendarView, chosenDate} = useSelector(state => state.state)
    const {countDayOfMonth, dayOfWeek, currentMonth, currentYear, day} = useSelector(state => state.date)
    const dispatch = useDispatch()
    const [days, setDays] = useState([])
    const [times, setTimes] = useState([])
    const dayOfWeekChosenDate = new Date(currentYear, currentMonth, chosenDate).getDay() - 1
    const {eventResponse} = useLoaderData()

   const makeTimesArray = (count) => {
        const timesArray = []
        let time = ''
        for (let i = 0; i < 24; i+=count) {
            if(i > 9) time = `${i}:00`
            else time = `0${i}:00`
            timesArray.push(time)
        }
        return timesArray
   }
    const makeNewDaysArray = (length) => {
        const newDays = []
        let event = {}
        if(length > 2) {
            for (let i = 0; i < length; i++) {
                let date = (chosenDate + i - dayOfWeekChosenDate) % (countDayOfMonth + 1)
                if (date < chosenDate && countDayOfMonth < chosenDate + i - dayOfWeekChosenDate) date += 1
                if (date < 1) {
                    if (currentMonth !== 0) date += 33 - new Date(currentYear, currentMonth - 1, 33).getDate()
                    else date += 33 - new Date(currentYear - 1, currentMonth + 11, 33).getDate()
                }
                if(eventResponse.length !== 0) {
                    eventResponse.map((e, i) => {
                        if (new Date(e.eventDate.start_date).getDate() === date) {
                            event = e
                            newDays.push({date: date, day: dayOfWeek[i % 7], event: event})
                        } else newDays.push({date: date, day: dayOfWeek[i % 7], event: {}})
                    })
                } else {
                    newDays.push({date: date, day: dayOfWeek[i % 7], event: {}})
                }
            }
        }
        else {
            for (let i = 0; i < length; i++) {
                let date = (chosenDate + i) % (countDayOfMonth + 1)
                if (date < chosenDate && countDayOfMonth < chosenDate + i) date += 1
                if (date < 1) {
                    if (currentMonth !== 0) date += 33 - new Date(currentYear, currentMonth - 1, 33).getDate()
                    else date += 33 - new Date(currentYear - 1, currentMonth + 11, 33).getDate()
                }
                if(eventResponse.length !== 0) {
                    eventResponse.map((e, i) => {
                        if (new Date(e.eventDate.start_date).getDate() === date) {
                            event = e
                            newDays.push({date: date, day: dayOfWeek[day + i - 1], event: event})
                        } else newDays.push({date: date, day: dayOfWeek[day + i - 1], event: {}})
                    })
                }
                else newDays.push({date: date, day: dayOfWeek[day + i - 1], event: {}})
            }
        }
        return newDays
    }

    const handleSelect = (str) => {
        // console.log(str)
        dispatch(actions.setCalendarView(str))
    }

    const handleAddEventClick = () => {
        dispatch(actions.setEventFormState())
        this.forceUpdate();
    }

    useLayoutEffect(() => {
        switch (mainCalendarView) {
            case 'twoDays':
            {
                setDays(makeNewDaysArray(2))
                setTimes(makeTimesArray(1))
                break
            }
            case 'week':
            {
                setDays(makeNewDaysArray(7))
                setTimes(makeTimesArray(1))
                break
            }
            case 'twoWeek':
            {
                setDays(makeNewDaysArray(14))
                setTimes(makeTimesArray(2))
                break
            }
            case 'month':
            {
                const newDays = []
                const day = new Date(currentYear, currentMonth, 0).getDay()
                for (let i = 0 - day; i < countDayOfMonth; i++) {
                    if(i < 0 ) newDays.push({date: '', day: ''})
                    else newDays.push({date: i+1, day: dayOfWeek[(day + i) % 7]})
                }
                setDays(newDays)
                setTimes([])
                break
            }
        }
    }, [mainCalendarView, chosenDate, dayOfWeek, dayOfWeekChosenDate, countDayOfMonth, currentYear, currentMonth])

    return (
        <div className={style.mainCalendar + ' ' + style.full}>
            <select value={mainCalendarView} onChange={(v) => handleSelect(v.target.value)}>
                <option value="twoDays">Два дня</option>
                <option value="week">Неделя</option>
                <option value="twoWeek">Две недели</option>
                <option value="month">Месяц</option>
            </select>
            <h4>
                Мой календарь
            </h4>
            <a onClick={handleAddEventClick} className={style.addEvent}><img src={plus} alt="Add Event" width='20px' height='20px'/></a>
            <div className={style.timesColumn}>
                {times.map((time, i) => (
                    <a key={i}>{time}</a>
                ))}
                {mainCalendarView === 'twoWeek' ?
                    times.map((time, i) => (
                            <a key={i}>{time}</a>
                        ))
                    : null}
            </div>
            <div className={style.dateColumn}>
                {days.map((day, i) => (
                    <Day {...day} view={mainCalendarView} key={i}/>
                ))}

            </div>
            <EventForm/>
        </div>
    );
};

export default MainCalendar;