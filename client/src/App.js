import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import { Routes, Route } from 'react-router-dom'
import Signup from './pages/CreateAccount/Signup';
import { useState } from 'react';
import { useEffect } from 'react';
import SignupCompany from './pages/CompanyAccount/SignupCompany';
import { server } from './config'
import { useDispatch, useSelector } from 'react-redux'
import { isLogin } from './redux/authSlice'
import { account } from './redux/accountSlice'
import Select from './pages/SelectAccount/Select'
import axios from 'axios';
import Job from './pages/Job/Job';
import Postajob from './pages/Post/Postajob';
import JobPostDetail from './pages/JobPostDetail/JobPostDetail'
import EmployerHome from './pages/EmployerHome/EmployerHome'
import ApplyJob from './pages/ApplyJob/ApplyJob';
import JobSeekerProfile from './pages/JobSeekerProfile/JobSeekerProfile'
import ChatList from './components/ChatList/ChatList';

function App() {
  // getting the user info from store
  const Account = useSelector(state => state.Account)
  const isAuth = useSelector(state => state.isLogin)

  const dispatch = useDispatch()

  // checking if the user is logged in or not
  useEffect(() => {

    async function checkLogin() {
      const token = localStorage.getItem('token')
      if (token) {
        await axios.post(`${server}/checklogin`, { token }
        ).then((data) => {
          console.log(data.data)
          dispatch(isLogin(data.data.isLogin))

          if (data.data.user) {
            dispatch(account(data.data.user.account))
          }
          else {
            dispatch(account('jobseeker'))
          }
        })
      }
      else {
        dispatch(isLogin(false))
      }
    }
    checkLogin()

  }, [])

  // checking if the user is logged in or not


  return (
    <>

      <section className="AppContainer">

        <Routes>
          {/* homepage */}
          <Route path='/:resume' />
          <Route path='/' element={
            (Account == 'employer') ? <EmployerHome /> : <Home isLogin={isAuth} />
          } />
          <Route path='/homepage' element={(Account == 'employer') ? <EmployerHome /> : <Home isLogin={isAuth} />} />
          {/* homepage here */}

          {/* accoutn selection when signup */}
          <Route path='/select_Account_Type' element={<Select />} />
          {/* accoutn selection when signup here*/}

          {/* all jobs route */}
          <Route path='/jobs' element={<Job />} />
          {/* all jbos route */}

          {/* login */}
          <Route path='/login' element={<Login />} />
          {/* login */}

          {/* signup for hobseeker */}
          <Route path='/new' element={<Signup />} />
          {/* signup for jobseeker here */}

          {/* signup for new employer */}
          <Route path='/newemployer' element={<SignupCompany />} />
          {/* signup for new employer  herer*/}

          <Route path='/post' element={(isAuth) ? <Postajob /> : <Login />} />

          <Route path='/job-post-detail/:id' element={<JobPostDetail />} />
          <Route path='/apply/:id' element={(isAuth == true) ? <ApplyJob /> : <Login />} />


          {/* routes for jobseeker profile */}
          <Route path='/jobseeker-profile' element={<JobSeekerProfile />} />
          <Route path='/chat' element={<ChatList />} />
        </Routes>




      </section>
    </>
  );
}

export default App;
