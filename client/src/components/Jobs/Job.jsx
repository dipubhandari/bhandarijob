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
                                    <img src={item.logo} alt="" />
                                    <NavLink className='view_btn'>Apply Now

                                    </NavLink>

                                </section>
                                <section className="job_category">
                                    <h6 className='name'>{item.companyname}</h6>
                                    <li className='jobtitle'>{item.jobtitle}</li>
                                    <li>Vacancy({item.vacancyfor})</li>

                                </section>
                                <section className='like'>💗</section>
                            </section>
                        })
                    }




                </section>

            </div>

            <h4 className='viewbtn'><Link to='/search' className='viewbtnlink'>View All</Link></h4>
        </>

    )
}

export default Job
