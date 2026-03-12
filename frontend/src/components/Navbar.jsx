import React from 'react'
import { Link, useNavigate } from 'react-router'
import { toast } from 'react-hot-toast'
import { googleLogout } from '@react-oauth/google';
import { useAuth } from '../lib/AuthContext.jsx';

const Navbar = () => {
  const navigate = useNavigate()
  const { setUser } = useAuth()
  function handleLogout(){
    googleLogout()
    setUser(null)
    toast('Logged Out', {icon: '👋'})
    navigate("/")
  }
  return (
  <div className="navbar bg-[#172340] shadow-sm">
      <div className="flex-1">
        <Link to="/" className="text-white text-4xl font-bold italic ml-3"> 
        LaLink
        </Link>
      </div>
        <button onClick={() => {handleLogout()}} className="btn rounded-full join-item mr-5 text-md transform transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-lg">Logout</button>
    </div>
  )
}

export default Navbar