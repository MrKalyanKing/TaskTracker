import React, { useState } from "react";
import TaskModal from "../Modals/TaskModal";


const CreateTask = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex w-full items-center h-30 justify-between bg-white px-6 py-5 rounded-xl shadow-sm">


        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Workspace Overview
          </h1>

          <p className="text-gray-500 mt-1 text-sm">
            Curating your creative flow. You have
            <span className="font-medium text-gray-700">
              4 high-priority tasks
            </span>
            requiring your attention today.
          </p>
        </div>


        <button
          onClick={() => setOpen(true)}
          className="flex items-center cursor-pointer h-9 gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-full shadow-md transition"
        >
          <span className="text-lg">+</span>
          <span className="font-medium">New Task</span>
        </button>
      </div>

      {/* Modal */}
      {open && <TaskModal onClose={() => setOpen(false)} />}
    </>
  );
};

export default CreateTask;