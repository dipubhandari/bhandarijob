import React from 'react'
import './Application.css'
import { BsFillPersonCheckFill } from 'react-icons/bs'
import { GrView } from 'react-icons/gr'
import {  AiFillDelete } from 'react-icons/ai'
import { AiOutlineMail, AiFillPhone } from 'react-icons/ai'

import { HiDownload } from 'react-icons/hi'
import { RxResume } from 'react-icons/rx'

const Application = () => {
  return (
    <div>
      <table className='applicationtable'>
        <thead className='table_heading'>
          <tr><th>SN.</th>
            <th><BsFillPersonCheckFill className='dashboard-icon' />Name</th>
            <th><AiOutlineMail className='dashboard-icon' />Email</th>
            <th><AiFillPhone className='dashboard-icon' />Phone</th>
            <th><RxResume className='dashboard-icon' />Resume.</th>  <th>Action</th></tr>
        </thead>
        <tbody className='table_content'>
          <tr>
            <td>1.</td>
            <td>Dipu Bhandari</td>
            <td>dipu@gmail.com</td>
            <td>Dipu Bhandari</td>
            <td className='download'><span>Download<HiDownload className='dashboard-icon' /></span> 
              <span> View<GrView className='dashboard-icon' /></span></td>
          </tr>

          <tr className='grey-table'>
            <td>1.</td>
            <td>Dipu Bhandari</td>
            <td>dipu@gmail.com</td>
            <td>Dipu Bhandari</td>
            <td className='download'><span>Download<HiDownload className='dashboard-icon' /></span>
              <span> View<GrView className='dashboard-icon' /></span></td> <td><AiFillDelete className='dashboard-icon'/></td>
          </tr>

        </tbody>
      </table>
    </div>
  )
}

export default Application
