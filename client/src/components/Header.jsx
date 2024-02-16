import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateSuccess } from '../redux/user/userSlice'
import './header.scss'
function Header() {
  const { currentUser } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [display, setdisplay] = useState(false)
  return (
    <div className='bg-slate-200 shadow-md header'>
      <div className=' flex justify-between items-center p-2 xl:w-[70%] xl:mx-auto relative'>
        <div ><span className='text-3xl'>Lawni </span><span className=' text-3xl text-blue-600 font-bold'>A.</span></div>
        <ul className="flex justify-center items-center h-full">
          <li><a className="text-sm text-gray-400 hover:text-gray-500" href="/">Home</a></li>
          <li className="text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </li>
          <li><a className="text-sm text-gray-400 hover:text-gray-500" href="/policy">Policy</a></li>
          <li className="text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </li>
          <li><a className="text-sm text-gray-400 hover:text-gray-500" href="#">Services</a></li>
        </ul>
        <div className="flex items-center justify-center w-10 h-10 mx-2 overflow-hidden rounded-full">
          <img onClick={() => setdisplay(e => !e)} src={currentUser && currentUser.avatar || ''} className=' cursor-pointer' />
          {display && <ul aria-labelledby="user-menu-button " className='py-2 top-20 right-0 rounded-md shadow-lg w-48 z-100' style={{ position: 'absolute', right: '-6em', top: '4em', zIndex: 999, backgroundColor: '#fff' }}>
            <li>
              <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile</a>
            </li>
            <li onClick={() => dispatch(updateSuccess(null))}>
              <a href="/singin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
            </li>
          </ul>}
        </div>
      </div>
    </div>



  )
}

export default Header