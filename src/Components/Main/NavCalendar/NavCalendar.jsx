import React, {useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import style from './navCalendar.module.css'
import {actions as dateAction} from '../../../store/date/date.slice'
import {actions as stateAction} from '../../../store/date/state.slice'

const NavCalendar = () => {
    const [openCloseState, setOpenCloseState] = useState('close')

    const {date, currentMonth, currentYear, monthNames, countDayOfMonth, dayOfWeek} = useSelector(state => state.date)
    const {chosenDate} = useSelector(state => state.state)
    const dispatch = useDispatch()
    const days = []
    const dates = []
    const years = []
    const firstDay = new Date(currentYear, currentMonth, 0).getDay()

    for (let i = 1; i <= countDayOfMonth; i++) {
        if(i === date && currentMonth === new Date().getMonth()) dates.push('today')
        else dates.push(i)
        days.push(dayOfWeek[(i+firstDay - 1) % 7])
        if((i+firstDay - 1) % 7 === 6) days.push("|")
    }
    for (let i = 0; i < 9; i++) {
        years.push(currentYear - 4 + i)
    }

    const clickMonth = (month) => {
        console.log(month)
        dispatch(dateAction.setMonth(month))
        changeHandler()
    }
    const clickYear = (year) => {
        console.log(year)
        dispatch(dateAction.setYear(year))
        changeHandler()
    }
    const clickDate = (date) => {
        console.log(date)
        dispatch(dateAction.setDate(date))
        dispatch(stateAction.setChosenDate(date))
    }

    const changeHandler = () => {setOpenCloseState(prevState => prevState === 'open' ? 'close' : 'open')}

    return (
        (openCloseState === 'close' ?
            <div className={style.nav_calendar}>
                <div className={style.month_year} onClick={changeHandler}>
                    <h2 className={style.month}>{monthNames[currentMonth]}</h2>
                    <h2 className={style.year}>{currentYear}</h2>
                </div>
                <div className={style.days}>
                    {days.map((day, i) => (
                            <a className={day === '|' ? style.separator : style.day} key={i}>{day}</a>
                    ))}
                </div>
                <div className={style.dates}>
                    {dates.map((date, i) => (date === 'today' ?
                            <a className={style.today + " " + style.date} key={i+1} onClick={() => clickDate(i+1)}>{(i+1)}</a>
                            :
                            <a className={style.date} key={date} onClick={() => clickDate(date)}>{date}</a>
                    ))}
                </div>
            </div>
            :
            <div className={style.nav_calendar}>
                <div className={style.years}>
                    {years.map((year, i) => (
                            <a className={ year === currentYear ? style.currentYear : style.anotherYear } onClick={() => clickYear(year)} key={i}>{year}</a>
                    ))}
                </div>
                <div className={style.months}>
                    {monthNames.map((month, i) => (
                            <a className={month !== monthNames[currentMonth] ? style.anotherMonth : style.currentMonth} onClick={() => clickMonth(i)} key={i}>{month}</a>
                    ))}
                </div>
            </div>
    )
);

};

export default NavCalendar;