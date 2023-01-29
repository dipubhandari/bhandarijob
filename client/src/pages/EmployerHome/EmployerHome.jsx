import React from 'react'
import { useState } from 'react'
import Application from '../../components/Application/Application'
import Header from '../../components/Header/Header'

import './EmployerHome.css'

const EmployerHome = (props) => {

    const [component, setComponent] = useState('')

    return (
        <div className='home_container'>
            {/* header */}
            <section className="header">
                <Header isLogin={props.isLogin} />
            </section>
            <section className="dashboard">


                <section className="left_dashboard">
                    <input onClick={()=>setComponent('dashboard')} type="button" value='Dashboard' />
                    <input type="button" value='Applications' onClick={() => setComponent('application')} />

                </section>
                <section className="right_dashboard">
                    {
                        !(component == 'application') ?
                            <Application />
                            :
                            <h1>Welcome,..... to the dashboard</h1>
                    }

                </section>

            </section>

            {/* </section> */}
        </div>
    )
}

export default EmployerHome
