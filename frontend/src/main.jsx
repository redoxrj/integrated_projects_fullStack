import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  createRoutesFromElements
} from "react-router-dom";
import Home from './components/Home.jsx'
import Library from './components/Library.jsx'
import ReadBooks from './components/ReadBooks.jsx'
import MyUploadedBooks from './components/MyUploadedBooks.jsx'
import ApproveBooks from './components/ApproveBooks.jsx'
import { ToastContainer } from 'react-toastify';
import { store } from '../src/redux/store.js'
import { Provider } from 'react-redux'
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import Protected from './components/AuthLayout.jsx'

const router =createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App/>} >
    <Route path='' element={<Home/>} />
    <Route path='Signup' element={<Signup/>} />
    <Route path='Login' element={<Login/>} />

      {/* Protected routes */}
      <Route element={<Protected/>}>
    <Route path='ReadBooks' element={<ReadBooks/>} />
    <Route path='MyUploadedBooks' element={<MyUploadedBooks/>} />
    <Route path='ApproveBooks' element={<ApproveBooks/>} />
    </Route>

  </Route>
))

createRoot(document.getElementById('root')).render(
  <>
   <Provider store={store}>
    <RouterProvider router={router} />
     </Provider>
     <ToastContainer />
  </>
    
)
