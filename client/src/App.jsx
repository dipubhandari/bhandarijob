import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';

import { Routes, Route } from 'react-router-dom'
import Signup from './pages/CreateAccount/Signup';

function App() {


  return (
    <>

      <section className="AppContainer">

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/homepage' element={<Home />} />
          <Route path='/new' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </section>
    </>
  );
}

export default App;
