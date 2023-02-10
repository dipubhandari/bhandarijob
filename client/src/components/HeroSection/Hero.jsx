import { useDispatch } from 'react-redux'
import React from 'react'
import './Hero.css'
import { ImFileText } from 'react-icons/im'
import { BiCategoryAlt, BiCurrentLocation } from 'react-icons/bi'
import { search } from '../../redux/searchKeysSlice';
import { useEffect } from 'react';
import { useState } from 'react'
import { server } from '../../config'
import axios from 'axios';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'



const JobApply = (props) => {

    const dispatch = useDispatch()

    // search input from store

    const searchInput = useSelector(state => state.search)


    const [searchKey, setSearchKey] = useState({})
    var handleSearchInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        setSearchKey({ ...searchKey, [name]: value })
    }

    const handleSubmit = (e) => {
        props.clickedOnSearch()
        dispatch(search({ ...searchInput, ...searchKey }));
    }
    // fetching the categories from server to display in search list
    const [location, setlocation] = useState([])
    const [categories, setCategories] = useState([])
    useEffect(() => {
        const categories = async function () {
            const api_cat = await axios.get(`${server}/api/categories`).then(response => {
                setCategories(response.data)
            })
        }
        categories()

        async function getLocation() {
            const posts = await axios.get(`${server}/allemployer`).then((response) => {
                const locations = response.data.map((item, id) => {
                    return item.address
                })
                // removing the duplicated item from arr
                let new_locations = new Set(locations)
                setlocation([...new_locations])
            })
        }
        getLocation()
    }, [])

    return (
        <>
            <section className="hero_container">

                <section className="search">

                    <h1 className='hero_slogan'>Find Your  <span className="hero_slogan_special">CARRER </span>Now</h1><br />

                    <section className="search_field">

                        <span className="keyword_input_logo"><ImFileText /></span>  <input type="text" name='keyword' onChange={handleSearchInput} className="input_field"

                            placeholder='  Enter the keyword' />

                        <span className="category_input_avatar"><BiCategoryAlt /></span>  <select
                            className='cate_type_hero'

                            name='category'
                            onChange={handleSearchInput}

                        >
                            <option value="none" selected disabled hidden>Select Job  Categories</option>
                            {
                                categories.map((data, id) => {
                                    return <>
                                        <option value={data.name}>{data.name}</option>
                                    </>
                                })
                            }

                        </select>
                        <span className="locaton_input_icon"><BiCurrentLocation /></span>   <select
                            className='cate_type_hero'

                            name='location'
                            onChange={handleSearchInput}

                        >
                            <option value="none" selected disabled hidden>Select Job Location</option>
                            {
                                location.map((data, id) => {
                                    return <>
                                        <option value={data}>{data}</option>
                                    </>
                                })
                            }

                        </select>


                        <Link to='/jobs' value='search' className="searchlink" onClick={handleSubmit} >Search</Link>
                    </section>

                </section>

            </section>
        </>

    )
}

export default JobApply
