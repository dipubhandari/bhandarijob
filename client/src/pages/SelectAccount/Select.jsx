import { Link } from 'react-router-dom'
import React from 'react'
import Header from '../../components/Header/Header'
import './Select.css'
import { FaHandshake } from 'react-icons/fa'
import { MdOutlineWork } from 'react-icons/md'

const Select = () => {

    return (
        <>
            <Header />
            <div className='select_account_container'>
                <section className="select_title">
                    <h1>You Are a...</h1>
                </section>
                <section className="select_jobseeker">
                    <Link to='/new' className='new_link'><MdOutlineWork /> Job Finder</Link>
                </section>
                <section className="employer">
                    <Link to='/newemploye' className='new_link'><FaHandshake /> Company</Link>
                </section>

            </div>
        </>
    )
}

export default Select
