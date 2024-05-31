import React, {useEffect, useState} from 'react';
import mark from '../../../img/mark.png'
import style from './day.module.css'
import {useSelector} from "react-redux";
import Event from "./Event.jsx";

const Day = ({date, day, event, view}) => {
    const [marks, setMarks] = useState([])

    useEffect(() => {
        if (view === 'twoWeek') {
            const array = []
            for (let i = 0; i < 12; i++) {
                array.push(i)
            }
            setMarks(array)
        }
        else if(view !== 'month') {
            const array = []
            for (let i = 0; i < 24; i++) {
                array.push(i)
            }
            setMarks(array)
        }
        else setMarks([])
    }, [view])

    // console.log(event)



    return (
        <div
            className={day !== '' ? style.day + " " + style.trueDay + " " + style[view] : style.day + " " + style[view]}

        >
            <div className={style.firstLine}>
                <a>{date}</a>
                <a>{day}</a>
            </div>
            <div className={style.marks}>
                {marks.map((i) => (
                        <div key={i} className={style.hrContainer}>
                            {Object.keys(event).length !== 0 && i === new Date(event.eventDate.start_date).getHours() ?
                                <Event {...event} key={i}/>
                                :
                                null}
                            <hr/>
                        </div>
                    ))}
            </div>
            {/*// {Object.keys(event).length !== 0 ?*/}
            {/*//     <Event {...event}/>*/}
            {/*//     :*/}
            {/*//     null*/}
            {/*// }*/}

        </div>
    );
};

export default Day;