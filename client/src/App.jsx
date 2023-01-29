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



function App() {
  // getting the user info from store
  const Account = useSelector(state => state.Account)

  // const [isLogin, setIslogged] = useState(true)



  const dispatch = useDispatch()

  // checking if the user is logged in or not
  useEffect(() => {

    async function checkLogin() {
      const token = localStorage.getItem('token')
      if (token) {
        await axios.post(`${server}/checklogin`, { token }
        ).then((data) => {

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


    console.log((Account))
  }, [])

  // checking if the user is logged in or not


  return (
    <>

      <section className="AppContainer">

        <Routes>
          {/* homepage */}
          <Route path='/' element={
            <Home isLogin={isLogin} />
          } />
          <Route path='/homepage' element={(Account == 'jobseeker') ? <Home /> : <EmployerHome />} />
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
          <Route path='/newemploye' element={<SignupCompany />} />
          {/* signup for new employer  herer*/}



          {/* post a job */}


          <Route path='/post' element={<Postajob />} />

          {/* post a job */}


          {/* post a job */}


          <Route path='/job-post-detail/:id' element={<JobPostDetail />} />
          <Route path='/apply/:id' element={<ApplyJob/>} />

          {/* post a job */}
          {/* seasrch route */}
          {/* <Route path='/search' element={< />} /> */}
          {/* seasrch route */}

        </Routes>
      </section>
    </>
  );
}

export default App;
