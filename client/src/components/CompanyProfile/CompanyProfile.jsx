import { BsFillCloudUploadFill } from 'react-icons/bs'
import React, { useEffect, useState } from 'react'
import './CompanyProfile.css'
import axios from 'axios'
import { server } from '../../config'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const CompanyProfile = () => {
    const [companyDetails, setCompanyDetails] = useState({})

    const token = localStorage.getItem('token')
    console.log(token)
    // onChange the input of the field
    function handleChange(e) {
        const value = e.target.value
        const name = e.target.name
        console.log(companyDetails)
        setCompanyDetails({ ...companyDetails, [name]: value })
    }
    // onsubmit the form

    // alert confrim
    function handleUpdate(e) {
        console.log(companyDetails)
        e.preventDefault()
        confirmAlert({
            title: 'Update Profile',
            message: 'Are you sure to Update this details',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        const formData = new FormData()
                        formData.append('companyname', companyDetails.companyname)
                        formData.append('token', localStorage.getItem('token'))
                        formData.append('avatar', companyDetails.avatar)
                        formData.append('email', companyDetails.email)
                        formData.append('phone', companyDetails.phone)
                        formData.append('address', companyDetails.address)
                        //    when user clieck yes button
                        await axios.post(`${server}/update-company-details`, companyDetails).then((response) => {
                            console.log(response.data)
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

        const fetchDetail = axios.get(`${server}/company-details/${token}`).then((res) => {
            if (res) {
                setCompanyDetails(res.data)
            }
        })

    }, [])
    return (
        <div className=''>

            <section className="form_companyprofile">

                <form encType='multipart/form-data' action="" className='login_form'>
                    <span className=" ">
                        <span className='companyProfileformheader'>

                            <span>  <img
                                src='http://localhost:5000/uploads/logo/logo-1675926093614-7916800'
                                className='image_company ' /></span>
                            <label htmlFor="changeavatar" className='chageicon'>
                                <BsFillCloudUploadFill />
                                Change Avatar
                            </label>
                            <input
                                type="file"

                                onChange={(e) => setCompanyDetails({
                                    ...companyDetails, 'avatar': e.target.files[0]
                                })}
                                id='changeavatar'
                                className='companylogo'

                            />


                        </span>


                    </span>
                    <span className="first_form_inputs">
                        <span className="form_fullname">
                            <span htmlFor="">Enter Company Name * </span>
                            <input value={companyDetails.companyname}
                                type="text"
                                name='companyname' onChange={handleChange}
                                placeholder='Enter the company name'
                            />
                        </span>


                        <span className='form_fullname'>
                            <span>Email*</span>
                            <input
                                type="text"
                                value={companyDetails.email}
                                name='email' onChange={handleChange}
                                placeholder='Enter email'
                            />
                        </span>


                    </span>
                    <span className="first_form_inputs">
                        <span className='form_fullname'>
                            <span>Phone*</span>

                            <input
                                type="text"
                                name='phone' onChange={handleChange}
                                value={companyDetails.phone}
                                placeholder='Enter Phone'
                            />

                        </span>
                        <span className='form_fullname'>
                            <span>Password*</span>
                            <input
                                value={companyDetails.password} disabled='true'
                                type="text" onChange={handleChange}
                                name='password'
                                placeholder='Choose Passowrd'
                            />
                        </span>


                    </span>
                    <span className="first_form_inputs"> Address</span>
                    <span className='first_form_inputs form_fullname'>
                        <input
                            style={{ margin: '0px', width: '48%' }}
                            type="text"
                            name='address'
                            onChange={handleChange} placeholder='Address (only District)'
                            value={companyDetails.address}
                        />

                    </span>

                    <input
                        type='submit'
                        value='Update Profile'
                        className='update'
                        onClick={handleUpdate}
                    />
                </form>
            </section>
        </div >
    )
}

export default CompanyProfile