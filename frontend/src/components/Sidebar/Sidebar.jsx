import { useState } from "react"
import {
  LayoutDashboard,
  BarChart,
  Folder,
  CheckSquare,
  Menu
} from "lucide-react"
import TaskModal from "../Modals/TaskModal";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false)
   const [open, setOpen] = useState(false);

  return (
    <div
      className={`${
        collapsed ? "w-[80px]" : "w-[250px]"
      } bg-gray-100 border-r p-4 transition-all duration-300`}
    >
      {/* TOGGLE BUTTON */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="mb-6"
      >
        <Menu />
      </button>

      {/* TITLE */}
      {!collapsed && (
        <h1 className="font-bold mb-6">The Atelier</h1>
      )}

      {/* MENU */}
      <ul className="space-y-4 text-gray-600">

        <li className="flex items-center gap-3 bg-purple-100 text-purple-600 p-2 rounded-md cursor-pointer">
          <LayoutDashboard size={18} />
          {!collapsed && <span>Dashboard</span>}
        </li>

        <li className="flex items-center gap-3 cursor-pointer">
          <BarChart size={18} />
          {!collapsed && <span>Analytics</span>}
        </li>

        <li className="flex items-center gap-3 cursor-pointer">
          <Folder size={18} />
          {!collapsed && <span>Projects</span>}
        </li>

        <li className="flex items-center gap-3 cursor-pointer">
          <CheckSquare size={18} />
          {!collapsed && <span>Tasks</span>}
        </li>

      </ul>

      {/* BUTTON */}
      <button
        onClick={()=>setOpen(true)}
        className={`mt-10 w-full bg-purple-600 text-white py-2 rounded-md ${
          collapsed ? "px-2" : ""
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