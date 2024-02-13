import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { begingListing, successAdding, endListing, fetchListing } from './../redux/listing/listingSlice.js'
import ListingCard from '../components/ListingCard.jsx'
import axios from "axios"
import SingleItem from './SingleItem.jsx'

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
  }, [])
  console.log('currentListing: ', currentListing)

  return (
    <div className='w-[80%] mx-auto'>
      {/* <div>Home: {`${currentUser.username}-${currentUser.email}`}</div>
      {currentListing && <div>Infos: {`${currentListing[0].name}-${currentListing[0].description}`}</div>} */}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full pt-10">
        {currentListing.map(d => <ListingCard data={d} />)}
      </div>
    </div>
  )
}

export default Home