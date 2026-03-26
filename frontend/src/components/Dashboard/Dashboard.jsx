import React from 'react'

import Navbar from '../Navbar/Navbar'
import FilterTask from '../FIlteredTask/FilterTask'
import Sidebar from '../Sidebar/Sidebar'
import CreateTask from '../CreateTask/CreateTask'
// import CreateTask from './CreateTask'

const Dashboard = () => {
  return (
    <div className="h-screen flex flex-col">

      {/* Navabr */}
      <div className=''><Navbar /></div>



      {/* below navabr */}
      <div className=" mt-1 flex flex-1">

        {/* Sidebar */}
        <Sidebar />

        {/* main content */}
        <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">

          {/* workspace header */}
          <div className="flex justify-between items-center mb-6">
            <CreateTask />
          </div>

          {/* filter + task */}
          <FilterTask />

        </div>
      </div>
    </div>
  )
}

export default Dashboard