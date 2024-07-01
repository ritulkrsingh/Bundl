import {useState, createContext, useEffect} from "react";
import express from 'express';
import 'dotenv/config'

export const StoreContext = createContext({
  url: "http://localhost:5172/",
  token: '',
  setToken: () => {},
  userId: '',
  setUserId: () => {},
  userName: '',
  setUserName: () => {},
});

const StoreContextProvider = (props) => {
  console.log("PORTPORTPORTPORTPORT", process.env.PORT);
  const url = "http://localhost:" + (process.env.PORT || 5172) + "/";
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [userId, setUserId] = useState(localStorage.getItem('userId') || '');
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');

  useEffect(() => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('userName', userName);
  }, [token, userId, userName]);

  const contextValue = {
    url,
    token,
    setToken,
    userId,
    setUserId,
    userName,
    setUserName
  }
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider