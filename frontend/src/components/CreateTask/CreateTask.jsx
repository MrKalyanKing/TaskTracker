import React from "react";

const CreateTask = () => {
  return (
    <div className="flex justify-between gap-96">
      <div>
        <h1 className="font-bold text-3xl">Work Space Overview </h1>
        <p className="text-gray-500">You have 4 high-priority tasks today</p>
      </div>
      <div>
        <button className="bg-purple-600 text-white px-4 cursor-pointer py-2 rounded-md">
          + New Task
        </button>
      </div>
    </div>
  );
};

export default CreateTask;
