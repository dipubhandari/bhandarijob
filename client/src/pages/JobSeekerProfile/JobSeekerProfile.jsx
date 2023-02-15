import React from 'react'
import { useState } from 'react'
import Header from '../../components/Header/Header'
import './JobSeekerProfile.css'
import { RxDashboard } from 'react-icons/rx'
import { MdOutlineWork } from 'react-icons/md'
import JobSeekerDashboard from '../../components/JobSeekerDashboard/JobSeekerDashboard'


const JobSeekerProfile = () => {

    const [component, setComponent] = useState('job')

    const handleJobComponent = (e) => {
        setComponent(e)
    }

    return (
        <div className='home_container'>
            {/* header */}
            <Header />
            <section className="header">
            </section>
            <section className="dashboard">


                <section className="left_dashboard_jobseeker">
                    <button onClick={() => setComponent('dashboard')}><RxDashboard />Your Dashboard</button>
                    <input onClick={() => setComponent('job')} type="button" value='Your Profile' />
                    <input onClick={() => setComponent('aboutuser')} type="button" value='Resume' />
                    <input onClick={() => setComponent('changepassword')} type="button" value='Change Password' />

                </section>
                <section className="right_dashboard_jobseeker">

                    {(component == 'dashboard') && <JobSeekerDashboard />}

                </section>

            </section>

            {/* </section> */}
        </div>
    )
}

export default JobSeekerProfile

