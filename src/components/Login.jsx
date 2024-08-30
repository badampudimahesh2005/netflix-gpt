import React, { useRef, useState } from 'react'
import Header from './Header';
import { checkValidData } from '../utils/validation';
import {  createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

function Login() {
    
    let [isSignInForm, setIsSignInForm] = useState(true);
    let [errorMessage, setErrorMessage]= useState();

    const navigate =useNavigate();
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
                    photoURL: "https://avatars.githubusercontent.com/u/12824231?v=4",
                  })
                    .then(() => {
                        const {uid, email, displayName,photoURL} = auth.currentUser;
                        dispatch(addUser({uid:uid, email:email, displayName:displayName, photoURL:photoURL}));
                      navigate("/browse");
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
              console.log(user);
            navigate("/browse");
            
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
                <img className="w-full h-full object-cover" src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="background-image" />
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
