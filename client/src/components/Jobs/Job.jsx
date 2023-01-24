// import { post } from './post'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Job.css'
import post from './post'

const Job = () => {
    return (
        <>

            <h4 className='job_title'><span>It Jobs ({10})</span></h4>

            <div className='job_container'>

                <section className="job_content">
                    {
                        post.map((item, id) => {
                            return < section className="job_Card" key={id}>
                                <section className="company_logo">
                                    <img src="https://m.media-amazon.com/images/G/01/gc/designs/livepreview/amazon_dkblue_noto_email_v2016_us-main._CB468775337_.png" alt="" />
                                    <NavLink className='view_btn'>Apply Now
                                     
                                    </NavLink>
                              
                                </section>
                                <section className="job_category">
                                    <h6 className='name'>{item.companyname}</h6>
                                    <li className='jobtitle'>{item.jobtitle}</li>
                                    <li>Vacancy({item.vacancyfor})</li>

                                </section>

                            </section>
                        })
                    }




                </section>

            </div>
        </>

    )
}

export default Job
