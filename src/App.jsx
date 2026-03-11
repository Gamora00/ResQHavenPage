import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router";
import './App.css'
import Home from '../src/components/pages/user/home'
import SignUp from '../src/components/pages/user/SignUpForm'
import Login from '../src/components/pages/user/SignInForm'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
          <Route path='/' element={<Home/>}/>

          <Route path='/signUp' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>

      </Routes>
    </Router>
    </>
  )
}

export default App
