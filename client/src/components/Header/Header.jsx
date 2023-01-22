import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'
import { FaSignInAlt } from 'react-icons/fa'
import { FaHandshake } from 'react-icons/fa'
import { FaBloggerB } from 'react-icons/fa'
import { MdOutlineWork } from 'react-icons/md'
import { MdPermContactCalendar } from 'react-icons/md'
import { BsFillPersonFill } from 'react-icons/bs'

const Header = () => {
  return (
    <div className='header_container'>


      <section className="header_logo">
        <h1 className='logo'>Bhandari <span className='logo_special'>Job.</span> </h1>
      </section>

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

        <div className="first">
          <span className='right_logo'><MdOutlineWork /></span>
          <span className='right_topic'>Post Job Free</span>
        </div>
        <div className="first">
          <span className='right_logo'><FaSignInAlt /></span>
          <span className='right_topic'>Login</span>

        </div>
        <div className="first">
          <span className='right_logo'><BsFillPersonFill /></span>
          <span className='right_topic'>Singup</span>

        </div>

      </section >

    </div >
  )
}

export default Header
