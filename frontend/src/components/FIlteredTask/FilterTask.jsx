import React from 'react'

const FilterTask = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* FILTER BAR */}
      <div className="grid grid-cols-3 gap-4 mb-6">

        {/* SEARCH */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-xs text-gray-400 mb-2">SEARCH TITLE</p>
          <input
            type="text"
            placeholder="Filter by keywords..."
            className="w-full bg-gray-100 p-2 rounded-md outline-none text-sm"
          />
        </div>

        {/* STATUS */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-xs text-gray-400 mb-2">STATUS</p>
          <div className="flex gap-2">
            <button className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">All</button>
            <button className="bg-gray-100 px-3 py-1 rounded-full text-sm">Todo</button>
            <button className="bg-gray-100 px-3 py-1 rounded-full text-sm">In Progress</button>
            <button className="bg-gray-100 px-3 py-1 rounded-full text-sm">Done</button>
          </div>
        </div>

        {/* PRIORITY */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-xs text-gray-400 mb-2">PRIORITY</p>
          <div className="flex gap-2">
            <button className="bg-gray-100 px-3 py-1 rounded-full text-sm">Low</button>
            <button className="bg-gray-100 px-3 py-1 rounded-full text-sm">Medium</button>
            <button className="bg-gray-100 px-3 py-1 rounded-full text-sm">High</button>
          </div>
        </div>
      </div>

      {/* TASK CARDS */}
      <div className="grid grid-cols-3 gap-4">

        {/* BIG CARD */}
        <div className="col-span-2 bg-white p-6 rounded-xl shadow-sm">
          <div className="flex gap-2 mb-3">
            <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
              IN PROGRESS
            </span>
            <span className="bg-red-100 text-red-500 text-xs px-2 py-1 rounded-full">
              HIGH PRIORITY
            </span>
          </div>

          <h2 className="font-semibold text-lg mb-2">
            System Architecture Overhaul
          </h2>

          <p className="text-gray-500 text-sm mb-4">
            Redesigning the core data pipeline for improved latency and modular components.
          </p>

          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-400">Oct 24, 2023</p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm">
              Mark Complete
            </button>
          </div>
        </div>       
        
      </div>
    </div>
  )
}

export default FilterTask