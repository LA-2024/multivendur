import { combineReducers, configureStore } from '@reduxjs/toolkit'
import useReducer from './user/userSlice.js'
import listingReducer from './listing/listingSlice.js'
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const rootReducer=combineReducers({user:useReducer,listing:listingReducer})
const persisteConfig={
    key:'root',
    storage,
    version:1
}
const perisitstedReducer=persistReducer(persisteConfig, rootReducer)


export const store = configureStore({
  reducer: perisitstedReducer,
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false})

})

export const persistor=persistStore(store)