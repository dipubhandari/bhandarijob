// import { post } from './post'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Job.css'
import { server } from '../../config'
import axios from 'axios'

const Job = () => {
    // latest posted job 
    const [latestJob, setLatestJobs] = useState([])


    useEffect(() => {
        // fetching latest job
        const latestJob = async () => {

            const posts = await axios.get(`${server}/api/jobpost`).then((response) => {

                setLatestJobs(response.data)
                console.log(response.data)
            })
        }
        latestJob()
    }, [])

    return (
        <>

            <h4 className='job_title'><span>Latest Jobs ({10})</span></h4>

            <div className='job_container'>

                <section className="job_content">
                    {
                        latestJob.map((item, id) => {
                            return < section className="job_Card" key={id}>
                                <section className="company_logo">
                                    <img src={`${server}/uploads/logo/${item.logo}`} alt="" />
                                    <NavLink to={`job-post-detail/${item._id}`} className='view_btn'>Apply Now

                                    </NavLink>

                                </section>
                                <section className="job_category">
                                    <h6 className='name'>{item.companyname}</h6>
                                    <li className='jobtitle'>{item.position}</li>
                                    <li>Vacancy({item.vacancy})</li>

                                </section>
                                <section className='like'></section>
                            </section>
                        })
                    }




                </section>

            </div>

            <h4 className='viewbtn'><Link to='/jobs' className='viewbtnlink'>View All</Link></h4>
        </>

    )
}

export default Job
