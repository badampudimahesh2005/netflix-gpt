import React from 'react'
import Dropdown from './Dropdown'
import { useSelector } from 'react-redux'

function Header() {
  const user =useSelector(store=> store.user);

  return (

   
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
    <img
      className="w-44"
      src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
      alt="logo"
    />
   {user && ( <div className="flex">
      <Dropdown  />
    </div>)}
  </div>
  )
}

export default Header