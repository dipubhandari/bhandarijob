import React from 'react'
import { useState } from 'react'
import './Application.css'
import { BsFillPersonCheckFill } from 'react-icons/bs'
import { GrView } from 'react-icons/gr'
import { AiFillDelete } from 'react-icons/ai'
import { AiOutlineMail, AiFillPhone } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { HiDownload } from 'react-icons/hi'
import { RxResume } from 'react-icons/rx'
import { useEffect } from 'react'
import axios, { Axios } from 'axios'
import { server } from '../../config'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FileDownload from "js-file-download"
import { saveAs } from 'file-saver'

const Application = () => {


  // download the resume
  const download = async (id) => {

    // requiest ofr download
    await axios(
      {
        url: `${server}/download/${id}`,
        method: "GET",
        responseType: 'blob',
        headers: {
          Accept: 'application/pdf',
        },
      }).then((response) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(response.data);
        // Setting various property values
        let alink = document.createElement('a');
        alink.href = fileURL;
        alink.download = 'resume.pdf';
        alink.click();

        // const file = window.URL.createObjectURL(new Blob([response.data])); 
        // window.open(response.data);
      })


  }

  const postId = useSelector(state => state.jobId)
  const token = localStorage.getItem('token')
  const [application, setApplication] = useState([])
  // getting the appication based on id of post and tokenin gh elocalstorage



  async function de(e) {
    const id = e
    console.log(id)
    const del = await axios.post(`${server}/removeapplication`, { applicationid: id }).then((response) => {
      toast.alert(response.data.success)
    })
  }


  useEffect(() => {
    console.log(postId)
    async function getApplication() {
      await axios.get(`${server}/application/${token}/${postId}`).then(response => {


        console.log(response.data)
        setApplication(response.data)
      })
    }
    getApplication()
  }, [])

  return (
    <div>


      {
        (application.length == 0)
          ?
          <h6 className='noposthead'>No Application for this job post...</h6>
          :
          <table className='applicationtable'>
            <ToastContainer />

            <thead className='table_heading'>
              <tr><th>SN.</th>
                <th><BsFillPersonCheckFill className='dashboard-icon' />Name</th>
                <th><AiOutlineMail className='dashboard-icon' />Email</th>
                <th><AiFillPhone className='dashboard-icon' />Phone</th>
                <th>Resume.</th>  <th>Action</th></tr>
            </thead>
            <tbody className='table_content'>
              {
                application.map((item, id) => {
                  return <tr className='grey-table' keys={id}>
                    <td>{id + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td className='download'><span>Download<HiDownload className='dashboard-icon' onClick={() => download(item._id)} /></span>
                    </td> <td onClick={() => de(item._id)}><AiFillDelete className='dashboard-icon' /></td>
                  </tr>
                })
              }


            </tbody>
          </table>
      }

    </div>
  )
}

export default Application
