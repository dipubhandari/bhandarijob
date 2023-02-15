import { Link } from 'react-router-dom'
import React from 'react'
import Header from '../../components/Header/Header'
import { FaHandshake } from 'react-icons/fa'
// import { MdOutlineWork,MdDriveFolderUpload } from 'react-icons/md'
import { MdOutlineWork, MdDriveFolderUpload } from 'react-icons/md'
import './style.css'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { server } from '../../config'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { apply } from '../../redux/applySlice'
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import { jobId } from '../../redux/jobIdSlice'

const ApplyJob = () => {
    const location = useLocation()
    const [resume, setResume] = useState({});
    const applier = useSelector(state => state.apply)

    const jobapplier = localStorage.getItem('token')

    const Apply = async (e) => {
        e.preventDefault()
        if (!resume.name) {
            toast.warn('Upload the file ')

        } else if (resume.type != ('application/pdf')) {
            toast.warn('Please upload file in pdf format')
        } else {
            const resumePdf = JSON.parse(JSON.stringify(resume))

            const formData = new FormData()
            formData.append('resume', resume)
            formData.append('jobseeker', jobapplier)
            formData.append('jobpost', applier)
            await axios.post(`${server}/apply`, formData).then((response) => {
                if (response.data.error_msg) {
                    toast.error(response.data.error_msg)
                    setResume({})
                }
                if (response.data.success) {
                    toast.success(response.data.success)
                    setResume({})
                }
            })
        }
    }
    // onload fetch if of the post from url and insert to store sot htat once refresh the page it not out from store

    const dispathch = useDispatch()
    const pathname = location.pathname
    const patharr = pathname.split('/')
    const job = patharr[patharr.length - 1]
    useEffect(() => {
        dispathch(apply(job))
    }, [])

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

                                disabled={false}
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
