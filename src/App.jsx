import { useState } from 'react'
import './design.css'
import NavigationBar from "./parts/NavigationBar.jsx";
import { Route, Routes } from 'react-router-dom'
import Home from '/parts/Home.jsx'
import Orders from './orders/Orders.jsx'
import Login from '/parts/Login.jsx'
import Account from "./account/Account.jsx";

function App() {

  const [loginPopup, setLoginPopup] = useState(false)

  return (
    <>
      {loginPopup ? <Login setLoginPopup={setLoginPopup} /> : <> </>}
      <div>
        <NavigationBar setLoginPopup={setLoginPopup} />
        <Routes>
          <Route path='*' element={<Home />}/>
          <Route path='/orders' element={<Orders />}/>
          <Route path='/account' element={<Account />}/>
        </Routes>
      </div>
    </>
  )
}

export default App
