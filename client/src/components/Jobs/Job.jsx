import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Job.css'

const Job = () => {
    return (
        <>

            <h4 className='job_title'><span>It Jobs ({10})</span></h4>

            <div className='job_container'>

                <section className="job_content">
                    {/* job detatils first */}
                    <sectin className="job_Card">
                        <section className="company_logo">
                            <img src="https://m.media-amazon.com/images/G/01/gc/designs/livepreview/amazon_dkblue_noto_email_v2016_us-main._CB468775337_.png" alt="" />
                            <NavLink className='view_btn'>Apply Now</NavLink>

                        </section>
                        <section className="job_category">
                            <h6>Company PVT LTD</h6>
                            <li>Job Title</li>
                            <li>1 Vacancy</li>

                        </section>

                    </sectin>

                    {/* job detatils first */}
                    <sectin className="job_Card">
                        <section className="company_logo">
                            <img src="https://m.media-amazon.com/images/G/01/gc/designs/livepreview/amazon_dkblue_noto_email_v2016_us-main._CB468775337_.png" alt="" />
                            <NavLink className='view_btn'>Apply Now</NavLink>
                        </section>
                        <section className="job_category">
                            <h6>Company PVT LTD</h6>
                            <li>Job Title</li>
                            <li>1 Vacancy</li>
                        </section>
                    </sectin>


                </section>

            </div>
        </>

    )
}

export default Job
