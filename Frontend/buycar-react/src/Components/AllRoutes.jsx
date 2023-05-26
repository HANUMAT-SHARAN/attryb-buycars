import React from 'react'
import {Route, Routes} from "react-router-dom"
import Login from '../Pages/Login'
import Signup from '../Pages/Signup'
import AddDeal from '../Pages/AddDeal'
const AllRoutes = () => {
  return (
    <Routes>
      <Route element={<Login/>} path='/login'/>
      <Route element={<Signup/>} path='/signup'/>
      <Route element={<AddDeal/>} path='/adddeal'/>
    </Routes>
  )
}

export default AllRoutes
