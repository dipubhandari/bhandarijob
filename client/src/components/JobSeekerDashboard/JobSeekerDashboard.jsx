import React from 'react'
import './JobSeekerDashboard.css';
import { RiDashboardFill } from 'react-icons/ri'
import { GrCheckboxSelected } from 'react-icons/gr'
import { CgSandClock } from 'react-icons/cg'
import { AiOutlineProfile } from 'react-icons/ai'
import { ImCross } from 'react-icons/im'
import { MdOutlineWork } from 'react-icons/md'
import { AiFillProfile } from 'react-icons/ai';
const JobSeekerDashboard = () => {



    return (
        <div className='jobseeker_dashboard_container'>
            <section className="first__icon">
                <section className='icon'><RiDashboardFill /></section>
                <section className='dash_title'>Application Statistics</section>
                <section className='dash_title'>Applied for Jobs.</section>
            </section>

            <section className="second__icon">
                <section className='icon'><MdOutlineWork /></section>
                <section className='dash_title'>0 Short listed </section>
            </section>


            <section className="third__icon">
                <section className='icon'><CgSandClock /></section>
                <section className='dash_title'>Pending Count</section>
                <section className='dash_title'>Applications pending for companies</section>
            </section>


            <section className="forth__icon">
                <section className='icon'><ImCross /></section>
                <section className='dash_title'>Rejected Count</section>
                <section className='dash_title'>Applications rejected by companies</section>
            </section>

            <section className="fifth__icon">
                <section className='icon'><AiFillProfile /></section>
                <section className='dash_title '>My Profile</section>
                <section className=' dash_title'>View Profile</section>
            </section>

            <section className="sixth__icon">
                <section className='icon'><MdOutlineWork /></section>
                <section className='dash_title'>Appropriate For Me</section>
                <section className='dash_title'>0 Hot Job</section>
            </section>
        </div>
    )
}

export default JobSeekerDashboard