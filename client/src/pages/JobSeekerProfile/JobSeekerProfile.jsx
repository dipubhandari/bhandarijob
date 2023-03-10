import React from 'react'
import { useState } from 'react'
import Header from '../../components/Header/Header'
import './JobSeekerProfile.css'
import { RxDashboard } from 'react-icons/rx'
import { MdOutlineWork } from 'react-icons/md'
import Chat from '../../components/Chat/Chat'
import JobSeekerDashboard from '../../components/JobSeekerDashboard/JobSeekerDashboard'
import ChatList from '../../components/ChatList/ChatList'
import JobSeekerInfo from '../../components/JobSeekerInfo/JobSeekerInfo'
import PasswordChange from '../../components/PassowordChange/PasswordChange'

const JobSeekerProfile = () => {

    const [component, setComponent] = useState('dashboard')

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
                    <input onClick={() => setComponent('chatlist')} type="button" value='Chats' />
                    <input onClick={() => setComponent('profile')} type="button" value='Your Profile' />
                    <input onClick={() => setComponent('changepassword')} type="button" value='Change Password' />

                </section>
                <section className="right_dashboard_jobseeker">

                    {(component == 'dashboard') && <JobSeekerDashboard />}
                    {(component == 'chatlist') && <ChatList setComponent={handleJobComponent} />}
                    {(component == 'chat') && <Chat />}
                    {(component == 'profile') && <JobSeekerInfo />}
                    {(component == 'changepassword') && <PasswordChange />}

                </section>

            </section>

            {/* </section> */}
        </div>
    )
}

export default JobSeekerProfile

