import axios from 'axios'; import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import './Signup.css'
import { ToastContainer, toast } from 'react-toastify';
import { server } from '../../config'
import 'react-toastify/dist/ReactToastify.css';

const SignupCompany = () => {

    // state for input of the form

    const [input, setinput] = useState({})

    async function handleForm(e) {
        console.log(input)
        e.preventDefault()

        if (!(input.companyname && input.address && input.email && input.password && input.description && input.phone)) {
            toast.warn('Enter all the fiels')
        }
        else if (input.phone.length < 10) {
            toast.warn('Enter correct Mobile')
        }
        else if (input.password.length < 8 || input.password.length > 16) {
            toast.warn('Password must between 8 to 16 character long')
        }
        else if (!input.logo) {
            toast.warn('Upload a company Logo')
        }
        else if (input.description.length < 100) {
            toast.warn('Description should at least 100 character long.')
        }
        else {

            // form object

            const formData = new FormData()

            formData.append('phone', input.phone)
            formData.append('companyname', input.companyname)
            formData.append('logo', input.logo)
            formData.append('email', input.email)
            formData.append('address', input.address)
            formData.append('password', input.password
            )

            formData.append('description', input.description)
            console.log(formData)
            await axios.post(`${server}/account-company-owner`,
                formData
            ).then((result) => {
                if (result.data.error_msg) {
                    toast.warn(result.data.error_msg)
                }
                if (result.data.success) {
                    toast.success(result.data.success)
                    setinput({})
                }
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
                    <h4>Create New Company  Account</h4>
                    <hr />
                    <form encType='multipart/form-data' onSubmit={handleForm} action="" className='login_form'>
                        <span className=" form_email">
                            <span className="form_fullname">
                                <label htmlFor="">Enter Company Name * </label>
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        setinput({ ...input, [e.target.name]: e.target.value })}
                                    name='companyname'
                                    value={input.companyname || ''}
                                    placeholder='Enter the company name'
                                />
                            </span>

                            <span className='phone'>
                                <span>Slect Company logo*</span>
                                <input
                                    type="file"
                                    name='logo'
                                    onChange={(e) =>
                                        setinput({ ...input, [e.target.name]: e.target.files[0] })}
                                    className='companylogo'
                                    placeholder='Repeat Password'
                                />

                            </span>
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
                                <span>Address*</span>
                                <input
                                    type="text"
                                    value={input.address || ''}
                                    onChange={(e) =>
                                        setinput({ ...input, [e.target.name]: e.target.value })}
                                    name='address'
                                    placeholder='Address (only District)'
                                />

                            </span>
                        </span>
                        <br />
                        <textarea name="description" className='company_desc' id="" cols="10" placeholder='Describe about company.' rows="10" value={input.description || ''}
                            onChange={(e) =>
                                setinput({ ...input, [e.target.name]: e.target.value })}></textarea>
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

export default SignupCompany
