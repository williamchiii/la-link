import React from 'react'
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar.jsx'
import UrlShortener from '../components/UrlShortener.jsx'
import { useAuth } from '../lib/AuthContext.jsx'

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-[#101729]">
      <Navbar />
      <div></div>
      <div className="flex justify-center text-white text-[clamp(2rem,3vw,4rem)] pt-20 p-4">
        Hello, {user?.name}!
      </div>
      <UrlShortener />
      <div className="flex justify-center items-center text-white text-lg">
        Analytics Coming Soon...
      </div>
    </div>
  );
}

export default Dashboard