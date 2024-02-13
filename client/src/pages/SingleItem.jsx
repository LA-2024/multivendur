import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function SingleItem() {
    // ifram.attributes.src=
    const location=useLocation()
    const data=location.state
    const [index, setindex] = useState(0)
    const len=data.imgUrls.length-1
    const handelSwitch=(e)=>{
        if(e=="next" && index==len){
            setindex(0)
        }
        else if(e=="prev" && index==0){
            setindex(len)
        }
        else{
            setindex(e=>{
                if(e>len) return 0
                return e+1
            })
        }
        
    }
    const mapUrl=data.address.replaceAll(' ','%20')
    
  return (
    <div>
        <div className='h-[50vh] sm:h-[93vh] bg-black overflow-hidden relative rounded-xl'>
            <img src={data.imgUrls[index]} className='w-full object-cover' />
            <button onClick={()=>handelSwitch("next")} className=' absolute top-[48%] right-10 bg-white p-4 rounded-full opacity-30'><svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4L224 214.3V256v41.7L52.5 440.6zM256 352V256 128 96c0-12.4 7.2-23.7 18.4-29s24.5-3.6 34.1 4.4l192 160c7.3 6.1 11.5 15.1 11.5 24.6s-4.2 18.5-11.5 24.6l-192 160c-9.5 7.9-22.8 9.7-34.1 4.4s-18.4-16.6-18.4-29V352z"/></svg></button>
            <button onClick={()=>handelSwitch("prev")} className=' absolute top-[48%] left-10 bg-white p-4 rounded-full opacity-30'><svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M459.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4L288 214.3V256v41.7L459.5 440.6zM256 352V256 128 96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160C4.2 237.5 0 246.5 0 256s4.2 18.5 11.5 24.6l192 160c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V352z"/></svg></button>
        </div>
        <div className='sm:w-[60%] p-2 mx-auto flex flex-col gap-2 py-6' >
            <p className='text-4xl font-semibold'>{data.name}</p>
            <p><span className='text-xl font-mono'>Adress :</span> {data.address}</p>
            <p><span className='text-xl font-mono'>description :</span> {data.description}</p>
            <div className='flex flex-col gap-2'>
                <div className='flex gap-4 items-center'>
                    <span className='text-xl font-mono sm:w-32'>Badrooms :</span>
                    <span className='text-xl font-mono'>{data.bedrooms}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512"><path d="M32 32c17.7 0 32 14.3 32 32V320H288V160c0-17.7 14.3-32 32-32H544c53 0 96 43 96 96V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V416H352 320 64v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V64C0 46.3 14.3 32 32 32zm144 96a80 80 0 1 1 0 160 80 80 0 1 1 0-160z"/></svg>
                </div>
                <div className='flex gap-4 items-center'>
                    <span className='text-xl font-mono sm:w-32'>Bathrooms :</span>
                    <span className='text-xl font-mono'>{data.bathrooms}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M96 77.3c0-7.3 5.9-13.3 13.3-13.3c3.5 0 6.9 1.4 9.4 3.9l14.9 14.9C130 91.8 128 101.7 128 112c0 19.9 7.2 38 19.2 52c-5.3 9.2-4 21.1 3.8 29c9.4 9.4 24.6 9.4 33.9 0L289 89c9.4-9.4 9.4-24.6 0-33.9c-7.9-7.9-19.8-9.1-29-3.8C246 39.2 227.9 32 208 32c-10.3 0-20.2 2-29.2 5.5L163.9 22.6C149.4 8.1 129.7 0 109.3 0C66.6 0 32 34.6 32 77.3V256c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H96V77.3zM32 352v16c0 28.4 12.4 54 32 71.6V480c0 17.7 14.3 32 32 32s32-14.3 32-32V464H384v16c0 17.7 14.3 32 32 32s32-14.3 32-32V439.6c19.6-17.6 32-43.1 32-71.6V352H32z"/></svg>
                </div>
                <div className='flex gap-4 items-center'>
                    <span className='text-xl font-mono sm:w-32'>Parking :</span>
                    <span className='text-xl font-mono'>1</span>
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512"><path d="M171.3 96H224v96H111.3l30.4-75.9C146.5 104 158.2 96 171.3 96zM272 192V96h81.2c9.7 0 18.9 4.4 25 12l67.2 84H272zm256.2 1L428.2 68c-18.2-22.8-45.8-36-75-36H171.3c-39.3 0-74.6 23.9-89.1 60.3L40.6 196.4C16.8 205.8 0 228.9 0 256V368c0 17.7 14.3 32 32 32H65.3c7.6 45.4 47.1 80 94.7 80s87.1-34.6 94.7-80H385.3c7.6 45.4 47.1 80 94.7 80s87.1-34.6 94.7-80H608c17.7 0 32-14.3 32-32V320c0-65.2-48.8-119-111.8-127zM434.7 368a48 48 0 1 1 90.5 32 48 48 0 1 1 -90.5-32zM160 336a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>                
                </div>
            </div>
            <div>
                <span className='text-xl font-mono'>Price : </span> <s className='text-red-600'> {data.regularPrice}$</s> <span className='text-xl text-blue-600'> {data.discountPrice}${data.type=='Rent' && '/Month'}</span>
            </div>
            <div>
                <span className='text-2xl font-semibold'>owner Informations:</span>
                <div className='flex gap-4 items-center pt-4'>
                    <img src={data.imgUrls[0]} className='h-20 w-20 rounded-full'/>
                    <div>
                        <p><span className='text-lg font-medium'>Name : </span>Lawni Abderrazzak</p>
                        <p><span className='text-lg font-medium'>Phone : </span>+212617934100</p>
                        <p><span className='text-lg font-medium'>Email : </span>abderrazzaklawni@gmail.com</p>
                    </div>
                </div>
            </div>
            <div className='h-[50vh] sm:h-[100vh]'>
                <iframe className=' w-full h-full' frameborder="0" scrolling="no" marginheight="0" marginwidth="0" id='iframe' src={`https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${mapUrl}&t=&z=14&ie=UTF8&iwloc=B&output=embed`}></iframe>
            </div>
            <a href="\" className=' p-3 rounded-full w-fit hover:bg-red-200'>⬅️ Back</a>
        </div>
    </div>
  )
}

export default SingleItem