import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import HeroSection from '../../components/HeroSection/Hero'
import './JobPostDetail.css'
import { Link } from 'react-router-dom'
import { TbSortAscendingNumbers } from 'react-icons/tb'
import { FaRegMoneyBillAlt } from 'react-icons/fa'
import { SiExpertsexchange } from 'react-icons/si'
import { BiCheckSquare, BiCurrentLocation } from 'react-icons/bi'
import { GiPlayerTime } from 'react-icons/gi'
import { AiOutlineFieldTime } from 'react-icons/ai'
import { useLocation } from 'react-router-dom'
import { server } from '../../config'
import Footer from '../../components/Footer/Footer'
import { apply } from '../../redux/applySlice'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const JobPostDetail = () => {

    // 
    const dispatch = useDispatch()

    // add the company to user chatlist 
    async function addToChat(email) {
        const user = {
            token: localStorage.getItem('token'),
            chatWith: email
        }
        await axios.post(`${server}/api/chat/add-to-chat`, user).then(response => {
            toast.success(response.data.message)
        })
    }
    // post detail state
    const [jobDetail, setDetail] = useState({})

    // getting id from url
    const path = useLocation().pathname
    useEffect(() => {
        const paths = path.split('/')
        const token = paths[paths.length - 1]
        console.log(token)
        async function getDetails() {
            await axios.get(`${server}/job-post-detail/${token}`).then((response) => {
                // console.log(first)
                const data = { ...response.data.companydetail, ...response.data.jobdetail }
                setDetail(data)
                console.log(data)
            }).catch(() => {

            })
        }
        getDetails()

        console.log(jobDetail)

    }, [])


    return (
        <div>
            <Header /><ToastContainer />

            <div className="apply_page_container">

                <section className="company">
                    <section className="company_detail_nav">
                        <img src={`${server}/uploads/logo/${jobDetail.logo}`} alt="" />
                        <h2>{jobDetail.companyname}</h2>
                    </section>
                    <section className="company_detail">
                        <p>{jobDetail.description}</p>
                    </section>
                    <section className="view_company_profile">
                        <Link className='view_company_profileLink' onClick={() => addToChat(jobDetail.email)}>Add to Chat</Link>
                    </section>
                </section>

                <section className="job_details">
                    <section className="job_position_apply">
                        <h2>{jobDetail.position}({jobDetail.category})</h2>
                        <h4>Apply Before <span>{jobDetail.applydate || 'N/A'}(* day left)</span></h4>
                    </section> <h4 className='job_summary_title'>Job Sumaary</h4>
                    <section className="about_job">
                        <section className="about_jobs">
                            <span className="vancancy_div">
                                <span className="vacancy_icon"><TbSortAscendingNumbers /></span>
                                <span className='vacancy_number'><div>No of Vancancy</div> <span className='v_'>{jobDetail.vacancy}</span></span>
                            </span>
                        </section>
                        <section className="about_jobs">   <span className="vancancy_div">
                            <span className="vacancy_icon"><FaRegMoneyBillAlt /></span>
                            <span className='vacancy_number'><div>Offered Salary</div> <span className='v_'>{jobDetail.salary}</span></span>
                        </span></section>


                        <section className="about_jobs">   <span className="vancancy_div">
                            <span className="vacancy_icon"><BiCurrentLocation /></span>
                            <span className='vacancy_number'><div>Location</div> <span className='v_'>{jobDetail.address || 'N/A'}</span></span>
                        </span></section>
                        <section className="about_jobs">   <span className="vancancy_div">
                            <span className="vacancy_icon"><AiOutlineFieldTime /></span>
                            <span className='vacancy_number'><div>Apply Before</div> <span className='v_'>{jobDetail.applydate}</span></span>
                        </span></section>
                        <section className="about_jobs">   <span className="vancancy_div">
                            <span className="vacancy_icon"><GiPlayerTime /></span>
                            <span className='vacancy_number'><div>Experience</div> <span className='v_'>{jobDetail.experience}</span></span>
                        </span></section>

                    </section>
                    <section className="about_jobs">
                        <span className="vancancy_div">
                            <span className="vacancy_icon"><BiCheckSquare />
                            </span>
                            <span className='vacancy_number'>
                                <div>Skills</div>
                                <span className='job-post-detail-skills'>

                                    {
                                        (jobDetail.skills) ?
                                            jobDetail.skills.map((item, id) => {
                                                return <>
                                                    <span>{item}</span>
                                                </>
                                            })
                                            :
                                            null
                                    }
                                </span></span>
                        </span></section>
                    <section className="job_detail_description">
                        <h4>Description:</h4>
                        <p>{jobDetail.jobdescription}</p>
                    </section>

                    <section className="job_detail_description">
                        <h4>Requirements:</h4>
                        {
                            (jobDetail.requirements) ?
                                jobDetail.requirements.map((item, id) => {
                                    return <>
                                        <ol>{id + 1}.{item}</ol>
                                    </>
                                })
                                :
                                null
                        }
                    </section>

                    <section className="job_detail_description">
                        <h4>Apply:</h4>
                        <p>Interested candidates fulfilling the mentioned criteria are encouraged to Apply using the Easy Apply Button below. Registered candidates may also apply using Apply Now Button.</p>

                        <Link to={`/apply/${jobDetail._id}`} onClick={() => dispatch(apply(jobDetail._id))} className='Aplly_btn'>Apply</Link>
                    </section>

                </section>

                <section className="other_jobs">

                </section>
            </div>
            <Footer />

        </div>
    )
}

export default JobPostDetail