import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    erorrs: {},
    currentUser: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        singInStart: (state) => {
            state.loading = true
        },
        singInSuccess: (state, action) => {
            state.currentUser = action.payload
            state.loading = false
            state.erorrs = {}
        },
        singInFailure: (state, action) => {
            console.log('slice', action.payload)
            state.erorrs = action.payload
            state.loading = false
        },
        updateStart: (state) => {
            state.loading = true
        },
        updateSuccess: (state, action) => {
            state.currentUser = action.payload
            state.loading = false
            state.erorrs = {}
        },
        updateFailur: (state, action) => {
            console.log('slice', action.payload)
            state.erorrs = action.payload
            state.loading = false
        }
    }
})


export const { singInStart, singInSuccess, singInFailure, updateFailur, updateStart, updateSuccess } = userSlice.actions
export default userSlice.reducer