import { useEffect, useState, useRef } from 'react'
import img1 from './../imgs/saitama-black-5120x2880-10125.jpg'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { updateFailur, updateStart, updateSuccess } from '../redux/user/userSlice'

function Profile() {
    const { erorrs, currentUser } = useSelector(state => state.user)
    const dispatch = useDispatch()
    //fire base
    const fileRef = useRef()
    const [file, setfile] = useState(undefined)
    const [avatar, setavatar] = useState(currentUser.avatar)
    const [progressBar, setprogressBar] = useState(null)
    useEffect(() => {
        if (file) {
            handelFileUpload(file)
        }
    }, [file])
    const handelFileUpload = (file) => {
        console.log(file)
        const storage = getStorage(app)
        const fileName = new Date().getTime() + file.name
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on('state_changed', (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            setprogressBar(progress)
            
        },
        (err) => { console.log(err) },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setavatar(downloadURL)
                setprogressBar(null)
            })
        }
        )
    }
    //api
    const usernameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const handelUpdate = async () => {
        dispatch(updateStart())
        console.log()
        const result = await axios.post(`http://localhost:3000/user/update/${currentUser._id}`, { username: usernameRef.current.value, email: emailRef.current.value, password: passwordRef.current.value, avatar: avatar })
            .then(e => {
                console.log(e.data.user)
                dispatch(updateSuccess(e.data.user))
            })
            .catch(e => {
                console.log(e.response.data)
                dispatch(updateFailur(e.response.data))
            })
    }
    const handelDelete = async () => {
        const result = await axios.delete(`http://localhost:3000/user/delete/${currentUser._id}`).then(e => {
            dispatch(updateSuccess(null))
        })
    }

    return (
        <div className="flex flex-col max-w-lg m-auto ">
            <p className='text-3xl font-semibold text-center my-10'>Profile</p>
            <span className=' text-red-600 font-semibold text-center mb-6'>{erorrs.msg}</span>
            <input type="file" ref={fileRef} hidden accept='image/*' onChange={e => setfile(e.target.files[0])}/>
            <div className=' flex items-center flex-col'>
            <img src={avatar || img1} onClick={() => fileRef.current.click()}  style={{ height: '100px', width: '100px', borderRadius: '50%', cursor: 'pointer' }} />
            {progressBar &&             <div className='h-2 px-4 w-[50%] mt-2 relative' >
                <div className="h-full bg-blue-500 rounded-xl" style={{width:`${progressBar}%`}}></div>
                <span className=' absolute right-[-30px] bottom-[-8px]'>{progressBar} %</span></div>}
            </div>
            <input type="text" ref={usernameRef} name="username" placeholder="username" defaultValue={currentUser.username} required className='p-2 my-2 border-gray-400 border-2 rounded-xl'/>
            <span className='text-red-500'>{erorrs.username}</span>
            <input type="email" ref={emailRef} name="email" placeholder="email" defaultValue={currentUser.email} required className='my-2 border-gray-400 border-2 rounded-xl p-2' />
            <span className='text-red-500'>{erorrs.email}</span>
            <input type="text" ref={passwordRef} name="password" placeholder="password" className='my-2 border-gray-400 border-2 rounded-xl p-2'/>
            <button onClick={handelUpdate} className="px-3 py-2 my-2 rounded-xl bg-blue-500 text-white font-semibold">UPDATE</button>
            <div className="flex justify-between ">
                <button onClick={handelDelete} className=" text-red-600 font-semibold" >Delet Account</button>
                <a href="/new-listing" className=" bg-black text-white px-3 py-2 font-semibold rounded-md">Add items</a>
                <button className="text-red-600 font-semibold" onClick={()=>dispatch(updateSuccess(null))}>Sing Out</button>
            </div>
        </div>
    )
}

export default Profile