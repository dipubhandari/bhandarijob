import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import './Signup.css'
import { ToastContainer, toast } from 'react-toastify';
import { server } from '../../config'
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {

    // state for input of the form

    const [input, setinput] = useState({})

    async function handleForm(e) {

        e.preventDefault()
        // validating the form
        if (!(input.name && input.email && input.password && input.repeat)) {
            toast.warn('Enter all the fiels')
        }
        else if (input.phone.length < 10) {
            toast.warn('Enter correct Mobile')
        }
        else if (input.password != input.repeat) {
            toast.warn('Password donot match')
        }
        else {
            // send
            await fetch(`${server}/newuser`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(input)

                }).then((response) => response.json())
                .then((result) => {
                    if (result.error_msg) {
                        toast.warn(result.error_msg)
                    }
                    if (result.success) {
                        toast.success(result.success)
                        setinput({})
                    }

                    // setinput({})
                }).catch((error) => {
                    console.log(error)
                })
        }
    }


    return (

        <>
            <Header />
            <ToastContainer />
            <div className='loginContainer'>

                <section className="form">
                    <h4>Create Job Seeker Account</h4>
                    <hr />
                    <form onSubmit={handleForm} action="" className='login_form'>
                        <span className="form_fullname">
                            <label htmlFor="">Enter full Name * </label>
                            <input
                                type="text"
                                onChange={(e) =>
                                    setinput({ ...input, [e.target.name]: e.target.value })}
                                name='name'
                                value={input.name || ''}
                                placeholder='Enter the full name'
                            />
                        </span>
                        <span className="form_email">
                            <span className='email'>
                                <span>Email*</span>
                                <input
                                    type="text"
                                    name='email'
                                    value={input.email || ''}
                                    onChange={(e) =>
                                        setinput({ ...input, [e.target.name]: e.target.value })}
                                    placeholder='Enter email'
                                />
                            </span>

                            <span className='phone'>
                                <span>Phone*</span>

                                <input
                                    type="text"
                                    value={input.phone || ''}
                                    onChange={(e) =>
                                        setinput({ ...input, [e.target.name]: e.target.value })}
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
                                    onChange={(e) =>
                                        setinput({ ...input, [e.target.name]: e.target.value })}
                                    name='password'
                                    value={input.password || ''}
                                    placeholder='Choose Passowrd'
                                />
                            </span>

                            <span className='phone'>
                                <span>Password*</span>
                                <input
                                    type="text"
                                    value={input.repeat || ''}
                                    onChange={(e) =>
                                        setinput({ ...input, [e.target.name]: e.target.value })}
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
        </>
    )
}

export default Signup
