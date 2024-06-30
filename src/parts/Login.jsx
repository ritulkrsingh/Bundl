import React, {useContext} from 'react';
import '../design.css'
import {StoreContext} from "./StoreContext.jsx";
import axios from 'axios';

export default function Login({setLoginPopup}) {

  const {url, setToken, setUserId} = useContext(StoreContext)

  const [currState, setCurrState] = React.useState("Login")
  const [data, setData] = React.useState({
    name: "",
    email: "",
    password: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data, [name]: value}));
  }

  const onLogin = async (event) => {
    event.preventDefault();
    console.log('onLogin called');
    let newUrl = url + "api/user/" + (currState==="Login" ? "login" : "register");

    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setUserId(response.data.userId);
      setLoginPopup(false);
    } else {
      alert(response.data.message);
    }
  }

  return (
    <>
      <div className='login'>
        <form onSubmit={onLogin} className='login-popup-containjer'>
          <h2>{currState}</h2>
          <div className='login-popup-input'>
            {currState==="Login" ? <></> :
                <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required/>}
            <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your Email' required/>
            <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required/>
          </div>
          <div onClick={() => setLoginPopup(false)}>
            Close
          </div>
          <button type='submit'> {currState === "Sign Up" ? "Create account" : "Login"}</button>
          <br></br>
          {currState==="Login"?
            <span onClick={()=>setCurrState("Sign Up")}> Create a new account? </span>:
            <span onClick={()=>setCurrState("Login")}> Already have an account? </span>}
        </form>
      </div>
    </>
  )
}
