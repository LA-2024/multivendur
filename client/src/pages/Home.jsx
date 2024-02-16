import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchListing } from './../redux/listing/listingSlice.js'
import ListingCard from '../components/ListingCard.jsx'
import axios from "axios"

function Home() {
  const dispatch = useDispatch()
  const { loading, erorrs, currentUser } = useSelector(state => state.user)
  const { currentListing } = useSelector(state => state.listing)
  useEffect(() => {
    axios.get('http://localhost:3000/listing/all').then(res => {
      console.log('res: ', res)
      dispatch(fetchListing(res.data))
    }).catch(err => {
      console.log('err: ', err)
    })
  })
  console.log('currentListing home: ', currentListing)

  return (
    <div className='w-[80%] mx-auto'>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full pt-10">
        {currentListing.map(d => <ListingCard data={d} />)}
      </div>
    </div>
  )
}

export default Home