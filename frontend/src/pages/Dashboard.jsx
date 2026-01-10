import React from 'react'
import toast from 'react-hot-toast'

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center mt-9">
      <div className="text-white text-3xl"> Links Dashboard</div>
      <button className="btn btn-primary" onClick={() => toast.success("Clicked!")}>Test Button</button>
    </div>

  )
}

export default Dashboard