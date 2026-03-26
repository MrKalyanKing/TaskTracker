import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import TaskModal from "../Modals/TaskModal";
import { BookmarkCheck, SquarePen, Trash } from 'lucide-react';
import { AppContext } from "../Context/Context";

const FilterTask = () => {
  const [task, setTask] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedtask, setSelectedtask] = useState(null)
  const [open, setOpen] = useState(false)

  const [filters, setFilters] = useState({
    title: "",
    status: "",
    priority: ""
  });

  const { url } = useContext(AppContext)


  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${url}/filter`, {
        params: {
          page,
          limit: 6,
          title: filters.title,
          status: filters.status,
          priority: filters.priority
        },
        withCredentials: true
      });

      setTask(res.data.tasks);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };


  //Deleting the Task

  const deleteTask = async (task) => {
    try {
      const res = await axios.delete(`${url}/task/delete/${task._id}`, {
        withCredentials: true
      })
      console.log("data deleted", res.data)
    } catch (err) {
      console.log(err.response?.data || err.message)
    }
  }

  //Marking the task as complete API
  const stat = { status: "done" }
  const MarkComplete = async (task) => {
    try {
      const res = await axios.patch(`${url}/task/update/${task._id}`, stat,
        {
          withCredentials: true
        }
      )
    } catch (err) {
      console.log(err.response?.data || err.message)
    }
  }

  useEffect(() => {
    fetchTasks();
  }, [page, filters]);


  const handleFilter = (type, value) => {
    setPage(1);
    setFilters({ ...filters, [type]: value });
  };


  const handleEdit = (task) => {
    setSelectedtask(task)
    setOpen(true)


  }
  console.log(selectedtask)

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Filter Bar */}
      <div className="grid grid-cols-3 gap-4 mb-5">

        {/* Search */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <input
            type="text"
            placeholder="Search..."

            className="w-full bg-gray-100 p-2 rounded-md outline-none text-sm"
            onChange={(e) =>
              setFilters({ ...filters, title: e.target.value })
            }
          />
        </div>

        {/* Status */}
        <div className="bg-white p-4 rounded-xl shadow-sm flex gap-2">
          {["", "todo", "in-progress", "done"].map((s) => (
            <button
              key={s}
              onClick={() => handleFilter("status", s)}
              className={`px-3 py-1 rounded-full text-[12px] cursor-pointer ${filters.status === s
                ? "bg-purple-600 text-white"
                : "bg-gray-100"
                }`}
            >
              {s || "All"}
            </button>
          ))}
        </div>

        {/* Priority */}
        <div className="bg-white p-4 rounded-xl shadow-sm flex gap-2">
          {["low", "medium", "high"].map((p) => (
            <button
              key={p}
              onClick={() => handleFilter("priority", p)}
              className={`px-3 py-1 rounded-full text-[12px] cursor-pointer ${filters.priority === p
                ? "bg-purple-600 text-white"
                : "bg-gray-100"
                }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Task list */}
      <div className="grid grid-cols-3 gap-4">
        {task.map((t) => {
          const isDone = t.status === 'done'
          return (
            <div key={t._id} className="bg-white p-5 rounded-xl shadow-sm">

              {/* Tags */}
              <div className="flex gap-2 mb-2">
                <span className="text-xs px-2 py-1 bg-blue-100 rounded">
                  {t.status}
                </span>
                <span className="text-xs px-2 py-1 bg-red-100 rounded">
                  {t.priority}
                </span>
              </div>

              <h2
                className={`font-semibold 
              ${isDone ? "line-through text-gray-500" : ""}`}
              >
                {t.title}
              </h2>
              <p className="text-sm text-gray-500">{t.description}</p>

              {/* Action */}
              <div className="flex justify-between items-center mt-3">
                <p className="text-xs text-gray-400">
                  {new Date(t.dueDate).toDateString()}
                </p>

                <div className="flex gap-2">
                  {/* Edit */}

                  {!isDone ? <button onClick={() => handleEdit(t)} className="text-blue-500 cursor-pointer"><SquarePen /></button> : ""}

                  {/* Delete */}
                  {!isDone ? <button onClick={() => { deleteTask(t) }} className="text-red-500 cursor-pointer"><Trash /></button> : ""}
                  {/* Marks As Complete */}
                  {!isDone ? <button onClick={() => { MarkComplete(t) }} className=" bg-blue-800 w-20 rounded-md cursor-pointer flex text-white h-7 items-center justify-center text-sm"> <BookmarkCheck /> Mark</button> : ""}
                </div>
              </div>
            </div>
          )
        })}

      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-1 rounded cursor-pointer ${page === p
              ? "bg-purple-600 text-white"
              : "bg-gray-200"
              }`}
          >
            {p}
          </button>
        ))}
      </div>
      {open && (
        <TaskModal
          onClose={() => {
            setOpen(false)
            setSelectedtask(null)
          }}
          task={selectedtask}
        />
      )}
    </div>
  );
};

export default FilterTask;