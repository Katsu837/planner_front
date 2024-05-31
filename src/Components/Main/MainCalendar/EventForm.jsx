import React from 'react';
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import style from "./eventForm.module.css";
import Input from "../../Authorization/Input.jsx";
import {authFetch} from "../../../API/Fetchers.js";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../../store/date/state.slice.js";


const EventForm = () => {

    const startDate = new Date()
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startDate.getHours() + 1)
    const {eventFormState} = useSelector(state => state.state)
    const dispatch = useDispatch()

    const handleSubmit = async (values) => {
        try {
            const response = await authFetch(import.meta.env.REACT_APP_BACK_URL + import.meta.env.REACT_APP_BACK_URL_CREATE_EVENT, {
                eventName: values.name,
                startTimeEvent: values.start_date,
                endTimeEvent: values.end_date,
                eventType: values.type,
                repeatStatus: values.repeat,
                scheduleId: localStorage.getItem('scheduleId')
            })
            console.log(response)
            dispatch(actions.setEventFormState())
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className={eventFormState ? style.eventForm : style.hide}>
            <Formik
                initialValues={{
                    name: '',
                    start_date: startDate,
                    end_date: endDate,
                    type: 'event',
                    repeat: false,
                }}
                validationShema={
                    Yup.object().shape({
                        date: Yup.string().required('Date is required'),
                        start_time: Yup.string().required('Time is required'),
                        end_time: Yup.string().required('Time is required'),
                        type: Yup.string().required('Type is required'),
                    })}
                onSubmit={async (values) => await handleSubmit(values)}
            >
                <Form>
                    <Field component={Input} label='Name' type='text' name='name'></Field>
                    <Field component={Input} label='Start date' type='datetime-local' name='start_date'></Field>
                    <Field component={Input} label='End time' type='datetime-local' name='end_date'></Field>
                    <Field component={Input} label='Type' type='text' name='Type'></Field>
                    <Field component={Input} label='Repeat' type='checkbox' name='Repeat'></Field>
                    <button type='submit' className='style.submitButton'>Send</button>
                </Form>
            </Formik>
        </div>
    );
};

export default EventForm;