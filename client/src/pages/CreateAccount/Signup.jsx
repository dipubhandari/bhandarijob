import React from 'react'
import Header from '../../components/Header/Header'
import './Signup.css'


const Signup = () => {
    return (

        <>
            <Header />
            <div className='loginContainer'>

                <section className="form">
                    <h4>Create Job Seeker Account</h4>
                    <hr />
                    <form action="" className='login_form'>
                        <span className="form_fullname">
                            <label htmlFor="">Enter full Name * </label>
                            <input type="text" placeholder='Enter the full name' />
                        </span>
                        <span className="form_email">
                            <span className='email'>
                                <span>Email*</span>
                                <input type="text" placeholder='Enter email' />
                            </span>

                            <span className='phone'>
                                <span>Phone*</span>

                                <input type="text" placeholder='Enter Phone' />

                            </span>
                        </span>
                        <span className="form_email">
                            <span className='email'>
                                <span>Password*</span>
                                <input type="text" placeholder='Choose Passowrd' />
                            </span>

                            <span className='phone'>
                                <span>Password*</span>
                                <input type="text" placeholder='Repeat Password' />

                            </span>
                        </span>

                        <input type='submit' value='Create' className='create_btn' />
                    </form>
                </section>
            </div>
        </>
    )
}

export default Signup
