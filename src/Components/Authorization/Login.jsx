import React from 'react';
import style from "./authorization.module.css"
import {Field, Form, Formik} from "formik";
import {authFetch} from "../../API/Fetchers.js";
import {redirect, useNavigate} from "react-router-dom";
import Input from "./Input.jsx";
import * as Yup from 'yup';

const Login = () => {

    const navigate = useNavigate()
    const handleSubmit = async (values) => {
        try {
            console.log(values)
            const response = await authFetch('http://localhost:5100/authorization/login', values)
            localStorage.setItem('token', response.accessToken)
            localStorage.setItem('id', response.id)
            localStorage.setItem('scheduleId', response.scheduleId)
            return navigate("/main");

        } catch (e) {
            console.error(e)
        }
    }

    const navToLogin = () => {
        navigate('/authorization/registration')
    }

    return (
        <div className={style.login}>
            <h1>L O  G  I  N</h1>
            <div>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationShema={
                    Yup.object().shape({
                        email: Yup.string().required('Login is required'),
                        password: Yup.string().trim().required('Password is required'),
                    })}
                    onSubmit={async (values) => await handleSubmit(values)}
                >
                    <Form className={style.forma}>
                        <Field component={Input} label='Email' type='text' name='email'></Field>
                        <Field component={Input} label='Password' type='password' name='password'></Field>
                        <button type='submit' className='style.submitButton'>Sign in</button>
                        <a onClick={navToLogin} className={style.to}>Registration</a>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default Login;