import React from 'react'
import './Application.css'
import { Link, NavLink } from 'react-router-dom'
import { useEffect } from 'react'
import { server } from '../../config'
import { jobId } from '../../redux/jobIdSlice'
import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AiFillDelete } from 'react-icons/ai'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const JobApplicatoin = (props) => {

  const dispatch = useDispatch()
  const [isDeleted,setIsdeleted] = useState(0)
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
  }, [isDeleted])

  function handleClick(id) {
    dispatch(jobId(id))

    props.handleJobComponent('application')

  }

  // delete postlogic
  function deletePost(jobId) {
    const jobid = jobId
    confirmAlert({
      title: 'Delete Post',
      message: 'Are you sure delete this job post',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            //    when user clieck yes button
            await axios.delete(`${server}/delete-post/${jobid}`).then((response) => {
              if (response.data.success_msg) {
                toast.success(response.data.success_msg)
                setIsdeleted(Math.random())
              }
              if (response.data.error_msg) {
                toast.success(response.data.error_msg)
              }
            }).catch((errps) => {
              console.log(errps)
            })

          }
        },
        {
          label: 'No'
        }
      ]
    });

  }




  return (
    <section className="jobnotices">
      <ToastContainer />
      <div className='job_containers'>

        <section className="job_content">

          {
            (jobpost.length > 0) ?
              jobpost.map((item, id) => {
                return < section className="job_Card_Employer" key={id}>
                  <span className='deleteicon' onClick={() => deletePost(item._id)}><AiFillDelete /></span>
                  <section className="company_logo">
                    <img src={`${server}/uploads/logo/${item.logo}`} alt="" />
                    <buton className='emp_view_btn'

                      onClick={() => handleClick(item._id)}
                    >View Application
                    </buton>
                    {/* <li className='jobtitle'>Post Date{item.createdAt }</li> */}
                  </section>
                  <section className="job_categoryemployer">

                    Category:  <b><span>{item.category}</span></b>
                    Postion: <b><span>{item.position}</span></b>
                    Post Date: <b><span>{item.createdAt.split('T')[0]}</span></b>

                  </section>
                  <section className='like'></section>
                </section>
              })
              :
              <h6 className='noposthead'>You Donot post a Job Till Now...</h6>
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
