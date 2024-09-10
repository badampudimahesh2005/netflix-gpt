import React, { useEffect } from 'react'
import Dropdown from './Dropdown'
import { useDispatch, useSelector } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO_URL, SUPPORTED_LANGUAGES } from '../utils/constants';
import { togleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

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
    dispatch(togleGptSearchView());
    
  }
  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  const showGptSearch = useSelector((store)=> store.gpt.showGptSearch);


  return (

    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between items-center">
      <img className="w-44" src={LOGO_URL} alt="logo" />

      <div className="flex flex-row items-center">
       

        {user && (
          <div className="flex">

            {/* Language Selection  */}
            {showGptSearch && (
            <select
              className="p-2 m-2 bg-gray-900 text-white"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}


            <button
          className="py-2 px-6 mx-4 my-2 bg-purple-800 text-white text-lg rounded-lg hover:bg-purple-900 transition-all"
          onClick={handleGptSearchClick}
        >
           {showGptSearch ? "Homepage" : "GPT Search"}
        </button>

            <Dropdown />

          </div>

          
        )}
      </div>
    </div>
  )
}

export default Header