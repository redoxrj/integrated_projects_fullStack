import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink,useLocation, useNavigate } from "react-router-dom"
import authService from '../BackendServices/auth'
import {toast} from 'react-toastify'
import {logout as logoutReducer } from '../redux/authSlice'

const Header=()=>{

    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)

      const location = useLocation();
      const navigate = useNavigate()
      const dispatch = useDispatch()

  const isLibraryActive =
    location.pathname.startsWith("/ReadBooks") ||
    location.pathname.startsWith("/MyUploadedBooks") ||
    location.pathname.startsWith("/ApproveBooks");
    const [loading,setLoading] =useState(false)

    const handleLogout=async()=>{
      try {
        setLoading(true)
        const result = await authService.logoutUser()
        console.log(result);
        dispatch(logoutReducer())
        toast.success(result?.flag_message)
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        navigate('/')
        
        
      } catch (error) {
        toast.error(error?.response?.data?.flag_message)
        throw error
        
        
      }
      finally{
        setLoading(false)
      }


    }
    return (
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Integrated Projects</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink  className={({isActive})=>`nav-link ${isActive ? 'text-warning' : 'text-white'}`} aria-current="page" to="/">Home</NavLink>
        </li>
        {!isLoggedIn ? <>
         <li className="nav-item">
          <NavLink  className={({isActive})=>`nav-link ${isActive ? 'text-warning' : 'text-white'}`} aria-current="page" to="/Signup">Signup</NavLink>
        </li>
        <li className="nav-item">
          <NavLink  className={({isActive})=>`nav-link ${isActive ? 'text-warning' : 'text-white'}`} aria-current="page" to="/Login">Login</NavLink>
        </li>
        </>
        : 
        <>
           <li className="nav-item dropdown">
          <a href="#" className={`nav-link dropdown-toggle ${isLibraryActive ? 'text-warning' : 'text-white'}`}  role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Library
          </a>
          <ul className="dropdown-menu">
            <li><NavLink className="dropdown-item" to="/ReadBooks">Read Books</NavLink></li>
            <li><NavLink className="dropdown-item" to="/MyUploadedBooks">My Uploaded Books</NavLink></li>
            <li><hr className="dropdown-divider"/></li>
            <li><NavLink className="dropdown-item" to="/ApproveBooks">Approve Books</NavLink></li>
          </ul>
        </li>
        <li className="nav-item">  <button type="button" className="btn btn-danger"  data-bs-toggle="modal" data-bs-target="#logoutModal">LogOut</button>  </li>
        </>
        }
       
  
      </ul>
     
    </div>
  </div>
</nav>

{/* logout button Modal/popup */}
 <div className="modal fade" id="logoutModal" tabIndex="-1" aria-labelledby="logoutModalLabel" >
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="logoutModalLabel">Logout</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        Are u sure you want to LogOut?
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hell No!</button>
        <button type="button" className="btn btn-primary" onClick={handleLogout} data-bs-dismiss="modal" disabled={loading}>Yes Boi!</button>
      </div>
    </div>
  </div>
</div>

        </>
    )
}

export default Header