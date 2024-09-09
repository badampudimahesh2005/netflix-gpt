import React, { useEffect } from 'react'
import Dropdown from './Dropdown'
import { useDispatch, useSelector } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO_URL } from '../utils/constants';

function Header() {
  const user =useSelector(store=> store.user);

  const dispatch=useDispatch();
  const navigate=useNavigate();

  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth, (user) => {
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

    //unsubscribe when component unmounts
    return ()=> unsubscribe();
  },[]);

  const handleGptSearchClick =()=>{
    
  }

  return (

   
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
    <img
      className="w-44"
      src= {LOGO_URL}
      alt="logo"
    />
     <button
            className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg"
            onClick={handleGptSearchClick}
      ></button>
   {user && ( <div className="flex">
      <Dropdown  />
    </div>)}
  </div>
  )
}

export default Header