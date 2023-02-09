import { Link } from 'react-router-dom'
import React from 'react'
import './JobDetails.css'
import { MdWork } from 'react-icons/md'
import { ImLocation } from 'react-icons/im'
import { CiTimer } from 'react-icons/ci'
import { useEffect } from 'react'
import { server } from '../../../config'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { search } from '../../../redux/searchKeysSlice'

const JobDetails = (props) => {

    const dispatch = useDispatch()
    const [jobPost, setJobPost] = useState([])
    const searchInput = useSelector(state => state.search)
    const [searchInputTrack, setSearchInputTrack] = useState(0)
    let searching = searchInput
    const handleSearchInput = (e) => {
        if (e.target.name == 'skills') {
            const { checked, value } = e.target
            if (checked) {
                const skills = searching.skills
                if (skills === undefined) {
                    searching = { ...searching, skills: [value] }
                    dispatch(search(searching))
                    setSearchInputTrack(Math.random())

                }
                else {

                    searching = { ...searching, skills: [...skills, value] }
                    dispatch(search(searching))
                    setSearchInputTrack(Math.random())
                }
            }
            else {

                const skills = searching.skills?.filter((item, id) => {
                    return item != value
                })
                searching = { ...searching, skills: skills }
                dispatch(search(searching))
                setSearchInputTrack(Math.random())
            }
        }
        else {

            const name = e.target.name;
            const value = e.target.value
            dispatch(search(searching))
            searching = { ...searching, [name]: value }; dispatch(search(searching))
            setSearchInputTrack(Math.random())

        }

    }
    useEffect(() => {
        // fetching all the post from sever accorgint to search key if store
        if (!(searchInput.keyword || searchInput.location || searchInput.category || searchInput.skills)) {
            async function postApi() {
                const posts = await axios.get(`${server}/api/jobpost`).then((response) => {
                    setJobPost(response.data)
                    console.log(response.data)
                })
            }
            postApi()
        }
        else {

            console.log(searchInputTrack)

            async function search() {
                const posts = await axios.post(`${server}/api/jobpost`, searchInput).then((response) => {

                    setJobPost(response.data)
                })
            }
            search()
        }
    }, [props.isSearchClicked, searchInputTrack])
    // getting location of all the user so that to display in search
    const [location, setLocation] = useState([])
    const [skills, Setskills] = useState({})
    useEffect(() => {
        async function getLocation() {
            const posts = await axios.get(`${server}/allemployer`).then((response) => {
                const locations = response.data.map((item, id) => {
                    return item.location
                })
                // removing the duplicated item from arr
                let new_locations = new Set(locations)
                setLocation([...new_locations])
            })
        }
        getLocation()

        async function getSkills() {
            const posts = await axios.get(`${server}/api/jobpost`).then((response) => {
                let skills = []
                const skill = response.data.map((item, index) => {
                    skills = [...skills, ...item.skills]
                    return item.skills
                })
                let newskills = new Set(skills)
                newskills = [...newskills]
                // comparing skills and new skills to find number
                let skillsObj = {}

                for (let i = 0; i < skills.length; i++) {

                    if (skillsObj.hasOwnProperty(skills[i])) {

                        // const value = skillsObj.skills[i]
                        skillsObj = { ...skillsObj, [skills[i]]: skillsObj[skills[i]] + 1 }

                    }
                    else {
                        skillsObj = { ...skillsObj, [skills[i]]: 1 }
                    }
                }



                Setskills(skillsObj)
            })
        }
        getSkills()
    }, [])


    return (
        <div className='search_details_container'>


            <section className="search_box">
                {/* left sesarch box */}
                <section className="search_items">
                    {/* <section className="companyloation" name='sortby'>

                        <select name="location" id="" onChange={handleSearchInput}>
                            {
                                location.map((item, id) => {
                                    return <option value={item}>{item}</option>
                                })
                            }
                        </select>

                    </section> */}

                    <section className="searchcat">
                        <h2>Programing Languages:</h2>
                        {
                            Object.keys(skills).map((item, index) => {
                                return <section className="category_content">
                                    <span>  <input type="checkbox" value={`${item}`} name='skills' onChange={handleSearchInput} /> <label htmlFor="Java">{item}</label> </span><span>{skills[item]}</span>
                                </section>
                            })
                        }
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
                    {(jobPost.length > 0) ?

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
                                                <MdWork /><span className='what_lang'> {data.skills[0] || 'N/A'}</span>
                                            </span>
                                            <span className="location">
                                                <ImLocation /> <span className=' what_lang'>{data.address || 'N/A'}</span>
                                            </span>
                                            <span className="validatetill">
                                                <CiTimer /> <span className="what_lang"> {
                                                    data.applydate.split('T')[0]

                                                } ( Apply Before )</span>
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
                        :
                        <h1 className='notfound'>Data Not Found</h1>
                    }
                </section>
            </section>
        </div>
    )
}

export default JobDetails
