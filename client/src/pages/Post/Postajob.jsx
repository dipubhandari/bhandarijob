import axios from 'axios'; import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import './Post.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { IoIosAddCircle } from "react-icons/io";
import { server } from '../../../src/config';

const Postajob = () => {
    // state for cateogories
    const [categories, setCategories] = useState([])
    // count for skill in the form
    const [requirements, setRequirements] = useState([])
    const [skills, setSkills] = useState([])

    // state for input of the form

    const [input, setInput] = useState({})
    const [skill, setSkill] = useState({})
    const [requirement, setRequirement] = useState({}
    )

    // handle input from fields
    const handleInput = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    // handle skill input
    const handleSkill = (e) => {
        // setting the skills onanother variable
        setSkill({ ...skill, [e.target.name]: e.target.value })
        //   making the array of the skill 
        const i = Object.keys(skill).map((item, id) => {
            return skill[item]
        })
        // add array to the input field of skills
        setInput({ ...input, skill: i })
    }

    // handling the requirement
    const handleRequirement = (e) => {
        const value = e.target.value
        // set requrement in another variable
        setRequirement({ ...requirement, [e.target.name]: e.target.value })
        const i = Object.keys(requirement).map((item, id) => {
            return requirement[item]
        })
        // set requirement to input fields to array
        setInput({ ...input, req: i })
    }
    async function handleForm(e) {
        e.preventDefault()

        // validating the fields

        if (!(input.position && input.valid && input.vacancyfor && input.salary && input.category && input.education && input.description)) {
            toast.warn('Enter all the fields')
        }
        else if (input.description.length < 100) {
            toast.warn('Description should at least 100 characters')
        }
        else if (input.experience > 10) {
            toast.warn('Enter valid experience 1 to 10 years..')

        }

        else if (!input.vacancyfor < 10) {
            toast.warn('Enter valid vacancy 1 to 10 ')

        }
        else {

            await axios.post(`${server}/post`, input).then(response => {
                console.log(response.data)
                if (response.data.success) {
                    toast.success('You Posted a Job')
                }
            })
        }
    }

    // fetching the categories from server
    useEffect(() => {

        const categories = async function () {

            const api_cat = await axios.get(`${server}/api/categories`).then(response => {


                setCategories(response.data)

            })

        }

        categories()

    }, [])

    return (

        <>
            <Header />
            <ToastContainer />
            <div className='post_container'>

                <section className="formx">
                    <h4>Post A job</h4>
                    <hr />
                    <form encType='multipart/form-data' onSubmit={handleForm} action="" className='login_form'>
                        <span className=" form_email">
                            <span className="form_fullname">
                                <label htmlFor="">Enter Job Postion * </label>
                                <input
                                    type="text"
                                    onChange={handleInput}
                                    name='position'
                                    value={input.position || ''}
                                    placeholder=' Enter the Position'
                                />
                            </span>

                            <span className='phone'>
                                <span>Last Date to Apply*</span>
                                <input
                                    type="date"
                                    name='valid'
                                    onChange={handleInput}
                                    className='companylogo'
                                />

                            </span>
                        </span>
                        <span className="form_email">
                            <span className='email'>
                                <span>Vacany*</span>
                                <input
                                    type="text"
                                    name='vacancyfor'
                                    value={input.vacancyfor || ''}
                                    onChange={handleInput}
                                    placeholder='Enter No of Vacancy'
                                />
                            </span>

                            <span className='phone'>
                                <span>Offer Salary</span>

                                <input
                                    type="number"
                                    value={input.salary || ''}
                                    onChange={handleInput}
                                    name='salary'
                                    placeholder='Leave if salary negotiable'
                                />

                            </span>
                        </span>
                        <span className="form_email">
                            <span className='email'>
                                <span>Experience*</span><br />
                                <input
                                    type="number"
                                    placeholder='Expected Experience (in years)'

                                    onChange={handleInput}
                                    name='experience'
                                    value={input.experience || ''}
                                />
                            </span>


                        </span>

                        <section className="category_section">
                            <label htmlFor="">Select Category</label>
                            <select name='category' id='' onChange={handleInput}>
                                {
                                    categories.map((item, id) => {
                                        return <option value={`${item.name}`}>{item.name}</option>
                                    })
                                }


                            </select>
                        </section>

                        <section className="category_section">
                            <label htmlFor="">Prefered Education</label>
                            <select onChange={handleInput}
                                name='education' id=''>
                                <option value='none'>No Education Required</option>
                                <option value='Bachelor'>Bachelor</option>
                                <option value='Master'>Master</option>




                            </select>
                        </section>
                        <br />
                        <textarea name="description" className='description_post' id="" cols="10" placeholder=' Short Job Description.' rows="10" value={input.description || ''}
                            onChange={handleInput}></textarea>


                        <section className="addhunar">
                            <span className="add_icon" onClick={() => setSkills([...skills, Math.floor(Math.random * 10000)])}><IoIosAddCircle /> Add Skills</span>
                            <br />
                            {
                                skills.map((item, id) => {
                                    return <>
                                        <input name={`skill${id}`} placeholder={`Enter the ${'s'} skill`} className='skillinput' onChange={handleSkill} />
                                        <br />
                                    </>
                                })
                            }
                        </section>


                        <section className="addhunar">
                            <span className="add_icon" onClick={() => setRequirements([...requirements, Math.floor(Math.random * 10000)])}><IoIosAddCircle /> Add Requirements</span>
                            <br />
                            {
                                requirements.map((item, id) => {
                                    return <>
                                        <input name={`requirements${id}`}
                                            onChange={handleRequirement} placeholder={`Enter the new requirements`} className='skillinput' />
                                        <br />
                                    </>
                                })
                            }
                        </section>


                        <input
                            type='submit'
                            value='Create' className='create_btn'
                        />
                    </form>
                </section>
            </div>
        </>
    )
}

export default Postajob
