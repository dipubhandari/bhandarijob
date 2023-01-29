import { Link } from 'react-router-dom'
import React from 'react'
import Header from '../../components/Header/Header'
import './Select.css'
import { FaHandshake } from 'react-icons/fa'
import { MdOutlineWork } from 'react-icons/md'

const ApplyJob = () => {

    return (
        <>
            <Header />
            <div className='select_account_container'>

                <div className='loginContainer'>

                    <section className="form">
                        <h4>Create Job Seeker Account</h4>
                        <hr />
                        <form
                            encType='multipart/form-data' action="" className='login_form'>
                            <span className="form_fullname">
                                <label htmlFor="">Enter full Name * </label>
                                <input
                                    type="text"
                                    name='name'
                                    placeholder='Enter the full name'
                                />
                            </span>
                            <span className="form_email">
                                <span className='email'>
                                    <span>Email*</span>
                                    <input
                                        type="text"
                                        name='email'
                                        placeholder='Enter email'
                                    />
                                </span>

                                <span className='phone'>
                                    <span>Phone*</span>

                                    <input
                                        type="text"
                                        name='phone'
                                        placeholder='Enter Phone'
                                    />

                                </span>
                            </span>
                            <span className="form_email">
                                <span className='email'>
                                    <span>Password*</span>
                                    <input
                                        type="text"
                                        name='password'
                                        placeholder='Choose Password'
                                    />
                                </span>

                                <span className='phone'>
                                    <span>Password*</span>
                                    <input
                                        type="text"
                                        name='repeat'
                                        placeholder='Repeat Password'
                                    />

                                </span>
                            </span>

                            <input
                                type='submit'
                                value='Create' className='create_btn'
                            />
                        </form>
                    </section>
                </div>

            </div>
        </>
    )
}

export default ApplyJob
