import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentListing: 123,
    success: false
}

const listingSlice = createSlice({
    name: 'listing',
    initialState,
    reducers: {
        begingListing: (state) => {
            state.erorrs = {}
            state.loading = true
        },
        successAdding: (state, action) => {
            state.success = action.payload
            state.loading = false
            state.erorrs = false
        }
        ,
        endListing: (state, action) => {
            state.erorrs = action.payload
            state.loading = false
        },
        fetchListing: (state, action) => {
            state.currentListing = action.payload
        }

    }
})

export const { begingListing, successAdding, endListing, fetchListing } = listingSlice.actions
export default listingSlice.reducer