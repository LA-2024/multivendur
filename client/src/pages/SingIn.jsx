import React, { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { singInFailure, singInStart, singInSuccess } from '../redux/user/userSlice'
import OAuth from '../components/OAuth'

function SingIn() {
  const location = useLocation()
  const [show, setshow] = useState(false)
  const emailRef = useRef()
  const passwordRef = useRef()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, erorrs } = useSelector(state => state.user)
  console.log('errors', erorrs)
  const handelSubmite = async () => {
    dispatch(singInStart())
    const data = { email: emailRef.current.value, password: passwordRef.current.value }
    const result = await axios.post('http://localhost:3000/auth/singin', data)
      .then(e => {
        dispatch(singInSuccess(e.data.user))
        navigate('/')
      })
      .catch(e => dispatch(singInFailure(e.response.data)))
  }

  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto sm:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
          flex items-center justify-center">
        {show && <span className='bg-green-600 font-bold px-1 py-2 border-l-2 border-green-800 text-white mx-1 my-4'>{location.state.success} <button onClick={() => setshow(false)}>X</button></span>}
        <div className="w-full h-100">


          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">Log in to your account</h1>

          <div className="mt-6" action="#" method="POST">
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input ref={emailRef} type="email" name="email" id="1" placeholder="Enter Email Address" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" required /><br />
              <span className='text-red-500'>{erorrs.email}</span>
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input ref={passwordRef} type="password" name="password" id="2" placeholder="Enter Password" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" required />
              <span className='text-red-500'>{erorrs.password}</span>
            </div>



            <button disabled={loading} type="submit" className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
              onClick={handelSubmite}>{loading ? 'Wait please ...' : 'Log In'}</button>
          </div>

          <hr className="my-6 border-gray-300 w-full" />
          <OAuth />
          <p className="mt-8">Have an account ? <a href="/singup" className="text-blue-500 hover:text-blue-700 font-semibold">Sing Up !</a></p>


        </div>
      </div>

    </section>
  )
}

export default SingIn