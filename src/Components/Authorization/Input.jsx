import React, {useState} from 'react';
import eye from '../../img/invisible_eye_icon_143000.png'
import style from './input.module.css'

const Input = ({field, form: {touched, errors}, label, type, ...props}) => {

    const [lookPsw, setLookPsw] = useState('password')
    const watchPsw = () => {setLookPsw(prevState => prevState === 'password' ? 'text' : 'password')}
    return (
        <div className={style.form}>
            <label>{label}</label>
            <div className={style.myInput}>
                <input type={type === 'password' ? lookPsw : type} {...field} {...props}/>
                {type === 'password' ? <button onClick={watchPsw} className={style.eye}><img src={eye} alt='alt' width='22px' height='22px'/></button> : null}
            </div>
            {touched[field.name] &&
                errors[field.name] && <div className="error">{errors[field.name]}</div>}
        </div>
    );
};
export default Input;