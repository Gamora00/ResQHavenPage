import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router";
import './App.css'
import Home from '../src/components/pages/user/home'
import SignUp from '../src/components/pages/user/SignUpForm'
import Login from '../src/components/pages/user/SignInForm'

import EvacuationCenter from './components/pages/admin/forms/EvacuationCenter';
import Hazard from './components/pages/admin/forms/hazard';

import AppLayout from './components/layout/AppLayout';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
          <Route path='/' element={<Home/>}/>

          <Route path='/signUp' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
          
          <Route element={<AppLayout/>}>
          

          <Route path='/evacuation-reg' element={<EvacuationCenter/>}/>
          <Route path='/hazard-reg' element={<Hazard/>}/>

          </Route>


      </Routes>
    </Router>
    </>
  )
}

export default App
