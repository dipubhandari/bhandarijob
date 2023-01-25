import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Hero from '../../components/HeroSection/Hero'
import Job from '../../components/Jobs/Job'
import './Search.css'
import SearchDetails from './SearchDetails/SearchDetails'

const Search = (props) => {


    return (
        <div className='home_container'>
            {/* header */}
            <section className="header">
                <Header isLogin={props.isLogin} />
            </section>

            <section className="hero">
                <Hero />
            </section>

            <section className="job">

                <SearchDetails />


            </section>


            <section className="footer">

                <Footer />

            </section>
        </div>
    )
}

export default Search
