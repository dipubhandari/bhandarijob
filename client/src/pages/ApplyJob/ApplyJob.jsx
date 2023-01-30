import { Link } from 'react-router-dom'
import React from 'react'
import Header from '../../components/Header/Header'
import { FaHandshake } from 'react-icons/fa'
// import { MdOutlineWork,MdDriveFolderUpload } from 'react-icons/md'
import { MdOutlineWork, MdDriveFolderUpload } from 'react-icons/md'
import './style.css'
import { useState } from 'react'
import { server } from '../../config'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux'

const ApplyJob = () => {
    const [resume, setResume] = useState({});
    const apply = useSelector(state => state.apply)

    const user = localStorage.getItem('token')
    console.log(resume)
    console.log(resume.type)

    const Apply = async (e) => {
        e.preventDefault()
        // checking the file is correct or not

        if (!resume.name) {
            toast.warn('Upload the file ')

        } else if (resume.type != ('application/pdf')) {
            toast.warn('Please upload file in pdf format')
        } else {
            const formData = new FormData()
            formData.append('resume', resume)
            formData.append('jobseeker', user)
            formData.append('jobpost', apply)
            await axios.post(`${server}/apply`, formData).then((response) => {

                if (response.data.error_msg) {
                    toast.error(response.data.error_msg)
                }

                if (response.data.success) {
                    toast.success(response.data.success)
                }
            })
        }

    }

    return (
        <>
            <ToastContainer />
            <Header />
            <div className='apply_container'>

                <div className='loginContainer'>

                    <section className="form">
                        <h4>Apply For A job</h4>
                        <hr />
                        <form
                            encType='multipart/form-data' action="" className='login_form'>
                            <span className="form_fullname">
                                <label htmlFor="resume"><MdDriveFolderUpload className='uploadfile' />Upload Resume... * </label>
                                {resume.name}

                                <input
                                    onChange={(e) => setResume(e.target.files[0])}
                                    type='file'
                                    name='resume'
                                    id='resume'

                                    className='fieldresume'
                                />
                            </span>





                            <input
                                type='submit'
                                value='Apply' className='applybtn'
                                onClick={Apply}
                            />
                        </form>
                    </section>
                </div>

            </div>
        </>
    )
}

export default ApplyJob
