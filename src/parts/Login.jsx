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

  const {url, userId, setToken, setUserId, setUserName} = useContext(StoreContext)

  const [data, setData] = React.useState({
    name: "",
    email: "",
    password: "",
    text: ""
  });

  const confirmationText = 'I want to delete my account and all my data.';

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data, [name]: value}));
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    if (loginMode === "delete" && data.text !== confirmationText) {
      alert("The confirmation text does not match. Please type the exact text to confirm deletion.");
      return;
    }

    let apiUrl = url + "api/user/" + loginMode;
    data.userId = userId;

    const response = await axios.post(apiUrl, data);

    if (response.data.success) {
      if (loginMode !== "delete") {
        setToken(response.data.token);
        setUserId(response.data.userId);
        setUserName(response.data.userName);
      } else {
        setToken('');
        setUserId('');
        setUserName('');
      }
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
            { loginMode === "login" ? "Login" : (loginMode === "register" ? "Sign Up" : "Delete Account") }
          </Typography>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={onSubmit}>
            { loginMode === "register" &&
              <Box mb={2} mt={2}>
                <TextField name='name' onChange={onChangeHandler} value={data.name} type="text" label='Your Name' required fullWidth/>
              </Box>
            }
            { loginMode !== "delete" &&
              <Box mb={2} mt={2}>
                <TextField name='email' onChange={onChangeHandler} value={data.email} type="email" label='Your Email' required fullWidth/>
              </Box>
            }
            <Box mb={2} mt={2}>
              <TextField name='password' onChange={onChangeHandler} value={data.password} type="password" label='Password' required fullWidth/>
            </Box>
            { loginMode === "delete" &&
              ( <>
                <Box mb={2} mt={2}>
                  <TextField name='text' onChange={onChangeHandler} value={data.text} type="text" label='Type in the text below' required fullWidth/>
                </Box>
                <Typography variant="h6" color="text.secondary" mt={2}>
                  {confirmationText}
                </Typography>
              </> )
            }
            <DialogActions>
              <Button type='submit' color="primary">
                { loginMode === "login" ? "Login" : (loginMode === "register" ? "Create Account" : "Delete Account") }
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