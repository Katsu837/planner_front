import React from 'react';
import style from './main.module.css'
import NavCalendar from "./NavCalendar/NavCalendar.jsx";
import MainCalendar from "./MainCalendar/MainCalendar.jsx";
import LeftMenu from "./leftMenu/LeftMenu.jsx";
import RightMenu from "./rightMenu/RightMenu.jsx";
import {useLoaderData} from "react-router-dom";


const MainPage = () => {
    const data = useLoaderData()
    const {firstName, secondName, photo} = data.profileResponse
    // console.log(data.profileResponse)
    // console.log(data.eventResponse)
    return (
        <div className={style.main}>
            <LeftMenu/>
            <NavCalendar/>
            <RightMenu firstName={firstName} secondName={secondName} photo={'../../../img/' + photo}/>
            <MainCalendar/>
        </div>
    );
};

export default MainPage;