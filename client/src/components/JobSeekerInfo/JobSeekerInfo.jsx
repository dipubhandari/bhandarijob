import { BsFillCloudUploadFill } from 'react-icons/bs'
import React, { useEffect, useState } from 'react'
import './JobSeekerProfile.css'
import axios from 'axios'
import { server } from '../../config'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const JobSeekerInfo = () => {
    const [jobSeekerDetails, setJobSeekerDetails] = useState({})
    const [updateButtonActive, setUpdateButtonActive] = useState(false)
    const token = localStorage.getItem('token')
    // onChange the input of the field
    function handleChange(e) {
        setUpdateButtonActive(true)
        const value = e.target.value
        const name = e.target.name

        setJobSeekerDetails({ ...jobSeekerDetails, [name]: value })
    }
    // onsubmit the form

    // alert confrim
    function handleUpdate(e) {
        e.preventDefault()
        confirmAlert({
            title: 'Update Profile',
            message: 'Are you sure to Update this details',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        await axios.post(`${server}/update-jobseeker-details`, jobSeekerDetails).then((response) => {
                            { (response.data.success_msg) && toast.success(response.data.success_msg) }
                            { (response.data.error_msg) && toast.warning(response.data.error_msg) }

                        })

                    }
                },
                {
                    label: 'No'
                }
            ]
        });

    }
    // fetching the particular company detail
    useEffect(() => {

        const fetchDetail = axios.get(`${server}/jobseeker-details/${token}`).then((res) => {
            if (res) {
                setJobSeekerDetails(res.data)
                console.log(res.data)
            }
        })

    }, [])

    function passwordwarning() {
        toast.warning('You are not allowed to change password from here')
    }

    return (
        <div className=''>
            <ToastContainer />
            <section className="form_seekerprofile">

                <form encType='multipart/form-data' action="" className='login_form'>
                    <span className=" ">


                    </span>
                    <span className="first_form_inputs">
                        <span className="form_fullname">
                            <span htmlFor="">Enter Name * </span>
                            <input value={jobSeekerDetails.name}
                                type="text"
                                name='name' onChange={handleChange}
                                placeholder='Enter the name'
                            />
                        </span>


                        <span className='form_fullname'>
                            <span>Email*</span>
                            <input
                                type="email"
                                value={jobSeekerDetails.email}
                                name='email' onChange={handleChange}
                                placeholder='Enter email'
                            />
                        </span>


                    </span>
                    <span className="first_form_inputs">

                        <span className='form_fullname'>
                            <span>Password*</span>
                            <input
                                value={'password'}
                                type="password" onChange={passwordwarning}
                                name='password'
                                placeholder='Choose Passowrd'
                            />
                        </span>


                    </span>

                    <input
                        type='submit'
                        value='Update Profile'
                        className='update_seeker'
                        onClick={handleUpdate}

                    />
                </form>
            </section>
        </div >
    )
}

export default JobSeekerInfo