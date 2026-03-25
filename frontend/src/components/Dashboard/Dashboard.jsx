import React from 'react'

import Navbar from '../Navbar/Navbar'
import FilterTask from '../FIlteredTask/FilterTask'
import Sidebar from '../Sidebar/Sidebar'
import CreateTask from '../CreateTask/CreateTask'
// import CreateTask from './CreateTask'

const Dashboard = () => {
  return (
    <div className="h-screen flex flex-col">

      {/* NAVBAR (FULL WIDTH) */}
      <Navbar />
      <hr />

      {/* BELOW NAVBAR */}
      <div className="flex flex-1">

        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN CONTENT */}
        <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">

          {/* WORKSPACE HEADER */}
          <div className="flex justify-between items-center mb-6">
            <CreateTask/>
          </div>

          {/* FILTER + TASKS */}
          <FilterTask />

        </div>
      </div>
    </div>
  )
}

export default Dashboard