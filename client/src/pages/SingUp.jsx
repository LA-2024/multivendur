import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import img from './../imgs/saitama-black-5120x2880-10125.jpg'
import { useNavigate } from 'react-router-dom'
import { singInStart, singInSuccess, singInFailure } from './../redux/user/userSlice.js'
import { useSelector, useDispatch } from 'react-redux'
import OAuth from '../components/OAuth.jsx'

function SingUp() {
  const usernameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { loading, erorrs } = useSelector(state => state.user)
  console.log('redux:', loading, erorrs)
  const handelSubmite = async () => {
    dispatch(singInStart())
    const data = { username: usernameRef.current.value, email: emailRef.current.value, password: passwordRef.current.value }
    console.log(data)
    const result = await axios.post('http://localhost:3000/auth/singup', data)
      .then(e => {
        dispatch(singInSuccess(e.data.user))
        navigate('/singin')
      })
      .catch(e => {
        dispatch(singInFailure(e.response.data))
      })
  }
  useEffect(() => { dispatch(singInFailure('')) }, [])
  return (
    <section className="flex flex-col md:flex-row h-screen items-center">


      <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center">

        <div className="w-full h-100">


          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">Create your account</h1>

          <div className="mt-6" action="#" method="POST">
            <div>
              <label className="block text-gray-700">User Name</label>
              <input ref={usernameRef} type="text" name="username" placeholder="Enter Email Address" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" required /><br />
              <span className='text-red-500'>{erorrs.username}</span>
            </div>
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input ref={emailRef} type="email" name="email" placeholder="Enter Email Address" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" required /><br />
              <span className='text-red-500'>{erorrs.email}</span>
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input ref={passwordRef} type="password" name="password" placeholder="Enter Password" minLength="6" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none" required />
            </div>
            <button disabled={loading} type="submit" className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
              onClick={handelSubmite}>{loading ? 'Loading ...' : 'Sing Up'}</button>
          </div>

          <hr className="my-6 border-gray-300 w-full" />
          <OAuth />
          <p className="mt-8">Have an account ? <a href="/singin" className="text-blue-500 hover:text-blue-700 font-semibold">Log In !</a></p>


        </div>
      </div>

    </section>
  )
}

export default SingUp