import { BsFillCloudUploadFill } from 'react-icons/bs'
import React, { useEffect, useState } from 'react'
import './PasswordChange.css'
import axios from 'axios'
import { server } from '../../config'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PasswordChange = () => {
    const [inputs, setInputs] = useState({})
    const token = localStorage.getItem('token')
    // onChange the input of the field
    function handleChange(e) {
        const value = e.target.value
        const name = e.target.name
        console.log(inputs)
        setInputs({ ...inputs, [name]: value })
    }
    // onsubmit the form

    // alert confrim
    function passwordChange(e) {
        e.preventDefault()
        confirmAlert({
            title: 'Change Password',
            message: 'Are you sure to Change Password',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {

                        //    when user clieck yes button
                        await axios.post(`${server}/change-password`, inputs).then((response) => {
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

    return (
        <div className=''>
            <ToastContainer />
            <section className="form_companyprofile_c_p">

                <form encType='multipart/form-data' action="" className=''>



                    <span className="first_form_inputs_p_c">
                        <span className="form_fullname">
                            <span htmlFor="">Enter Old Password * </span>
                            <input value={inputs.oldpassword}
                                type="text"
                                name='oldpassword' onChange={handleChange}
                                placeholder='Enter Old Password'
                            />
                        </span>


                        <span className='form_fullname'>
                            <span>Enter New Password*</span>
                            <input
                                type="text"
                                value={inputs.oldpassword}
                                name='password' onChange={handleChange}
                                placeholder='Enter New Password'
                            />
                        </span>
                        <span className='form_fullname'>
                            <span>Re-Type Password*</span>
                            <input
                                type="text"
                                value={inputs.password}
                                name='password' onChange={handleChange}
                                placeholder='Confirm Password'
                            />
                        </span>


                        <input
                            type='submit'
                            value='Change Password'
                            className='change'
                            onClick={passwordChange}

                        />
                    </span>




                </form>
            </section>
        </div >
    )
}

export default PasswordChange