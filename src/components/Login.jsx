import React, { useRef, useState } from 'react'
import Header from './Header';
import { checkValidData } from '../utils/validation';
import {  createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_URL, USER_ICON } from '../utils/constants';

function Login() {
    
    let [isSignInForm, setIsSignInForm] = useState(true);
    let [errorMessage, setErrorMessage]= useState();

  
    const dispatch=useDispatch();

    const toggleLogin = () => {
        setIsSignInForm(!isSignInForm);
    }

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const handleFormValidation = () => {
        // Validate the form
        const message =checkValidData(email.current.value, password.current.value);
        setErrorMessage(message);
        if(message) return;

        if(!isSignInForm){
            createUserWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value
              )
                .then((userCredential) => {
                  const user = userCredential.user;
                  updateProfile(user, {
                    displayName: name.current.value,
                    photoURL: USER_ICON,
                  })
                    .then(() => {
                        const {uid, email, displayName,photoURL} = auth.currentUser;
                        dispatch(addUser({uid:uid, email:email, displayName:displayName, photoURL:photoURL}));
                    })
                    .catch((error) => {
                      setErrorMessage(error.message);
                    });
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  setErrorMessage(errorCode + "-" + errorMessage);
                });

        }else{
          //sign in
          signInWithEmailAndPassword(auth, email.current.value, password.current.value)
              .then((userCredential) => {
              // Signed in 
              const user = userCredential.user;
           
            })
            .catch((error) => {
              // const errorCode = error.code;
              // const errorMessage = error.message;
              setErrorMessage("User not found or Invalid credentials");
            });

        }
    }

    return (
        <div className="relative h-screen">
            {/* Ensured Header remains at the top */}
            <Header />

            {/* Background image container */}
            <div className='absolute inset-0'>
                <img className="w-full h-full object-cover" src={BG_URL} alt="background-image" />
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>

            {/* Form container */}
            <form action="" className="absolute w-10/12 md:w-6/12 lg:w-4/12 xl:w-3/12 p-6 md:p-12 bg-black bg-opacity-70 rounded-lg my-8 md:my-32 mx-auto left-0 right-0 text-white"
                onSubmit={(e) => e.preventDefault()}>
                  
                <h1 className='font-bold text-2xl md:text-3xl my-3'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                {!isSignInForm && (
                    <input
                    ref={name}
                        type="text"
                        placeholder="Full Name"
                        className="p-3 my-3 w-full bg-gray-700 rounded-sm bg-opacity-50 border border-gray-500"
                    />
                )}
                <input ref={email} type="text" placeholder='Email or mobile number' className='p-3 my-3 w-full bg-gray-700 rounded-sm bg-opacity-50 border border-gray-500' />
                <input ref={password} type="password" placeholder='Password' className='p-3 my-3 w-full bg-gray-700 rounded-sm bg-opacity-50 border border-gray-500' />
                <p className='text-red-600'>{errorMessage}</p>
                <button className="p-2 my-3 bg-red-700 w-full rounded-md " onClick={handleFormValidation}>{isSignInForm ? "Sign In" : "Sign Up"}</button>

                {isSignInForm && (
                    <p className='my-3 mx-10 hover:underline'>Forgot password?</p>
                )}
                <div className="my-6">
                    <span className='text-gray-400'>{isSignInForm
                        ? "New to Netflix? "
                        : "Already registered? "}
                    </span>
                    <span className='cursor-pointer hover:underline' onClick={toggleLogin}>{isSignInForm ?"Sign up now.":"Sign in now."}</span>
                </div>

            </form>

        </div>
    )
}

export default Login;
