import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import authService from "../BackendServices/auth";

function Signup() {

    const[email,setEmail]= useState('')
    const[username,setUsername]= useState('')
    const[fullName,setFullName]= useState('')
    const[avatar,setAvatar]= useState(null)
    const[password,setPassword]= useState('')
    const [loading,setLoading]= useState(false)
    const fileRef =  useRef(null)
    const navigate = useNavigate()

    const handleSignup=async(e)=>{
        e.preventDefault()
        setLoading(true)
        // console.log(email);
        // console.log(username);
        // console.log(fullName);
        // console.log(avatar);
        // console.log(password);

        const data=new FormData()
        data.append("fullName",fullName)
        data.append("username",username)
        data.append("email",email)
        data.append("password",password)
        data.append("avatar",avatar)

        try {
          const result = await authService.createUser(data)
          // console.log("result",result);
          // console.log("2");
          setEmail('')
          setFullName('')
          setUsername('')
          setPassword('')
          if(fileRef.current) fileRef.current.value=null
          toast.success(result?.flag_message)
          navigate('/Login')
          
          
        } catch (error) {
          // console.log(error);
          // console.log(error?.response?.data);
          toast.error(error?.response?.data?.flag_message)
          // console.log("1");
          throw error
          
        }
        finally{
          setLoading(false)
        }
    }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4 rounded-4" style={{ width: "28rem" }}>
        <h2 className="text-center mb-4 fw-bold text-primary">Sign Up</h2>
        <form onSubmit={handleSignup} >
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label fw-semibold">
              Email Address  <span className="text-danger">*</span>
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

          {/* username */}
          <div className="mb-3">
            <label htmlFor="exampleInputUsername" className="form-label fw-semibold">
              username  <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control rounded-pill shadow-sm"
              id="exampleInputUsername"
              placeholder="Enter your username"
              required
              value={username}
              onChange={(e)=>setUsername(e.target.value)}

            />
          </div>
          {/* fullName */}
          <div className="mb-3">
            <label htmlFor="exampleInputFullName" className="form-label fw-semibold">
              Full Name  <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control rounded-pill shadow-sm"
              id="exampleInputFullName"
              placeholder="Enter your full Name"
              required
              value={fullName}
              onChange={(e)=>setFullName(e.target.value)}

            />
          </div>
          {/* Avatar */}
          <div className="mb-3">
            <label htmlFor="exampleInputAvatar" className="form-label fw-semibold">
              Avatar <span className="text-danger">*</span>
            </label>
            <input
              type="file"
              className="form-control rounded-pill shadow-sm"
              id="exampleInputAvatar"
              placeholder="Select Avatar"
              required
              // onChange={(e)=>setAvatar(e.target.value)} //file input’s string path
              onChange={(e)=>setAvatar(e.target.files[0])} //file object itself.
              accept="image/*"
              ref={fileRef}
 
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label fw-semibold">
              Password  <span className="text-danger">*</span>
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
            disabled ={loading}
          >
            Create Account
          
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Already have an account?{" "}
          <Link to="/Login" className="text-decoration-none text-primary fw-bold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
