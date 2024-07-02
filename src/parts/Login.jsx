import React, {useContext} from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Typography,
  Container,
  Box, Backdrop,
  Link as MuiLink
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {StoreContext} from "./StoreContext.jsx";
import axios from 'axios';

export default function Login({ setLoginPopup, loginMode, setLoginMode }) {

  const {url, setToken, setUserId} = useContext(StoreContext)

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
    let newUrl = url + "api/user/" + (loginMode === "Login" ? "login" : "register");

    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setUserId(response.data.userId);
      localStorage.setItem("userId", response.data.userId);
      setLoginPopup(false);
    } else {
      alert(response.data.message);
    }
  }

  return (
    <>
      <Backdrop open={true} style={{zIndex: 1300, color: '#fff', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0}} />
      <Dialog
        open={true}
        onClose={() => setLoginPopup(false)}
        hideBackdrop={true}
        PaperProps={{
          style: {
            width: '22vw',
            minWidth: '250px',
            maxHeight: 'calc(100vh - 100px)',
            overflowY: 'auto'
          }
        }}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
        <DialogTitle>
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => setLoginPopup(false)}
            aria-label="close" sx={{ position: 'absolute', right: 20, top: 12 }}>
            <CloseIcon />
          </IconButton>
          <Typography mt={3} variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            {loginMode}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={onLogin}>
            {loginMode !== "Login" &&
              <Box mb={2} mt={2}>
                <TextField name='name' onChange={onChangeHandler} value={data.name} type="text" label='Your Name' required fullWidth/>
              </Box>
            }
            <Box mb={2} mt={2}>
              <TextField name='email' onChange={onChangeHandler} value={data.email} type="email" label='Your Email' required fullWidth/>
            </Box>
            <Box mb={2}>
              <TextField name='password' onChange={onChangeHandler} value={data.password} type="password" label='Password' required fullWidth/>
            </Box>
            <DialogActions>
              <Button type='submit' color="primary">
                {loginMode === "Sign Up" ? "Create account" : "Login"}
              </Button>
            </DialogActions>
          </form>
          {/*{loginMode === "Login" ?*/}
          {/*  <MuiLink href="#" onClick={(e) => {e.preventDefault(); setLoginMode("Sign Up")}} sx={{cursor: 'pointer'}}> Create a new account? </MuiLink> :*/}
          {/*  <MuiLink href="#" onClick={(e) => {e.preventDefault(); setLoginMode("Login")}} sx={{cursor: 'pointer'}}> Already have an account? </MuiLink>}*/}
        </DialogContent>
      </Dialog>
    </>
  )
}