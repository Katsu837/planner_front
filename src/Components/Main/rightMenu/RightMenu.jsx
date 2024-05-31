import React from 'react';
import style from './rightMenu.module.css'
import photoDefault from '../../../img/default.png'
import {useNavigate} from "react-router-dom";


const RightMenu = ({firstName, secondName, photo}) => {

    // console.log(firstName, secondName, photo)
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.clear()
        navigate('/authorization/login')
    }

    return (

        <div className={style.rightMenu + " " + style.close}>
            <a>{firstName}</a>
            <a>{secondName}</a>
            <img src={photoDefault} alt='Photo' width='70px' height='70px'/>
            <button onClick={handleLogout} className={style.logout}>Logout</button>
        </div>
    );
};

export default RightMenu;