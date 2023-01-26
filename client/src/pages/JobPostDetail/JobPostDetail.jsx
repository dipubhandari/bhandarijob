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

import axios from 'axios'
const JobPostDetail = () => {
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
                setDetail(response.data)
            }).catch(() => {

            })
        }
        getDetails()
         
        console.log(jobDetail)
      
    }, [])


    return (
        <div>
            <Header />

            <div className="apply_page_container">

                <section className="company">
                    <section className="company_detail_nav">
                        <img src={`${server}/uploads/logo/${jobDetail}`} alt="" />
                        <h2>{jobDetail.companyname}</h2>
                    </section>
                    <section className="company_detail">
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus totam laborum voluptate quis impedit adipisci ad architecto harum autem commodi eveniet, tempore quaerat mollitia ex aut sit id modi blanditiis debitis? Sit incidunt, quasi blanditiis exercitationem iste, autem quod possimus sequi qui, magnam voluptas natus placeat dicta accusamus ab! </p>
                    </section>
                    <section className="view_company_profile">
                        <Link className='view_company_profileLink'>View Company Profile</Link>
                    </section>
                </section>

                <section className="job_details">
                    <section className="job_position_apply">
                        <h2>React Developer</h2>
                        <h4>Apply Before <span>2099-90-90(1 day left)</span></h4>
                    </section> <h4 className='job_summary_title'>Job Sumaary</h4>
                    <section className="about_job">
                        <section className="about_jobs">
                            <span className="vancancy_div">
                                <span className="vacancy_icon"><TbSortAscendingNumbers /></span>
                                <span className='vacancy_number'><div>No of Vancancy</div> <span className='v_'>9</span></span>
                            </span>
                        </section>
                        <section className="about_jobs">   <span className="vancancy_div">
                            <span className="vacancy_icon"><FaRegMoneyBillAlt /></span>
                            <span className='vacancy_number'><div>Offered Salary</div> <span className='v_'>9</span></span>
                        </span></section>


                        <section className="about_jobs">   <span className="vancancy_div">
                            <span className="vacancy_icon"><BiCurrentLocation /></span>
                            <span className='vacancy_number'><div>Location</div> <span className='v_'>Narayani</span></span>
                        </span></section>
                        <section className="about_jobs">   <span className="vancancy_div">
                            <span className="vacancy_icon"><AiOutlineFieldTime /></span>
                            <span className='vacancy_number'><div>Apply Before</div> <span className='v_'>2066-66-66</span></span>
                        </span></section>
                        <section className="about_jobs">   <span className="vancancy_div">
                            <span className="vacancy_icon"><GiPlayerTime /></span>
                            <span className='vacancy_number'><div>Experience</div> <span className='v_'>9</span></span>
                        </span></section>

                    </section>
                    <section className="about_jobs">
                        <span className="vancancy_div">
                            <span className="vacancy_icon"><BiCheckSquare />
                            </span>
                            <span className='vacancy_number'>
                                <div>Skills</div>
                                <span className='job-post-detail-skills'>
                                    <span>Java</span>
                                    <span>JS</span>
                                    <span>Java</span>
                                    <span>Java</span>
                                </span></span>
                        </span></section>
                    <section className="job_detail_description">
                        <h4>Description:</h4>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam omnis ipsum aliquam iusto, unde obcaecati. Iste quibusdam voluptatum adipisci, tenetur perferendis aut iusto ad voluptatem sed quae commodi architecto cupiditate, provident delectus voluptates in repellendus autem quis impedit repellat quasi. Voluptas minus cum debitis, molestiae fugit facilis odit non praesentium, unde eum deleniti vero expedita itaque est adipisci dignissimos nihil. Dolor, beatae quis cupiditate, accusantium necessitatibus incidunt inventore porro reiciendis quod ipsum corporis cumque exercitationem esse! Nemo debitis at facilis quos non deleniti atque perspiciatis tempore rerum consequatur expedita eum vero necessitatibus veniam ducimus incidunt, corrupti maxime? Blanditiis, illo tempore!</p>
                    </section>

                    <section className="job_detail_description">
                        <h4>Requirements:</h4>
                        <p></p>
                    </section>

                    <section className="job_detail_description">
                        <h4>Apply:</h4>
                        <p>Interested candidates fulfilling the mentioned criteria are encouraged to Apply using the Easy Apply Button below. Registered candidates may also apply using Apply Now Button.</p>
                    </section>

                    <button className='Aplly_btn'>Apply</button>
                </section>

                <section className="other_jobs">

                </section>
            </div>

        </div>
    )
}

export default JobPostDetail