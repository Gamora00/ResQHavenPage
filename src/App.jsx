import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router";
import './App.css'
import Home from '../src/components/pages/user/home'
import SignUp from '../src/components/pages/user/SignUpForm'
import Login from '../src/components/pages/user/SignInForm'

import EvacuationCenter from './components/pages/admin/forms/EvacuationCenter';
import Hazard from './components/pages/admin/forms/hazard';

import AppLayout from './components/layout/AppLayout';
import ProtectedRoute from './authentication/procted';
import CheckIn from './components/pages/admin/forms/checkIn';
import AdminRegister from '../src/components/pages/admin/forms/SignUpForm'

import QrCode from '../src/components/pages/admin/forms/qrCheckIn';

import Check from './components/pages/admin/forms/check';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
          <Route path='/' element={
            <ProtectedRoute role={'user'}>
                           <Home/>
            </ProtectedRoute>
            
            }/>

          <Route path='/signUp' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
          
          <Route element={<AppLayout/>}>
          

          <Route path='/evacuation-reg' element={
            <ProtectedRoute role={'barangay_official'}>
                <EvacuationCenter/>
            </ProtectedRoute>}/>
            

           <Route path='/admin-reg' element={
            <ProtectedRoute role={'barangay_official'}>
                <AdminRegister/>
            </ProtectedRoute>}/>  

    
          <Route path='/hazard-reg' element={
            <ProtectedRoute role={'barangay_official'}>
                <Hazard/>
            </ProtectedRoute>}/>

            <Route path='/check-reg' element={
            <ProtectedRoute role={'barangay_official'}>
                <Check/>
            </ProtectedRoute>}/>

            <Route path='/qr-checkin' element={
            <ProtectedRoute role={'barangay_official'}>
                <QrCode/>
            </ProtectedRoute>}/>

          </Route>


      </Routes>
    </Router>
    </>
  )
}

export default App
