import React, { useState } from 'react'
import Header from './Header';

function Login() {
    let [isSignInForm, setIsSignInForm]=useState(true);
    const toggleLogin =()=>{
        setIsSignInForm(!isSignInForm);
    }
  return (
    <div>
        <Header />
        <div className='absolute'>
            <img className=" " src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="background-image" />
            <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="absolute  w-3/12 p-12 bg-black my-32 mx-auto left-0 right-0  text-white bg-opacity-70 rounded-lg">
            <form action="">
                <h1 className='font-bold text-3xl my-3'>{isSignInForm?"Sign In":"Sign Up"}</h1>
            {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-3 my-3 w-full bg-gray-700 rounded-sm bg-opacity-50 border border-gray-500"
          />
        )}
                <input type="text" placeholder='Email or mobile number'className='p-3 my-3 w-full bg-gray-700 rounded-sm bg-opacity-50 border border-gray-500' />
                <input type="password" placeholder='Password' className='p-3 my-3 w-full bg-gray-700 rounded-sm bg-opacity-50 border border-gray-500' />
                <button className="p-2 my-3 bg-red-700 w-full rounded-md ">{isSignInForm?"Sign In":"Sign Up"}</button>

                {isSignInForm && (
                <p className=' my-3 mx-10 hover:underline'>Forgot password?</p>
                )}
                <div className="my-6"> 
                    <span className='text-gray-400'>{isSignInForm
            ? "New to Netflix? "
            : "Already registered? "}
             </span>
                    <span className=' cursor-pointer hover:underline' onClick={toggleLogin}>{isSignInForm?"Sign in now.":"Sign up now."}</span>
                    </div>

            </form>
        </div>
    </div>
  )
}

export default Login;