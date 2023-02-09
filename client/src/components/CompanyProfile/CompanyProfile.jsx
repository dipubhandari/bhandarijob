import { BsFillCloudUploadFill } from 'react-icons/bs'
import React, { useEffect, useState } from 'react'
import './CompanyProfile.css'
import axios from 'axios'
import { server } from '../../config'
const CompanyProfile = () => {
    const [companyDetails, setCompanyDetails] = useState({})

    const token = localStorage.getItem('token')
    // fetching the particular company detail
    useEffect(() => {

        const fetchDetail = axios.get(`${server}/company-details/${token}`).then((res) => {
            if (res) {
                setCompanyDetails(res.data)
            }
        })
        return () => {

        };
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
                                name='changeavatar'
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
                                name='companyname'
                                placeholder='Enter the company name'
                            />
                        </span>


                        <span className='form_fullname'>
                            <span>Email*</span>
                            <input
                                type="text"
                                value={companyDetails.email}
                                name='email'
                                placeholder='Enter email'
                            />
                        </span>


                    </span>
                    <span className="first_form_inputs">
                        <span className='form_fullname'>
                            <span>Phone*</span>

                            <input
                                type="text"
                                name='phone'
                                value={companyDetails.phone}
                                placeholder='Enter Phone'
                            />

                        </span>
                        <span className='form_fullname'>
                            <span>Password*</span>
                            <input
                                value={companyDetails.password} disabled='true'
                                type="text"
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
                            placeholder='Address (only District)'
                            value={companyDetails.address}
                        />

                    </span>

                    <input
                        type='submit'
                        value='Update Profile'
                        className='update'
                    />
                </form>
            </section>
        </div >
    )
}

export default CompanyProfile