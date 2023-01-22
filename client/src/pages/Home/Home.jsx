import React from 'react'
import Header from '../../components/Header/Header'
import Hero from '../../components/HeroSection/Hero'
import Job from '../../components/Jobs/Job'


const Home = () => {
    return (
        <div className='home_container'>
            {/* header */}
            <section className="header">
                <Header />
            </section>

            <section className="hero">
                <Hero />
            </section>

            <section className="job">
                <Job />
            </section>
        </div>
    )
}

export default Home
