import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import { Routes, Route } from 'react-router-dom'
import Signup from './pages/CreateAccount/Signup';
import { useState } from 'react';
import { useEffect } from 'react';
import SignupCompany from './pages/CompanyAccount/SignupCompany'
import { server } from './config'
import { useDispatch } from 'react-redux'
import { isLogin } from './redux/authSlice'
import Select from './pages/SelectAccount/Select'

function App() {

  // const [isLogin, setIslogged] = useState(true)


  const dispatch = useDispatch()

  // checking if the user is logged in or not
  useEffect(() => {

    async function checkLogin() {
      const strignify_user = localStorage.getItem('token')
      if (strignify_user) {
        const user_detail = JSON.parse(strignify_user)

        await fetch(`${server}/checklogin`,
          {
            method: 'POST',
            body: JSON.stringify(user_detail),
            headers: {
              'Content-type': 'application/json'
            }
          }.then(result => result.json()).then(data => dispatch(isLogin(true)))
        )
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
          <Route path='/' element={
            <Home isLogin={isLogin} />
          } />
          {/* <Route path='/homepage' element={<Home />} /> */}
          <Route path='/select_Account_Type' element={<Select />} />
          <Route path='/login' element={<Login />} />
          <Route path='/new' element={<Signup />} />
          <Route path='/newemploye' element={<SignupCompany />} />
        </Routes>
      </section>
    </>
  );
}

export default App;
