import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../Context/Context'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const LoginSignUp = () => {
  const [toggle, setToggle] = useState('signup')

  const { url } = useContext(AppContext)
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleOnChange = (e) => {
    const { value, name } = e.target

    setData((prev) => ({ ...prev, [name]: value }))
  }



  const handleSubmit = async (e, req, res) => {
    e.preventDefault()
    try {
      if (toggle === "signup") {
        const res = await axios.post(`${url}/user/register`, data)
        navigate('/dashboard')
      } else {
        const { email, password } = data
        const res = await axios.post(`${url}/user/login`, { email, password },
          {
            withCredentials: true
          }
        )
        navigate('/dashboard')

      }
    } catch (err) {
      console.log(err.message)
    }

  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">

      <div className="grid grid-cols-2 w-[900px] shadow-lg rounded-xl overflow-hidden">

        {/* LEFT SECTION */}
        <div className="flex flex-col justify-center items-center p-8 bg-pink-100">
          <h1 className="font-bold text-2xl mb-4">Task Manager</h1>

          <p className="font-bold text-2xl text-center">
            The Digital Atelier for High Focus Teams
          </p>

          <p className="text-gray-500 text-center mt-3">
            Manage tasks efficiently and boost productivity with a premium workspace.
          </p>

          <img
            className="rounded-md mt-6 w-48"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUCu_3b7my9oq2TW__GAEnz8FH30f9A5jH5uAZnFooGBbg8rp-lZlUJNV3W6mgsrhdeMWDQD2mapcgVRprwGk0ggB5UVveK9vhNuKiI0yG6b6xkOgibgerpk3uwcH1Ap0-sqKy7TV9ekcrQj-JN7tzFCY0o7DBq1lP7WhVUuDbPzikoYlc01s2r0y4KphTL33dnjHn3qwSYXnOb_Ovy3pX7V4cjWPEHDtiSZmVnOz7bV3Xzsh05F54g1ySRZmTSvbl4SWpx6gLs3Tf"
            alt=""
          />
        </div>

        {/* RIGHT SECTION */}
        <div className="bg-white p-8 flex flex-col justify-center">

          <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-500 mb-6">
            {toggle === 'login'
              ? 'Sign in to your account'
              : 'Create a new account'}
          </p>

          {/* toggle buttons */}
          <div className="flex mb-6 bg-gray-200 rounded-full p-1">
            <button
              onClick={() => setToggle('login')}
              className={`w-1/2 py-2 text-blue-800 rounded-full ${toggle === 'login' ? 'bg-white shadow' : ''
                }`}
            >
              Login
            </button>
            <button
              onClick={() => setToggle('signup')}
              className={`w-1/2 py-2 text-blue-800 rounded-full ${toggle === 'signup' ? 'bg-white shadow' : ''
                }`}
            >
              Sign Up
            </button>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Signup only fields */}
            {toggle === 'signup' && (
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleOnChange}
                placeholder="Username"
                className="border p-2 rounded-md"
                required
              />
            )}

            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleOnChange}
              placeholder="Email"
              className="border p-2 rounded-md"
              required
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleOnChange}
              className="border p-2 rounded-md"
              required
            />

            {/* Submit button */}
            <button className="bg-blue-800 text-white py-2 rounded-md">
              {toggle === 'login' ? 'Login' : 'Create Account'}
            </button>

            <p className="text-xs text-gray-500 text-center">
              By continuing, you agree to terms & conditions
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginSignUp