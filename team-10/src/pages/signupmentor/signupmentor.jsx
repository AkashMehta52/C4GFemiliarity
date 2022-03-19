import './signupmentor.css';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Container, Box } from '@material-ui/core';
import Button from '@mui/material/Button';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';
import Helmet from 'react-helmet';

export default function CreateMentorProfile() {

  const [profile, setProfile] = useState({
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      mentee: '',
  });

  let history = useHistory();
  const goToLogin = () => { history.push('/login'); }
  const goToMenteeSignup = () => { history.push('/signup'); }

  //send data to back end with axios
  const CreateProfile = () => {
        axios.post('http://localhost:5001/users', profile).then( () => {
        window.location.reload(false); 
      })
      goToLogin();
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: '#DCA563',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#DCA563',
        contrastText: '#FFFFFF',
      },
    },
  });
  
  return (
    <div className="signUp">
      <Helmet>
        <style>{'body { background-color: rgb(244,148,176);} '}</style>
      </Helmet>
        <Container align="center" maxWidth="lg">
            <Box component="span"
            sx={{
                bgcolor: '#FFFFFF',
                opacity: 0.9,
                width: 600,
                height: 600,
                color: '#DCA563',

                borderColor: '#DCA563',
                border: 20,
                borderRadius: '44px',

                display: 'grid',
                alignItems: 'center',
                justifyContent: 'center',
                pt: 7.5,
                pb: 7.5,
            }}>
            <ThemeProvider theme={theme}>
              <h2>Connect to your Mentee</h2>
              <TextField id="outlined-basic" label="Email" variant="outlined" value={profile.email} onChange={(event) => {
                  setProfile({ ...profile, email: event.target.value})
              }} />
              <TextField id="outlined-basic" label="First Name" variant="outlined" value={profile.firstName} onChange={(event) => {
                  setProfile({ ...profile, firstName: event.target.value})
              }} />
              <TextField id="outlined-basic" label="Last Name" variant="outlined" value={profile.lastName} onChange={(event) => {
                  setProfile({ ...profile, lastName: event.target.value})
              }} />
              <TextField id="outlined-basic" label="Password" variant="outlined" type="password"
              value={profile.password} onChange={(event) => {
              setProfile({ ...profile, password: event.target.value})
              }} />
              <TextField id="outlined-basic" label="Mentee Email" variant="outlined"
              value={profile.mentee} onChange={(event) => {
              setProfile({ ...profile, mentee: event.target.value})
              }} />
              <Button color="primary" variant="contained" onClick={CreateProfile}>
                  Sign Up
              </Button>
              <Button color="primary" variant="text" onClick={goToLogin}>
              Back to Login
              </Button>
              <Button color="primary" variant="text" onClick={goToMenteeSignup}>
              Back to Mentee Sign Up
              </Button>
            </ThemeProvider>
          </Box>
        </Container>
    </div>
);
}