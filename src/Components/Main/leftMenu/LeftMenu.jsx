import React from 'react';
import style from './leftMenu.module.css'
import {useLoaderData} from "react-router-dom";

const LeftMenu = () => {
    const {eventResponse} = useLoaderData()
    console.log(eventResponse)
    const name = eventResponse.length !== 0 ? eventResponse[0].eventData.name : 'Нет ближайших событий'
    const startDate = eventResponse.length !== 0 ? eventResponse[0].eventDate.start_date : null
    const endDate = eventResponse.length !== 0 ? eventResponse[0].eventDate.end_date : null
    const startTime = eventResponse.length !== 0 ? new Date(startDate) : null
    const endTime =eventResponse.length !== 0 ? new Date(endDate) : null


    return (
        <div className={style.leftMenu + " " + style.close}>
            <a>{name}</a>
            <hr className={style.line}/>
            {eventResponse.length !== 0 ?  <a className={style.time}>{startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - {endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</a> : null}
        </div>
    );
};

export default LeftMenu;