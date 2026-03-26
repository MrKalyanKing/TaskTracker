import { useState } from "react"
import {
  LayoutDashboard,
  BarChart,
  Folder,
  CheckSquare,
  Menu
} from "lucide-react"
import TaskModal from "../Modals/TaskModal";
import { Link } from "react-router-dom"

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`${collapsed ? "w-[80px] flex flex-col items-center" : "w-[250px]"
        } bg-pink-50 rounded-xl shadow-xl  p-4 transition-all duration-300 `}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="mb-6"
      >
        <Menu />
      </button>

      {/* Title */}
      {!collapsed && (
        <h1 className="font-bold mb-6">The TaskTracker</h1>
      )}

      {/* Menu */}
      <ul className="space-y-4 text-gray-600">

        <li className=" flex items-center gap-3  p-2 rounded-md cursor-pointer bg-purple-100 text-purple-600 hover:bg-purple-100 hover:text-purple-600">
          <LayoutDashboard size={18} />
          {!collapsed && <span>Dashboard</span>}
        </li>
        {/* <Link to="/analytics">  */}
        <li className="flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-purple-100 hover:text-purple-600">
          <Link className="flex gap-3" to="/analytics">  <BarChart size={18} />
            {!collapsed && <span>Analytics</span>}</Link>
        </li>
        {/* </Link> */}

        <li className="flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-purple-100 hover:text-purple-600">
          <Folder size={18} />
          {!collapsed && <span>Projects</span>}
        </li>

        <li className="flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-purple-100 hover:text-purple-600">
          <CheckSquare size={18} />
          {!collapsed && <span>Tasks</span>}
        </li>

      </ul>

      {/* Button */}
      <button
        onClick={() => setOpen(true)}
        className={`mt-10 w-full bg-purple-400 cursor-pointer text-white py-2 rounded-md ${collapsed ? "px-2" : ""
          }`}
      >
        {collapsed ? "+" : "+ Create New Task"}
      </button>

      {/* modal */}
      {open && <TaskModal onClose={() => setOpen(false)} />}
    </div>
  )
}

export default Sidebar