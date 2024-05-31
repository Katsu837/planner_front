import React, {useState} from 'react';
import style from './event.module.css'
import garbage from '../../../img/free-icon-delete-1214428.png'

const Event = ({eventData, eventDate}) => {

    const startTime = new Date(eventDate.start_date)
    const endTime = new Date(eventDate.end_date)
    const variableValue = endTime.getHours() - startTime.getHours()
    console.log(variableValue, typeof endTime)

    const eventStyle = {
        width: `12%`,
        height: `${32 * variableValue}px`,
    };

    const deleteEvent = async () => {
        await fetch(`http://localhost:5100/event/deleteEvent/${eventData.id}`, {
            method: "DELETE",})
        console.log('YES')
    }

    return (
        <div className={style.event} style={eventStyle}>
            <a>{eventData.name}</a>
            <a className={style.time}>{startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - {endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</a>
            <a onClick={deleteEvent} className={style.garbage}><img src={garbage} alt='delete' width='20px' height='20px'/></a>
        </div>
    );
};

export default Event;