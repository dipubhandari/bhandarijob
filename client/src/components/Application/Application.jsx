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
import { RxCross1 } from 'react-icons/rx'
import { useEffect } from 'react'
import axios, { Axios } from 'axios'
import { server } from '../../config'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FileDownload from "js-file-download"
import { saveAs } from 'file-saver'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { BiSelectMultiple } from 'react-icons/bi'
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

  const [rerender, setRender] = useState(0)


  const postId = useSelector(state => state.jobId)
  const token = localStorage.getItem('token')
  const [application, setApplication] = useState([])
  // getting the appication based on id of post and tokenin gh elocalstorage

  // alert confrim
  function Decision(id, action) {
    confirmAlert({
      title: `${action} Application`,
      message: `Are you sure to ${action} this application?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            async function de() {
              const del = await axios.post(`${server}/removeapplication`, { applicationid: id, action }).then((response) => {
                toast.success(response.data.success_msg)
                setRender(Math.random())
              })
            }

            de()
          }
        },
        {
          label: 'No'
        }
      ]
    });

  }
  // fetching the particular company detail


  useEffect(() => {
    console.log(postId)
    async function getApplication() {
      await axios.get(`${server}/application/${token}/${postId}`).then(response => {

        console.log(response.data)
        setApplication(response.data)
      })
    }
    getApplication()

  }, [rerender])

  return (
    <div>


      {
        (application.length == 0)
          ?
          <h6 className='noposthead'>No Application for this job post...</h6>
          :
          <table className='applicationtable'>
            <ToastContainer />

            <thead className='table_headings'>
              <tr><th>SN.</th>
                <th><BsFillPersonCheckFill className='dashboard-icon' />Name</th>
                <th><AiOutlineMail className='dashboard-icon' />Email</th>
                <th><AiFillPhone className='dashboard-icon' />Phone</th>
                <th>Resume.</th>  <th>Action</th><th>Status</th></tr>
            </thead>
            <tbody className='table_content'>
              {
                application.map((item, id) => {
                  return <tr className={((id % 2) == 0) ? 'grey-table' : 'light-table'} keys={id}>
                    <td>{id + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td className='download'><span>Download<HiDownload className='dashboard-icon' onClick={() => download(item._id)} /></span>
                    </td> <td ><AiFillDelete onClick={() => Decision(item._id, 'Delete')} className='dashboard-icon' /><BiSelectMultiple onClick={() => Decision(item._id, 'Sortlist')} />

                      <RxCross1 onClick={() => Decision(item._id, 'Reject')} /></td>
                    <td>{item.status}</td>
                  </tr>
                })
              }


            </tbody>
          </table>
      }

    </div >
  )
}

export default Application
