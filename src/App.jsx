import { useState } from 'react'
import './design.css'
import NavigationBar from "./parts/NavigationBar.jsx";
import { Route, Routes } from 'react-router-dom'
import Home from '/parts/Home.jsx'
import Orders from './orders/Orders.jsx'
import Login from '/parts/Login.jsx'
import Account from "./account/Account.jsx";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

  const [loginPopup, setLoginPopup] = useState(false)
  const [loginMode, setLoginMode] = useState("Login")

  return (
    <ThemeProvider theme={darkTheme}>
      {loginPopup ? <Login setLoginPopup={setLoginPopup} loginMode={loginMode} setLoginMode={setLoginMode}/> : <> </>}
      <div>
        <NavigationBar setLoginPopup={setLoginPopup} setLoginMode={setLoginMode} />
        <Routes>
          <Route path='*' element={<Home />}/>
          <Route path='/orders' element={<Orders />}/>
          <Route path='/account' element={<Account setLoginPopup={setLoginPopup} setLoginMode={setLoginMode} />}/>
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App