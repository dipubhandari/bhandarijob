import React from 'react'
import Header from '../../components/Header/Header'
import './Login.css'


const Login = () => {
    
    return (

        <>
            <Header />
            <div className='loginContainer'>

                <section className="forms">
                    <h4>Login</h4>
                    <hr />
                    <form action="" className='login_form'>

                        <span className="form_email">


                        </span>
                        <span className="form_email">
                            <span className='email'>
                                <span>Email*</span>
                                <input type="text" placeholder='Enter email' />
                            </span>
                            <span className='email'>
                                <span>Password*</span>
                                <input type="text" placeholder='Choose Passowrd' />
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
