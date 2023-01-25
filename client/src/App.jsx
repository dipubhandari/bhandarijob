import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import { Routes, Route } from 'react-router-dom'
import Signup from './pages/CreateAccount/Signup';
import { useState } from 'react';
import { useEffect } from 'react';
import SignupCompany from './pages/CompanyAccount/SignupCompany';
import { server } from './config'
import { useDispatch } from 'react-redux'
import { isLogin } from './redux/authSlice'

import { account } from './redux/accountSlice'
import Select from './pages/SelectAccount/Select'
import axios from 'axios';
import Search from './pages/Search/Search';
import Postajob from './pages/Post/Postajob';

function App() {

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
            dispatch(account('employer'))
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
          <Route path='/' element={
            <Home isLogin={isLogin} />
          } />
          <Route path='/homepage' element={<Home />} />
          {/* homepage here */}

          {/* accoutn selection when signup */}
          <Route path='/select_Account_Type' element={<Select />} />
          {/* accoutn selection when signup here*/}

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
          {/* seasrch route */}
          <Route path='/search' element={<Search />} />
          {/* seasrch route */}

        </Routes>
      </section>
    </>
  );
}

export default App;
