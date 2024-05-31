import React from 'react';
import {Outlet, useNavigate} from "react-router-dom";

const Layout = () => {
    const navigate = useNavigate()
    if(localStorage.getItem('token')) navigate('/main')
    else navigate('/authorization/registration')
    return (
        <Outlet/>
    )
}

export default Layout;