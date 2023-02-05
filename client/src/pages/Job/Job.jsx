import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Hero from '../../components/HeroSection/Hero'
import Job from '../../components/Jobs/Job'
import './Job.css'
import JobDetails from './JobDetails/JobDetails'

const Search = (props) => {

    const [isSearchClicked, searchClicked] = useState('')

    function clickedOnSearch() {

        searchClicked(Math.random())

    }

    return (
        <div className='home_container'>
            {/* header */}
            <section className="header">
                <Header isLogin={props.isLogin} />
            </section>

            <section className="hero">
                <Hero clickedOnSearch={clickedOnSearch} />
            </section>

            <section className="job">

                <JobDetails isSearchClicked={isSearchClicked} />


            </section>


            <section className="footer">

                <Footer />

            </section>
        </div>
    )
}

export default Search
