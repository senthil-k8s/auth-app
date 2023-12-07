"use client";

import React,{useEffect, useState} from 'react'
import axios from "axios";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {toast} from 'react-hot-toast';

const SignUp = () => {
  const router = useRouter();
  const [buttondisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({
    username:"",
    email:"",
    password:""
  })

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post('api/users/signup', user);
      console.log("signup success", response.data);
      router.push("/login")
      toast.success("User Created successfully")
    } catch (error : any) {
      console.log("signup failed", error.message);
      toast.error(error.message);
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
      setButtonDisabled(true);
    }else{
      setButtonDisabled(false);
    }
  }, [user])
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? "Processing" : "Signup" }</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
       id='username'
       className='p-2 border border-gray-300 rounded-lg mb-5 focus:outline-none focus:border-gray-600  text-black'
       type="text" 
       value={user.username}
       onChange={ (e) => setUser({...user, username: e.target.value})}
       placeholder='username'
      />
      <label htmlFor="email">email</label>
      <input
       id='email'
       className='p-2 border border-gray-300 rounded-lg mb-5 focus:outline-none focus:border-gray-600 text-black'
       type="text" 
       value={user.email}
       onChange={ (e) => setUser({...user, email: e.target.value})}
       placeholder='email'
      />
      <label htmlFor="password">password</label>
      <input
       id='password'
       className='p-2 border border-gray-300 rounded-lg mb-5 focus:outline-none focus:border-gray-600 text-black'
       type="password" 
       value={user.password}
       onChange={ (e) => setUser({...user, password: e.target.value})}
       placeholder='password'
      />
      <button 
        className='p-2 border border-gray-300 rounded-lg mb-5 focus:outline-none focus:border-gray-600'
        type='submit'
        onClick={onSignup}
      > {buttondisabled ? "Signup" :  "No Signup"}
      </button>
      <Link href="/login">Visit Login here</Link>
    </div>
  )
}

export default SignUp