import React, {useLayoutEffect} from 'react';
import style from './authorization.module.css'
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import Input from "./Input.jsx";
import {authFetch} from "../../API/Fetchers.js";
import {useNavigate} from "react-router-dom";
import * as dotenv from "dotenv";
dotenv.config();

const Registration = () => {
    let navigate = useNavigate();

    useLayoutEffect(() => {
        if(localStorage.getItem('token')) navigate("/main");
    }, []);
    const handleSubmit = async (values) => {
        try {
            // eslint-disable-next-line no-undef
            const response = await authFetch(import.meta.env.REACT_APP_BACK_URL + import.meta.env.REACT_APP_BACK_URL_REGISTRATION, {
                firstName: values.firstName,
                secondName: values.secondName,
                email: values.email,
                password: values.password
            })
            console.log(response)
            localStorage.setItem('token', response.accessToken)
            localStorage.setItem('id', response.id)
            localStorage.setItem('scheduleId', response.scheduleId)
            return navigate("/main");
        } catch (e) {
            console.error(e)
        }
    }

    const navToRegistrarion = () => {
        navigate('/authorization/login')
    }

    return (
        <div className={style.login}>
            <h1>REGISTRATION</h1>
            <Formik
                initialValues={{
                    firstName: '',
                    secondName: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                }}
                validationShema={
                    Yup.object().shape({
                        firstName: Yup.string().required('Name is required'),
                        secondName:  Yup.string().required('Name is required'),
                        email: Yup.string().email().required('Login is required'),
                        password: Yup.string().trim().min(3).required('Password is required'),
                        confirmPassword: Yup.string().trim().min(3).required('ConfirmPassword is required')
                    })}
                onSubmit={async (values) => await handleSubmit(values)}
            >
                <Form className={style.forma}>
                    <Field component={Input} label='First Name' type='text' name='firstName'></Field>
                    <Field component={Input} label='Second Name' type='text' name='secondName'></Field>
                    <Field component={Input} label='Email' type='text' name='email'></Field>
                    <Field component={Input} label='Password' type='password' name='password'></Field>
                    <Field component={Input} label='Confirm Password' type='password' name='confirmPassword'></Field>
                    <button type='submit' className='style.submitButton'>Registration</button>
                    <a onClick={navToRegistrarion} className={style.to}>Login</a>
                </Form>
            </Formik>
        </div>
    );
};

export default Registration;