import React, { useState } from "react";
import TaskModal from "../Modals/TaskModal";


const CreateTask = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center gap-50">
        <div>
          <h1 className="font-bold text-3xl">Workspace Overview</h1>
          <p className="text-gray-500">
            You have 4 high-priority tasks today
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-md"
        >
          + New Task
        </button>
      </div>

      {/* MODAL */}
      {open && <TaskModal onClose={() => setOpen(false)} />}
    </>
  );
};

export default CreateTask;