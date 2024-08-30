import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './login';
import Browse from './Browse';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import {addUser,removeUser} from '../utils/userSlice'
import { onAuthStateChanged } from 'firebase/auth';

function Body() {
  const dispatch = useDispatch();
    const appRouter = createBrowserRouter([
        {path:"/", element: <Login />},
        {path: "/browse", element: <Browse />},

    ]);

useEffect(()=>{
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
    const {uid, email, displayName,photoURL} = user;
    dispatch(addUser({uid:uid, email:email, displayName:displayName, photoURL:photoURL}));
     
    } else {
      // User is signed out
      dispatch(removeUser());
    }
  });
},[]);


  return (
    <div>
        <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body