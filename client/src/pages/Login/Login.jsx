import React from 'react'
import Header from '../../components/Header/Header'
import './Login.css'
import { ToastContainer, toast } from 'react-toastify';
import { isLogin } from '../../redux/authSlice';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { server } from '../../config'

const Login = () => {
    const dispatch = useDispatch()
    const location = useNavigate()
    // state for login input
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!(email && password)) {
            toast.warn('Enter the details')


            // console.log(email)
            // console.log(password)


        }
        else {
            // send a POST request to the server with email and password
            // using the fetch API
            await fetch(`${server}/login`, {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        toast.success(data.success)
                        setTimeout(() => {
                            location('/homepage')
                        }, 1000)
                        dispatch(isLogin(true))
                        toast.success('Login...')
                    }
                    // if (data.success) {
                    //     localStorage.setItem('token', data.token);
                    // }
                    localStorage.setItem('token', JSON.stringify(data.user));
                    if (data.error_msg) {
                        toast.warn(data.error_msg)
                    }
                })
                .catch(error => console.error('Error:', error));
        }
    }


    return (

        <>
            <Header />
            <div className='loginContainer'>
                <ToastContainer />
                <section className="forms">
                    <h4>Login</h4>
                    <hr />
                    <form action="" className='login_form' onSubmit={handleSubmit}>

                        <span className="form_email">


                        </span>
                        <span className="form_email">
                            <span className='email'>
                                <span>Email*</span>
                                <input
                                    value={email}
                                    type="text"
                                    placeholder='Enter email'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </span>
                            <span className='email'>
                                <span>Password*</span>
                                <input
                                    value={password}
                                    type="text"
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder='Choose Passowrd'
                                />
                            </span>


                        </span>

                        <input type='submit' value='Login' className='create_btn' />
                    </form>
                </section>
            </div>
        </>
    )
}

export default Login
