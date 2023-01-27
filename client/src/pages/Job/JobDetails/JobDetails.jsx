import { Link } from 'react-router-dom'
import React from 'react'
import './JobDetails.css'
import { MdWork } from 'react-icons/md'
import { ImLocation } from 'react-icons/im'
import { CiTimer } from 'react-icons/ci'
import { useEffect } from 'react'
import { server } from '../../../config'
import axios from 'axios'
import { useState } from 'react'

const JobDetails = () => {

    // const url = useLocati

    const [jobPost, setJobPost] = useState([])

    useEffect(() => {

        // fetching all the post from sever
        async function postApi() {
            const posts = await axios.get(`${server}/api/jobpost`).then((response) => {

                setJobPost(response.data)
            })
        }
        postApi()
    }, [])


    return (
        <div className='search_details_container'>


            <section className="search_box">
                {/* left sesarch box */}
                <section className="search_items">
                    <section className="companyloation">

                        <select name="" id="">
                            <option>Location</option>
                            <option>Location</option>
                            <option>Location</option>
                            <option>Location</option>
                        </select>

                    </section>

                    <section className="searchcat">
                        <h2>Category:</h2>
                        {/* content */}
                        <section className="category_content">
                            <span>  <input type="checkbox" /> <label htmlFor="Java">Java</label> </span><span>4</span>
                        </section>
                        {/* content .. */}

                        {/* content */}
                        <section className="category_content">
                            <span>  <input type="checkbox" /> <label htmlFor="Java">C</label> </span><span>9</span>
                        </section>
                        {/* content .. */}

                        {/* content */}
                        <section className="category_content">
                            <span>  <input type="checkbox" /> <label htmlFor="Java">PHP</label> </span><span>4</span>
                        </section>
                        {/* content .. */}
                    </section>
                </section>
                {/* right details section */}
                <section className="search_data">
                    {/* first content
                    <section className="search_content">
                        <section className="search_logo">
                            <img src="https://kgo.googleusercontent.com/profile_vrt_raw_bytes_1587515358_10512.png" alt=""
                                className='image_search'
                                width='100px' />
                        </section>
                        <section className="search_details">
                            <section className="search_details_header">
                                <h5>Ai Developer</h5>
                                <h4 className='companyname'>Google</h4>
                            </section>
                            <section className="search_details_mid">

                                <span className="language">
                                    <MdWork /><span className='what_lang'> PHP</span>
                                </span>
                                <span className="location">
                                    <ImLocation /> <span className=' what_lang'>Ktm</span>
                                </span>
                                <span className="validatetill">
                                    <CiTimer /> <span className="what_lang">  100years left</span>
                                </span>
                            </section>
                            <section className="search_details_footer">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis culpa possimus voluptatibus quisquam ex cum ...</p>
                            </section>
                        </section>
                        <section className="applybtn">
                            <input type="button" value='Apply' />
                        </section>
                    </section>
                     */}
                    {
                        jobPost.map((data, id) => {
                            return <>
                                {/* first content */}
                                <section className="search_content" key={id}>
                                    <section className="search_logo">
                                        <img src={`${server}/uploads/logo/${data.logo}`} alt=""
                                            className='image_search'
                                            width='100px' />
                                    </section>
                                    <section className="search_details">
                                        <section className="search_details_header">
                                            <h5>{data.position}</h5>
                                            <h4 className='companyname'>{data.companyname}</h4>
                                        </section>
                                        <section className="search_details_mid">

                                            <span className="language">
                                                <MdWork /><span className='what_lang'> PHP</span>
                                            </span>
                                            <span className="location">
                                                <ImLocation /> <span className=' what_lang'>Ktm</span>
                                            </span>
                                            <span className="validatetill">
                                                <CiTimer /> <span className="what_lang">  100years left</span>
                                            </span>
                                        </section>
                                        <section className="search_details_footer">
                                            <p>{data.jobdescription} ...</p>
                                        </section>
                                    </section>
                                    <section className="applybtn">

                                        <Link className='applybtnlink' to={`../job-post-detail/${data._id}`}    > Apply </Link>
                                    </section>
                                </section>
                            </>
                        })
                    }
                </section>
            </section>
        </div>
    )
}

export default JobDetails
