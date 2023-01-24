import React from 'react'
import './Hero.css'
import { ImFileText } from 'react-icons/im'
import { BiCategoryAlt, BiCurrentLocation } from 'react-icons/bi'

const Hero = () => {
    return (
        <>
            <section className="hero_container">

                <section className="search">

                    <h1 className='hero_slogan'>Find Your Right <span className="hero_slogan_special">Jobs </span>Now</h1><br />

                    <section className="search_field">

                        <span className="keyword_input_logo"><ImFileText /></span>  <input type="text" className="input_field" placeholder='  Enter the keyword' />

                        <span className="category_input_avatar"><BiCategoryAlt /></span>  <input type="text" placeholder='    Select Category' />
                        <span className="locaton_input_icon"><BiCurrentLocation /></span>  <input type="text" className="input_field" placeholder='   Select Locaition' />



                        <input type="submit" value='search' className="first_field" />
                    </section>

                </section>

            </section>
        </>

    )
}

export default Hero
