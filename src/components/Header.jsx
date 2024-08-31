import React, { useEffect } from 'react'
import Dropdown from './Dropdown'
import { useDispatch, useSelector } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { addUser, removeUser } from '../utils/userSlice';

function Header() {
  const user =useSelector(store=> store.user);

  const dispatch=useDispatch();
  const navigate=useNavigate();

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
      const {uid, email, displayName,photoURL} = user;
      dispatch(addUser({uid:uid, email:email, displayName:displayName, photoURL:photoURL}));
      navigate("/browse");
       
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
  },[]);

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