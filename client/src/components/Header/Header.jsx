import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'
import { FaSignInAlt } from 'react-icons/fa'
import { FaHandshake } from 'react-icons/fa'
import { FaBloggerB } from 'react-icons/fa'
import { RiLogoutCircleRLine } from 'react-icons/ri'
import { MdOutlineWork } from 'react-icons/md'
import { MdPermContactCalendar } from 'react-icons/md'
import { BsFillPersonFill } from 'react-icons/bs'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isLogin } from '../../redux/authSlice'

const Header = () => {

  const isLogin = useSelector(state => state.isLogin)
  const account = useSelector(state => state.account)

  const sendIslogin = useDispatch()

  const logout = () => {
    localStorage.removeItem('token')
    sendIslogin(isLogin(false))
  }


  return (
    <div className='header_container'>


      <Link to='/' className="header_logo">
        <h1 className='logo'>Bhandari <span className='logo_special'>Job.</span> </h1>
      </Link>

      <section className="header__menu">

        <Link className="link_row">
          <b><AiFillHome /></b> <Link className='linkheader'>Home</Link>
        </Link>

        <Link className="link_row">
          <b><FaHandshake /></b> <Link className='linkheader'>Services</Link>
        </Link>

        <Link className="link_row">
          <b><MdPermContactCalendar /></b> <Link className='linkheader'>Contact</Link>
        </Link>

        <Link className="link_row">
          <b><FaBloggerB /></b> <Link className='linkheader'>Blog</Link>
        </Link>

      </section>
      <section className="header_operator">
        {
          (!isLogin) ?
            <>

              <Link className="first" to='/login'>
                <span className='right_logo'><FaSignInAlt /></span>
                <span className='right_topic'>Login</span>

              </Link>
              <Link className="first" to='/select_Account_Type'>
                <span className='right_logo'><BsFillPersonFill /></span>
                <span className='right_topic'>Singup</span>

              </Link>
            </>
            :
            <>

              {
                (account == 'employer') 

                  ?
                  <Link to='/post' className="first">
                    <span className='right_logo'><MdOutlineWork /></span>
                    <span className='right_topic'>Post Job...</span>
                  </Link>
                  :

                  null
              }
            
              <Link to='/' className="first" onClick={
                logout

              }>
                <span className='right_logo'><RiLogoutCircleRLine /></span>
                <span className='right_topic'>Logout</span>

              </Link>
              <Link className="first">
                <span className='right_logo'><BsFillPersonFill /></span>
                <span className='right_topic'>Profile</span>

              </Link>
            </>
        }

      </section >

    </div >
  )
}

export default Header
