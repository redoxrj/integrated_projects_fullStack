import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import {Outlet} from 'react-router-dom'
import authService from './BackendServices/auth'
import Loader from './components/Loader'
import {login as loginReducer} from './redux/authSlice'
import { useDispatch } from 'react-redux'


function App() {

  // hmarri web app open hotey hai hi saari intiial details check kar li like ki kya user logged in hai and etc. taaki baad mein har compoenets ko pta chla jaayge store se and act accrdingly
  const [loading,setLoading]=useState(true)
  const dispatch = useDispatch()

  const getCurrentUser = async()=>{ // app open hotey hi user ka status lelo login hai ya nhi taaki page refresh krney par logged in user reset na  ho jaaye
    try {
      const user =  await authService.getCurrentUser()
      // console.log(user); // even though hum library ka page open krein /refersh krein ye app.jsx ka saara code chlega jrror
      const payload ={
        userData : user?.data
      }
      dispatch(loginReducer(payload))
      
    } catch (error) {
      throw error
      
    }
    finally{
      setLoading(false)
    }

  }

  useEffect(()=>{
    getCurrentUser()

  },[]) //Runs only once after the component mounts



  return (
    <>
    {loading ? <Loader/> : 
    <>
      <Header/>
    <Outlet/>
    </>
  
    }
    
    </>
  )
}

export default App
