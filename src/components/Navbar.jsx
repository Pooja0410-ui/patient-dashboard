import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => {
  const linkClass = ({ isActive }) =>
    'px-3 py-2 rounded ' + (isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100')

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">JC</div>
          <h1 className="text-xl font-semibold">Jarurat Care</h1>
        </div>
        <nav className="flex items-center gap-2">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/patients" className={linkClass}>Patients</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Nav
