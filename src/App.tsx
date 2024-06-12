import React, { Component } from 'react'
import Local from './Component/Local'
import Json from './Component/Json'
import Stringify from './Component/Stringify'
import Toast from './Component/Toast'
import LoginPage from './Component/LoginPage'
import {  Link, Route, Routes } from 'react-router-dom'
import SignUp from './Component/SignPage'
import ForgetPassword from './Component/ForgetPassword'




export default class App extends Component {
  render() {
    return (
      <div >
        {/* <Local/>
        <Json/>
        <Stringify/> */}
        {/* <Toast/> */}
       <ul style={{display:'flex', justifyContent:'space-evenly'}}>
      <li >
        <Link to='/loginpage'>LOGINPAGE</Link></li>
        <li> <Link to='/signpage'>SIGNUP</Link></li>
        {/* <li><Link to='/forgetpassword'>Forget password</Link></li> */}
       
        </ul>
        <Routes>
          <Route path='/loginpage' element={<LoginPage/>}/>
          <Route path='/signpage' element={<SignUp/>}/>
          {/* <Route path='/forgetpassword' element={<ForgetPassword/>}/> */}
        </Routes>
      </div>
    )
  }
}

