import './moodBoard.css';
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { Container, Box } from '@material-ui/core';
import Button from '@mui/material/Button';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//import { useHistory } from 'react-router-dom';
import Helmet from 'react-helmet';

export default function AddMood() {
  

  const [isLoading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [profile, setProfile] = useState({
        email: '',
        moodValue: '',
        journalEntry: '',
        privateEntry: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const email = JSON.parse(localStorage.getItem('userInfo')).data.email;
      try{
        const getUserResponse = await 
        axios.post('http://localhost:5001/profiles/getUser', { email });
        setCurrentUser(getUserResponse.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [])
  
  //send data to back end with axios
  const AddMood = () => {
        axios.post('http://localhost:5001/users/updateMoodBoard', profile).then( () => {
        window.location.reload(false);
      })
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: '#4843D9',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#4843D9',
        contrastText: '#FFFFFF',
      },
    },
  });
  
  if(isLoading) {
    return ( <div></div> );
  }

  

  return (
    
    <div className="moodBoard" >
        <Container align="center" maxWidth="lg">
        <Helmet>
          <style>{'body { background-color: rgb(244,148,176);} '}</style>
        </Helmet>
            <Box component="span"
            sx={{
                bgcolor: '#4843D9',
                opacity: 0.9,
                width: 600,
                height: 400,
                color: '#4843D9',

                borderColor: '#4843D9',
                border: 20,
                borderRadius: '44px',

                display: 'grid',
                alignItems: 'center',
                justifyContent: 'center',
                pt: 7.5,
                pb: 7.5,
            }}>
            <ThemeProvider theme={theme}>
              <h2>How are you feeling today?</h2>
              <TextField id="outlined-basic" label="Enter a value from 1-10" variant="outlined" value={profile.moodValue} onChange={(event) => {
                  setProfile({ ...profile, moodValue: event.target.value})
              }} />
              <TextField id="outlined-basic" label="What's on your mind today?" variant="outlined" type="journalEntry"
              value={profile.journalEntry} onChange={(event) => {
              setProfile({ ...profile, journalEntry: event.target.value})
              }} />
              <TextField id="outlined-basic" label="Type true to share with your mentor" variant="outlined" value={profile.privateEntry} onChange={(event) => {
                  setProfile({ ...profile, privateEntry: event.target.value, email: currentUser.email})
              }} />
              <Button color="primary" variant="contained" onClick={AddMood}>
                  AddMood
              </Button> 
            </ThemeProvider>
          </Box>
      </Container>
    </div>
    
);
}