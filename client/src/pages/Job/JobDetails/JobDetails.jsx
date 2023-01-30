import { Link } from 'react-router-dom'
import React from 'react'
import './JobDetails.css'
import { MdWork } from 'react-icons/md'
import { ImLocation } from 'react-icons/im'
import { CiTimer } from 'react-icons/ci'
import { useEffect } from 'react'
import { server } from '../../../config'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useState } from 'react'

const JobDetails = () => {

    // const url = useLocati

    const [jobPost, setJobPost] = useState([])
    const searchInput = useSelector(state => state.search)
    useEffect(() => {


        // fetching all the post from sever accorgint to search key if store

        console.log(searchInput)
        if ((searchInput.location == '' && searchInput.keyword == '' && searchInput.category == '') || !(searchInput.keyword || searchInput.location || searchInput.category)) {
            async function postApi() {
                const posts = await axios.get(`${server}/api/jobpost`).then((response) => {
                    console.log(response)
                    setJobPost(response.data)
                })
            }
            postApi()
        }
        else {
            async function search() {
                const posts = await axios.post(`${server}/api/jobpost`, searchInput).then((response) => {

                    setJobPost(response.data)

                })
            }
            search()
        }
    }, [searchInput])
    // getting location of all the user so that to display in search
    const [location, setLocation] = useState([])
    useEffect(() => {
        async function getLocation() {
            const posts = await axios.get(`${server}/allemployer`).then((response) => {
                const locations = response.data.map((item, id) => {
                    return item.location
                })
                // removing the duplicated item from arr
                let new_locations = []
                for (let i = 0; i < location.length; i++) {
                    if (!new_locations.includes(locations[i])) {
                        new_locations = [...new_locations,location[i]]
                    }

                }
                console.log(new_locations)
                setLocation(locations)
            })
        }
        getLocation()
    }, [])

    return (
        <div className='search_details_container'>


            <section className="search_box">
                {/* left sesarch box */}
                <section className="search_items">
                    <section className="companyloation" name='location'>

                        <select name="" id="">

                            {
                                location.map((item, id) => {
                                    return <option value={item}>{item}</option>
                                })
                            }
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
                                    <section className="applysection">

                                        <Link className='applylink' to={`../job-post-detail/${data._id}`}    > Apply </Link>
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
