import React from 'react'
import { Link, useNavigate } from 'react-router'
import { toast } from 'react-hot-toast'
import { googleLogout } from '@react-oauth/google';

const Navbar = () => {
  const navigate = useNavigate()
  function handleLogout(){
    googleLogout()
    toast('Logged Out', {icon: '👋'})
    navigate("/")
  }
  return (
  <div className="navbar bg-[#172340] shadow-sm">
      <div className="flex-1">
        <div className="text-white text-4xl font-bold italic ml-3">LaLink</div>
      </div>
        <button onClick={() => {handleLogout()}} className="btn text-blue text-md mr-4">Logout</button>
    </div>
  )
}

export default Navbar