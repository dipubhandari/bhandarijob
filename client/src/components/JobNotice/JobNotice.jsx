import React from 'react'
import './Application.css'
import { Link, NavLink } from 'react-router-dom'
import { useEffect } from 'react'
import { server } from '../../config'
import { jobId } from '../../redux/jobIdSlice'
import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'



const JobApplicatoin = (props) => {

  const dispatch = useDispatch()
  //getting the job post posted by logged in user

  const [jobpost, setJobPost] = useState([])
  useEffect(() => {

    const user = localStorage.getItem('token')

    async function fetchJobPost() {

      await axios.get(`${server}/api/companyjobs/${user}`).then((response) => {
        console.log(response.data)
        setJobPost(response.data)
      })

    }
    fetchJobPost()
  }, [])

  function handleClick(id) {
    dispatch(jobId(id))

    props.handleJobComponent('application')

  }


  return (
    <section className="jobnotices">

      <div className='job_containers'>

        <section className="job_content">

          {
            jobpost.map((item, id) => {
              return < section className="job_Card_Employer" key={id}>
                <section className="company_logo">
                  <img src={`${server}/uploads/logo/${item.logo}`} alt="" />
                  <buton className='emp_view_btn'

                    onClick={() => handleClick(item._id)}
                  >View Application
                  </buton>
                  {/* <li className='jobtitle'>Post Date{item.createdAt }</li> */}
                </section>
                <section className="job_category">
                 
                  Category:  <b><span>{item.category}</span></b>
                  Postion: <b><span>{item.position}</span></b>
                  Post Date: <b><span>{item.createdAt.split('T')[0]}</span></b>

                </section>
                <section className='like'></section>
              </section>
            })
          }

          {/* 
          < section className="job_Card">
            <section className="company_logo">
            
              <NavLink className='view_btn'>Apply Now

              </NavLink>

            </section>
            <section className="job_category">
              <h6 className='name'></h6>
              <li className='jobtitle'></li>
              <li>Vacancy</li>

            </section>
            <section className='like'></section>
          </section> */}

        </section>

      </div >

    </section >
  )
}

export default JobApplicatoin
