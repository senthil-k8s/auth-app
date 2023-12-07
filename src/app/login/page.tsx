"use client";

import React,{useEffect, useState} from 'react'
import axios from "axios";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast/headless';

const Login = () => {

  const [loading, setloading] = useState(false)
  const [buttonDisabled, setbuttonDisabled] = useState(false)

  const [user, setUser] = useState({
    email:"",
    password:""
  })
  const router = useRouter();
  const onLogin = async () => {

      try {

        setloading(true)
        const res = await axios.post("api/users/login", user);
        console.log(res);
        toast.success("Logged in Successfully") 
        router.push("/profile");

      } catch (error:any) {

        console.log("Login Failed", error.message);
        toast.success(error.message);

      } finally{

        setloading(false)

      }
  }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0){
      setbuttonDisabled(true)
    }else{
      setbuttonDisabled(false)
    }
  }, [user])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? "Processing" : "Login"}</h1>
      <hr />
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
       type="text" 
       value={user.password}
       onChange={ (e) => setUser({...user, password: e.target.value})}
       placeholder='password'
      />
      <button
        className='p-2 border border-gray-300 rounded-lg mb-5 focus:outline-none focus:border-gray-600'
        type='submit'
        onClick={onLogin}
      > {buttonDisabled ?  "Login here" : "No Login"}
      </button>
      <Link href="/signup">Visit Signup here</Link>
    </div>
  )
}

export default Login