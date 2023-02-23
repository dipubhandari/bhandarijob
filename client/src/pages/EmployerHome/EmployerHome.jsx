import React from 'react'
import { useState } from 'react'
import Application from '../../components/Application/Application'
import Header from '../../components/Header/Header'
import JobApplication from '../../components/JobNotice/JobNotice'
import './EmployerHome.css'
import { RxDashboard } from 'react-icons/rx'
import { MdOutlineWork } from 'react-icons/md'
import CompanyProfile from '../../components/CompanyProfile/CompanyProfile'
import PasswordChange from '../../components/PassowordChange/PasswordChange'
import ChatList from '../../components/ChatList/ChatList'

const EmployerHome = (props) => {

    const [component, setComponent] = useState('job')

    const handleJobComponent = (e) => {
        setComponent(e)
    }

    return (
        <div className='home_container'>
            {/* header */}
            <section className="header">
                <Header isLogin={props.isLogin} />
            </section>
            <section className="dashboard">


                <section className="left_dashboard">
                    <button><RxDashboard />Dashboard</button>
                    <input onClick={() => setComponent('job')} type="button" value='Your Job Posts' />
                    <input onClick={() => setComponent('chatlist')} type="button" value='Chats' />
                    <input onClick={() => setComponent('aboutuser')} type="button" value='Your Information' />
                    <input onClick={() => setComponent('changepassword')} type="button" value='Change Password' />

                </section>
                <section className="right_dashboard">
                    {

                        (component == 'job') && <JobApplication handleJobComponent={handleJobComponent} />}

                    {(component == 'chatlist') && <ChatList />}

                    {(component == 'aboutuser') && <CompanyProfile />}

                    {(component == 'application') && <Application />}
                    {(component == 'changepassword') && <PasswordChange />}

                </section>

            </section>

            {/* </section> */}
        </div>
    )
}

export default EmployerHome
