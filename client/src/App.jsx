import './index.css'
import axios from 'axios'
axios.defaults.withCredentials = true

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import SingIn from './pages/SingIn'
import SingOut from './pages/SingOut'
import SingUp from './pages/SingUp'
import About from './pages/About'
import Profile from './pages/Profile.jsx'
import PrivetRoute from './components/PrivetRoute.jsx'

import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import Listing from './pages/Listing.jsx'
import SingleItem from './pages/SingleItem.jsx'
import Policy from './pages/Policy.jsx'
import Contact from './pages/Contact.jsx'

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={false} persistor={persistor}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/singin' element={<SingIn />} />
            <Route path='/singout' element={<SingOut />} />
            <Route element={<PrivetRoute />}>
              <Route path='/' element={<Home />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/about' element={<About />} />
              <Route path='/policy' element={<Policy />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/new-listing' element={<Listing />} />
              <Route path='/single-item' element={<SingleItem />} />
            </Route>
            <Route path='/singup' element={<SingUp />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default App
