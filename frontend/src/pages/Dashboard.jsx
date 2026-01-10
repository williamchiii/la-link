import React from 'react'
import toast from 'react-hot-toast'

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#101729] flex flex-col items-center py-20">
      <div className="text-white text-3xl"> Links Dashboard</div>
      <button className="btn btn-primary mt-3" onClick={() => toast.success("Clicked!")}>Test Button</button>
      
    </div>

  )
}

export default Dashboard