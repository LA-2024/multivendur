import React, { useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from './../firebase'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Listing() {
    const nav = useNavigate()
    const [files, setfiles] = useState([])
    const [erorr, seterorr] = useState(null)
    const [loading, setloading] = useState(false)
    const [formData, setformData] = useState({
        imgUrls: []
    })

    console.log(files)
    const handelImagesSubmit = (e) => {
        setloading(true)
        if (files.length > 0) {
            const promises = []
            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]))
            }
            Promise.all(promises).then((urls) => {
                setformData({ ...formData, imgUrls: formData.imgUrls.concat(urls) })

            }).catch(() => { seterorr(false) }).finally(() => { setloading(false) })
        }
    }

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app)
            const fileName = new Date().getTime() + file.name
            const storageRef = ref(storage, fileName)
            const uploadTask = uploadBytesResumable(storageRef, file)
            uploadTask.on("state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(progress)
                },
                (err) => {
                    reject(err)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                        resolve(downloadUrl)
                    })
                }
            )
        })
    }
    const handelInput = (e) => {
        let v = e.currentTarget.type == 'checkbox' ? e.currentTarget.checked : e.currentTarget.value
        let n = e.currentTarget.name
        setformData({ ...formData, [n]: v })
    }
    console.log(formData)
    const addListing = () => {
        const liste = axios.post('http://localhost:3000/listing/create', formData).then(d => {
            nav('/')
        }).catch(err => { console.log(err) }).finally(() => {
            setformData({
                imgUrls: []
            })
        })
    }
    return (
        <main className='p-3 max-w-4xl mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
            <form className='flex flex-col sm:flex-row gap-4' >
                <div className='flex flex-col gap-4 flex-1'>
                    <input onChange={handelInput} type="text" placeholder='name' name='name' className='border p-3 rounded-lg' maxLength="62" minLength='10' required />
                    <textarea onChange={handelInput} type="text" placeholder='description' name='description' className='border p-3 rounded-lg' required />
                    <input onChange={handelInput} type="text" placeholder='address' name='address' className='border p-3 rounded-lg' required />
                    <div className='flex gap-2'>
                        <p className='font-semibold text-lg'>Type :</p>
                        <div className='flex gap-2'>
                            <input onChange={handelInput} type='radio' name="type" className='w-5' value='Rent' /><span htmlFor="sale">Sale</span>
                        </div>
                        <div className='flex gap-2'>
                            <input onChange={handelInput} type="radio" name="type" className='w-5' value='Sale' /><span htmlFor="Rent">Rent</span>
                        </div>
                    </div>
                    <div className='flex gap-2 flex-wrap'>
                        <p className='font-semibold text-lg'>Extra :</p>
                        <div className='flex gap-2'>
                            <input onChange={handelInput} type="checkbox" name="parking" className='w-5' /><span htmlFor="ParkingSpot">Parking Spot</span>
                        </div>
                        <div className='flex gap-2'>
                            <input onChange={handelInput} type="checkbox" name="furnished" className='w-5' /><span htmlFor="Furnished">Furnished</span>
                        </div>
                        <div className='flex gap-2'>
                            <input onChange={handelInput} type="checkbox" name="Offer" className='w-5' /><span htmlFor="Offer">Offer</span>
                        </div>
                    </div>
                    <div className='flex gap-6 flex-wrap'>
                        <div className='flex items-center gap-2'>
                            <input onChange={handelInput} type="number" name='bedrooms' min="1" max="10" required className='p-3 w-20 border-gray-300 rounded-lg' /> <span>Beds</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input onChange={handelInput} type="number" name='bathrooms' min="1" max="5" required className='p-3 w-20 border-gray-300 rounded-lg' /> <span>Baths</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input onChange={handelInput} type="number" name='regularPrice' min="0" required className='border-2 p-3 w-20 border-gray-300 rounded-lg' /> <div><p>Regular Price</p><span className='text-xs'>( $ per Month )</span></div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input onChange={handelInput} type="number" name='discountPrice' min="0" required className='border-2 p-3 w-20 border-gray-300 rounded-lg' /> <div><p>Discount Price</p><span className='text-xs'>( $ per Month )</span></div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col flex-1'>
                    <p className='font-semibold'>Images</p><span className='font-normal text-gray-600 ml-2'>The first image will be the cover</span>
                    <div className='flex justify-between'>
                        <input onChange={(e) => setfiles(e.target.files)} type="file" accept='images/*' multiple className='p-3 boder-gray-300 rounded w-full' size={1024 * 1024} />
                        <button type='button' disabled={loading} onClick={handelImagesSubmit} className='px-2 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:bg-black disabled:text-white disabled:opacity-40'>{loading ? 'Wait...' : 'Upload'}</button>
                    </div>
                    <div className='flex flex-col gap-2 mt-2'>
                        {formData.imgUrls.length > 0 && formData.imgUrls.map(url => <img key={url} src={url} className='object-cover rounded m-2' style={{ height: '100px', wnameth: "100px" }} />)}
                    </div>
                    <button onClick={addListing} className='p-3 my-2 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80' >Create Listing</button>
                </div>
            </form>
        </main>
    )
}

export default Listing