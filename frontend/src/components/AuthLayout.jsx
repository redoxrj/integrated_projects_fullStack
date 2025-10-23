import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import Loader from '../components/Loader'
import {Outlet, useNavigate} from 'react-router-dom'

function AuthLayout() {
    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)
    const [loading,setLoading] =useState(true)
    const navigate = useNavigate()

    useEffect(()=>{
        if(!isLoggedIn) navigate('/Login',{ replace: true }) //replace: true navigation (prevents unwanted back navigation)
        setLoading(false)

    },[isLoggedIn,navigate])

  return (

   <>
   {loading ?  <Loader/> : <Outlet/>} 
   </>
   
  )
}
//Outlet is nothing but within child compoenents jiske ander wrap kar rhey hongey

export default AuthLayout
