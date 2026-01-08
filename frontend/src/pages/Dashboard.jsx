import React from 'react'
import toast from 'react-hot-toast'

const Dashboard = () => {
  return (
    <div>
      <div className="text-red-500 text-center" >Dashboard</div>
      <button className="btn btn-primary" onClick={() => toast.success("Clicked!")}>Test Button</button>
    </div>

  )
}

export default Dashboard