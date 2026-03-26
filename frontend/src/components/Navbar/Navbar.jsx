import React, { useContext, useState } from 'react'
import { Bell, BookCheck, Settings } from "lucide-react"
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/Context'
const Navbar = () => {
    const [showlogout, setShowlogout] = useState(false)
    const { logout } = useContext(AppContext)
    const navigate = useNavigate()
    const handleLogout = async () => {
        await logout()
        navigate("/")
    }
    return (
        <div className='bg-gray-100 flex justify-between items-center p-5 rounded-xl shadow-md'>
            <div className='flex items-center gap-4'>
                <Link className='flex gap-4' to="/dashboard">
                    <div className='bg-blue-950 h-8 w-8 flex justify-center items-center rounded-sm text-amber-50'><BookCheck /></div>
                    <h1 className='font-bold text-[20px]'>TaskManager</h1>
                </Link>
            </div>
            <div className="">
                <ul className='flex gap-8 text-[16px] font-bold cursor-pointer'>
                    <li className='text-blue-950'>Task.io</li>
                    <li>Overview</li>
                    <li>Team</li>
                </ul>
            </div>
            <div className='flex '>
                <ul className='flex items-center justify-center cursor-pointer gap-4'>
                    <li> <Bell /> </li>
                    <li> <Settings /> </li>
                    <li onClick={() => setShowlogout(!showlogout)} className='w-10 relative h-10'>
                        <img className='rounded-3xl' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAARVBMVEX6+vqPj4/////l5eWMjIyIiIj19fWCgoKVlZXGxsaYmJiSkpKxsbG3t7fp6eny8vKkpKS+vr7Nzc2qqqrf39/X19eenp7INw94AAAC6UlEQVR4nO2b27KrIAxAMXLxBqJo//9TD9o9s7trVawYPDNZD20f14RbSChjBEEQBEEQBEEQBEEQxE2BiecnpHZ5AtAOpbZVXVdW94O8gRdA3hSZEJxnGedCZJU2ibUARqu8zitc2TGlFRjL35RmLe7aZFrQiw9KT61UwQItPitNiC6JFbgNJ2+lU1g1m05JrKDbcfJWPbIVDGrPKctUjmslq32njD9QnQIGbx7AEjNUMmDw5lghSoFe2TRThqoNmVFzpPBmFYxBM2q2GrBCtXm+pBo/CFWaxg9tUgWuvTlUSFKQH5BSLZJU+DzHO2p8bndg+JCWH5RHpJBS0EORUlhSd5xTzNxw9d1yn2JQBzvh7ej3PPvGwHTKRypHcrpnPhWaoiPfsoJzdDyl8NsM7nVUPgLmOreYSqE3ZIN9b99PFbAShFerZidWKkWFCrZrQYmqZkxvxEqhlhFegLFeWYOiQLuELq3MomA9wVWTrjo8aeWOv00twR1ysWxpxQYtlOA/CMW7nKVvhDAA02tnPU737Q1aMz9MJlI+vwnifwegNfkXmAvbpTC6IvzK90JdNBcdOytnShhcXdKXhCH7WmnWKi7IQ9tzTt6qil7rAHfSyZ/UTeRQwXDaycfKRJbqYkjFzkZtDKkmrpOsYkhFvpwGdUJJapIq7jh8IQWNXSkXV4qd3zvjr77grvGmVOSbPJQxpCLX0CCPIRX9RP4qu/tLFTt3OdRP+8wFFVBzevzq+L2j03lC9BxhQp6T4ll8pYO9xyUXNZMPNK8+OF1VAgX7tVX0/PwXuf1gccvpKiW2+4xy1enih4zl2iPYdXjsM28BDI8Dbe0JZa+vywIri/BocV70KHVZkGURVurgqiolWmebjbbeCxcXtR1Rq9cAee+m+vnKoAnFXZ/gCT8wmXeuKnxIxG9x3//MiocrDUtV4p/+/GGGsS+1bpyn0V3Zj3nLkv8rBN5Jq0MQBEEQBEEQBEEQBEGs8Q9UMiC2Cz0iwAAAAABJRU5ErkJggg==" alt="img"
                        />
                        {showlogout && (
                            <div className='bg-gray-300 mt-3  w-14 h-8 flex items-center justify-center rounded-sm '>
                                <button onClick={handleLogout} className="text-sm  cursor-pointer text-gray-700 z-10 ">Logout</button>
                            </div>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar