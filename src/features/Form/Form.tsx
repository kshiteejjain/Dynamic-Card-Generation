import React from 'react';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "./FormSlice";
import arrow from '../../assets/right-arrow.svg';

const Form = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isOtherTopic, setIsOtherTopic] = useState<boolean>(false);
    const [values, setValues] = useState({
        userName: '', surname: '', topic: '', otherTopic: ''
    });
    const [error, setError] = useState(false);

    const handleChange = (e: { target: { name: any; value: string; }; }) => {
        setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
        if (e.target.value === 'Other') {
            setIsOtherTopic(true);
        };
        if (e.target.value === 'Select' || e.target.value === 'Travel' || e.target.value === 'Cars' || e.target.value === 'Wildlife' || e.target.value === 'Technology') {
            setIsOtherTopic(false);
        };
        setError(false);
    }
    const formSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (values.userName === '' || values.surname === '' || values.topic === '') {
            setError(true);
            return
        }
        setValues({ userName: '', surname: '', topic: '', otherTopic: '' });
        setIsOtherTopic(false);
        dispatch(addUser({
            userName: values.userName,
            surname: values.surname,
            topic: values.topic,
            otherTopic: values.otherTopic,
        }))
        navigate("/ProfilePic");
    }

    return (
        <div>
            <form className="form" onSubmit={formSubmit} data-testid="form">
                <div className="formControl">
                    <label htmlFor="username">Name<span className='asterisk'>*</span> </label>
                    <input type="text" id="username" className="formInput" value={values.userName} name="userName" onChange={handleChange} />
                </div>
                <div className="formControl">
                    <label htmlFor="surname">Surname<span className='asterisk'>*</span> </label>
                    <input type="text" id="surname" className="formInput" value={values.surname} name="surname" onChange={handleChange} />
                </div>
                <div className="formControl">
                    <label htmlFor="topic">Preferred Topic<span className='asterisk'>*</span> </label>
                    <select id="topic" className="formInput" name="topic" value={values.topic} onChange={handleChange}>
                        <option value="Select">Select</option>
                        <option value="Travel">Travel</option>
                        <option value="Cars">Cars</option>
                        <option value="Wildlife">Wildlife</option>
                        <option value="Technology">Technology</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                {isOtherTopic &&
                    <div className="formControl">
                        <label htmlFor="otherTopic">Other Topic<span className='asterisk'>*</span></label>
                        <input type="text" id="otherTopic" className="formInput" value={values.otherTopic} name="otherTopic" onChange={handleChange} />
                    </div>
                }
                <button type="submit" className='buttonPrimary' data-testid="formSubmit">  Next &nbsp; <img src={arrow} alt="Arrow" width='20' /></button>
                {error && <p className="error">All Mandatory Fields Are Required.</p>}
            </form>
        </div>
    )
};

export default Form;