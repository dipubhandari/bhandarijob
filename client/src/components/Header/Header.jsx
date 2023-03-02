import React from 'react'
import './Header.css'
import { useNavigate, Link } from 'react-router-dom'
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
import { account } from '../../redux/accountSlice'
import { isLogin } from '../../redux/authSlice'
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Header = () => {

  const isUserLogin = useSelector(state => state.isLogin)
  const accountType = useSelector(state => state.Account)

  const [rerender, setRerender] = useState(0)
  const navigate = useNavigate()
  const dispatch = useDispatch()


  // alert confrim
  function logout(id) {
    confirmAlert({
      title: 'Log out',
      message: 'Are you sure to logout this account',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            logout = () => {
              setRerender(Math.random())
              navigate('/')
              toast.success('Logout Successfully...')
              localStorage.removeItem('token')
              dispatch(isLogin(false))
              dispatch(account('false'))
            }
            logout()
          }
        },
        {
          label: 'No'
        }
      ]
    });


  }

  return (
    <div className='header_container' style={{ backgroundColor: (accountType == 'employer') ? 'rgb(25, 30, 32)' : 'rgb(15, 15, 104)' }} >


      <Link to='/' className="header_logo">
        <h1 className='logo'>Bhandari <span className='logo_special'>Job.</span> </h1>
      </Link>

      <section className="header__menu">
        <ToastContainer />
        <Link to='/' className="link_row">
          <b><AiFillHome /></b> <Link className='linkheader'>Home</Link>
        </Link>

        <Link className="link_row">
          <b><MdPermContactCalendar /></b> <Link className='linkheader'>Contact</Link>
        </Link>



      </section>
      <section className="header_operator" style={{ backgroundColor: (accountType == 'employer') ? "grey" : 'rgb(73, 103, 191)' }}>
        {
          (!isUserLogin) ?
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
                (accountType == 'employer')

                  ?
                  <Link to='/post' className="first">
                    <span className='right_logo'><MdOutlineWork /></span>
                    <span className='right_topic'><b>Post Job...</b></span>
                  </Link>
                  :

                  null
              }

              <b style={{ backgroundColor: 'none', cursor: 'pointer' }}
                className="first" onClick={
                  logout

                }>
                <span className='right_logo'><RiLogoutCircleRLine /></span>
                <span className='right_topic'>Logout</span>

              </b>
              {
                (accountType == 'employer') ?
                  null
                  :
                  <Link to='/jobseeker-profile' className="first">
                    <span className='right_logo'><BsFillPersonFill /></span>
                    <span className='right_topic'><b>Menu</b></span>
                  </Link>
              }
            </>
        }

      </section >

    </div >
  )
}

export default Header
