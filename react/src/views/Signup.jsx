import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

export default function Signup() {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const {setUser, setToken} = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }
        console.log(payload);

        axiosClient.post('/signup', payload)
        .then( ({data}) => {
            setUser(data.user);
            setToken(data.token);
        })
        .catch( err => {
            const response = err.response;
            if(response && response.status == 422) {
                console.log(response.data.errors);
            }
        })
    }

      return (
        <div className='login-signup-form animated fadeInDown'>
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">
                        Signup for free
                    </h1>
                    <input type="text" ref={nameRef} placeholder="Full Name" />
                    <input type="email" ref={emailRef} placeholder="Email Address" />
                    <input type="password" ref={passwordRef} placeholder="Password" />
                    <input type="password" ref={passwordConfirmationRef} placeholder="Password Confirmation" />
                    <button className="btn btn-block">Signup</button>
                    <p className="message">
                        Already Registered? <Link to="/login">Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
      )
}
