import axios from "axios";
import React, { useContext, useState } from "react";
import { AppContext } from "../Context/Context";
import { useEffect } from "react";

const TaskModal = ({ onClose, task }) => {

  const url = useContext(AppContext)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "in-Progress",
    priority: "high",
    dueDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (task) {

        const res = await axios.patch(
          `${url}/task/update/${task._id}`,
          formData,
          { withCredentials: true }
        );
        console.log("Updated:", res.data);
      } else {

        const res = await axios.post(
          `${url}/task/create`,
          formData,
          { withCredentials: true }
        );
        console.log("Created:", res.data);
      }
    } catch (err) {
      console.log(err.message);
    }

    onClose();
  };

  //Fetching the data from DB for Update
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "todo",
        priority: task.priority || "high",
        dueDate: task.dueDate?.split("T")[0] || "",

      })
    }
  }, [task])

  console.log(formData)

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      {/* MODAL BOX */}
      <div className="bg-white w-[400px] rounded-xl p-6 shadow-lg">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Task Details</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* TITLE */}
          <div>
            <label className="text-xs text-gray-500">TASK TITLE</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-gray-100 p-2 rounded-md mt-1"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-xs text-gray-500">DESCRIPTION</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-gray-100 p-2 rounded-md mt-1"
            />
          </div>

          {/* STATUS + PRIORITY */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500">STATUS</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-gray-100 p-2 rounded-md mt-1"
              >
                <option>todo</option>
                <option>in-progress</option>
                <option>done</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-500">PRIORITY</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full bg-gray-100 p-2 rounded-md mt-1"
              >
                <option>low</option>
                <option>medium</option>
                <option>high</option>
              </select>
            </div>
          </div>

          {/* DATE */}
          <div>
            <label className="text-xs text-gray-500">DUE DATE</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full bg-gray-100 p-2 rounded-md mt-1"
            />
          </div>

          {/* ACTIONS */}
          <div className="flex justify-between items-center mt-4">
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded-md w-full"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-4 text-gray-500"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default TaskModal;