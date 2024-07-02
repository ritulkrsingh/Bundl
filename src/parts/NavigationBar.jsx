import '../design.css'
import './NavigationBar.css'
import {StoreContext} from "./StoreContext.jsx";
import {useContext} from "react";
import {Link } from "react-router-dom";
import Logo from '../assets/bundl.svg';
import ProfileIcon from '../assets/profile.svg';

export default function NavigationBar({setLoginPopup, setLoginMode}) {

  const {token} = useContext(StoreContext);

  return (
    <>
      <nav className="navbar">
        <div className="nav-logo">
          <img src={Logo} alt="Logo"/>
        </div>
        <div className="nav-links">
          <a href="..">Home</a>
          {/*<a href="../account/">View account</a>*/}
          <Link to="/orders" className="orders-link">View Orders</Link>
          {!token ? (
            <>
              <a onClick={() => {setLoginPopup(true); setLoginMode("Login")}}>Login</a>
              <a onClick={() => {setLoginPopup(true); setLoginMode("Sign Up")}}>Sign Up</a>
            </>
            ) : (
              <a href="/account" className="profile-picture">
               <img src={ProfileIcon} alt="Profile Picture"/>
              </a>
          )}
        </div>
      </nav>
    </>
  )
}
