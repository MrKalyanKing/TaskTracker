import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../Context/Context";
import { useLocation } from "react-router-dom";

const FilterTask = () => {
  const url = useContext(AppContext);

  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState({
    title: "",
    status: "",
    priority: "",
  });


  const location = useLocation();

useEffect(() => {
  const query = new URLSearchParams(location.search);

  const title = query.get("title") || "";
  const status = query.get("status") || "";
  const priority = query.get("priority") || "";

  setFilters({
    title,
    status,
    priority
  });

  setPage(Number(query.get("page")) || 1);

}, [location.search]);

  // 🔹 Fetch tasks (initial + filtered)
  const fetchTasks = async () => {
    try {
       const query = new URLSearchParams({
    page,
    limit: 6,
    ...(filters.title && { title: filters.title }),
    ...(filters.status && { status: filters.status }),
    ...(filters.priority && { priority: filters.priority })
  }).toString();

 
  console.log("QUERY:", query);

      // console.log();
      
      const res = await axios.get(`${url}/filter?${query}`, {
        withCredentials: true,
      });

      setTasks(res.data.tasks || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // 🔹 Initial load + whenever filters/page change
  useEffect(() => {
    fetchTasks();
  }, [page, filters]);

  console.log(tasks);

  // 🔹 Handle filter changes
  const handleFilter = (type, value) => {
    setPage(1); // reset pagination
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* 🔹 FILTER BAR */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* SEARCH */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full bg-gray-100 p-2 rounded-md outline-none text-sm"
            name="title"
            value={filters.title}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
          />
        </div>

        {/* STATUS */}
        <div className="bg-white p-4 rounded-xl shadow-sm flex gap-2">
          {["", "todo", "in-progress", "done"].map((s) => (
            <button
              key={s}
              onClick={() => handleFilter("status", s)}
              className={`px-3 py-1 rounded-full text-sm cursor-pointer transition ${
                filters.status === s
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {s || "All"}
            </button>
          ))}
        </div>

        {/* PRIORITY */}
        <div className="bg-white p-4 rounded-xl shadow-sm flex gap-2">
          {["low", "medium", "high"].map((p) => (
            <button
              key={p}
              onClick={() => handleFilter("priority", p)}
              className={`px-3 py-1 rounded-full text-sm cursor-pointer transition ${
                filters.priority === p
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* 🔹 TASK LIST */}
      <div className="grid grid-cols-3 gap-4">
        {tasks.length > 0 ? (
          tasks.map((t) => (
            <div key={t._id} className="bg-white p-5 rounded-xl shadow-sm">
              {/* TAGS */}
              <div className="flex gap-2 mb-2">
                <span className="text-xs px-2 py-1 bg-blue-100 rounded">
                  {t.status}
                </span>
                <span className="text-xs px-2 py-1 bg-red-100 rounded">
                  {t.priority}
                </span>
              </div>

              <h2 className="font-semibold">{t.title}</h2>
              <p className="text-sm text-gray-500">{t.description}</p>

              {/* ACTIONS */}
              <div className="flex justify-between items-center mt-3">
                <p className="text-xs text-gray-400">
                  {new Date(t.dueDate).toDateString()}
                </p>

                <div className="flex gap-2">
                  <button className="text-blue-500 cursor-pointer">✏️</button>
                  <button className="text-red-500 cursor-pointer">🗑</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-3 text-center">No tasks found</p>
        )}
      </div>

      {/* 🔹 PAGINATION */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-1 rounded cursor-pointer transition ${
              page === p
                ? "bg-purple-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterTask;
