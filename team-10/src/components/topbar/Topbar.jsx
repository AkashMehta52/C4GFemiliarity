import React from "react";
import "./topbar.css";
import IconButton from "@material-ui/core/IconButton";
import LogoutIcon from '@mui/icons-material/Logout';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function Topbar() {

  //routing
  const history = useHistory();
  const goToLogin = () => { history.push('/login'); }
  const goToHome = () => {history.push('/user');}
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
    <div className="topbar">
      <div className="topbarWrapper">
      <ThemeProvider theme={theme}>
        <div className="topLeft">
          <span className="logo">Welcome to Femiliarity :)</span>
        </div>
        <div className="topLeft">
        <Button variant="contained" class="btn btn-primary1 btn-wrapper1" onClick={goToHome}>
          Return to User Page
        </Button>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <IconButton onClick={goToLogin}>
              <LogoutIcon />
            </IconButton>
          </div>
        </div>
        </ThemeProvider>        
      </div>
    </div>
  );
}
