import '../design.css'
import {StoreContext} from "./StoreContext.jsx";
import {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";

export default function NavigationBar({setLoginPopup}) {

  const {token,setToken} = useContext(StoreContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/');
  }

  return (
    <>
      <nav className="navbar">
        <div className="nav-logo">
          <img src="../assets/bundl.svg" alt="Logo"/>
        </div>
        <div className="nav-links">
          <a href="..">Home</a>
          {/*<a href="../account/">View account</a>*/}
          <Link to="/orders" className="orders-link">View Orders</Link>
          {!token ? (
              <button onClick={() => setLoginPopup(true)}>Sign In</button>
            ) : (
              <a href="/account" className="profile-picture">
               <img src="../assets/profile.svg" alt="Profile Picture"/>
              </a>
          )}
        </div>
      </nav>
    </>
  )
}
