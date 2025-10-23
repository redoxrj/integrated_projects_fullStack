import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link,useNavigate  } from "react-router-dom";
import {toast} from 'react-toastify'
import authService from "../BackendServices/auth";
import { login as loginReducer  } from "../redux/authSlice";


function Login() {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin=async(e)=>{
    e.preventDefault()
    setLoading(true)
    // console.log(email);
    // console.log(password);
    const data={
      email,
      password
    }

    try {
      const result =  await authService.loginUser(data)
      // console.log(result);
      const payload= {
        userData : result?.data
      }
      dispatch(loginReducer(payload)) //dispacth ke dwwara loginReducer func call krwaya jo state update kar rha hai reduc store m
      setEmail('')
      setPassword('')
      localStorage.setItem('accessToken',result?.data?.accessToken)
      localStorage.setItem('refreshToken',result?.data?.refreshToken)
      toast.success(result?.flag_message)
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
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4 rounded-4" style={{ width: "28rem" }}>
        <h2 className="text-center mb-4 fw-bold text-primary">Login</h2>
        <form onSubmit={handleLogin} >
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label fw-semibold">
              Email Address
            </label>
            <input
              type="email"
              className="form-control rounded-pill shadow-sm"
              id="exampleInputEmail1"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <div id="emailHelp" className="form-text">
              We’ll never share your email with anyone else.
            </div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-pill shadow-sm"
              id="exampleInputPassword1"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e)=>setPassword(e.target.value)}

            />
          </div>


          {/* Button */}
          <button
            type="submit"
            className="btn btn-primary w-100 rounded-pill fw-semibold shadow"
            disabled={loading}
          >
            Login
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Don't have an account?{" "}
          <Link to="/signup" className="text-decoration-none text-primary fw-bold">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
