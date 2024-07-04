import { useContext } from 'react';
import { StoreContext } from '../parts/StoreContext.jsx';
import {Link, useNavigate} from 'react-router-dom';
import {Card, CardContent, Typography} from "@mui/material";

function Account({ setLoginPopup, setLoginMode }) {
  const { userId, userName, setToken, setUserId, setUserName } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken('');
    setUserId('');
    setUserName('');
    navigate('/');
  };

  const handleDeleteAccount = () => {
    setLoginMode('delete');
    setLoginPopup(true);
  };

  return (
    <>
      <h1>Account Page</h1>
      <h2>Hello, {userName}!</h2>
      {userId ?
        (<>
          <Card sx={{maxWidth: '50vw', width: '40vw', marginBottom: 1.5, borderRadius: '10px'}} elevation={3}>
            <CardContent>
              <Typography onClick={handleLogout} variant="h6" component="div" style={{cursor: 'pointer'}}>
                Logout
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{maxWidth: '50vw', width: '40vw', marginBottom: 1.5, borderRadius: '10px'}} elevation={3}>
            <CardContent>
              <Typography onClick={handleDeleteAccount} variant="h6" component="div" style={{cursor: 'pointer'}}>
                Delete Account
              </Typography>
            </CardContent>
          </Card>
        </>)
        :
        <Typography>Login to view your account.</Typography>
      }
    </>
  );
}

export default Account;