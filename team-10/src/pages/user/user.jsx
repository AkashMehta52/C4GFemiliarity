import { MailOutline, PermIdentity } from "@material-ui/icons";
import "./user.css";
import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function User() {

  const [isLoading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({});

  let history = useHistory();
  const goToMoodBoard = () => { history.push('/moodBoard')};
  const goToMenteeBoard = () => { history.push('/menteeBoard')};

  useEffect(() => {
    const fetchData = async () => {
      const email = JSON.parse(localStorage.getItem('userInfo')).data.email;
      try{
        const getUserResponse = await 
        axios.post('http://localhost:5001/users/getUser', { email });
        setCurrentUser(getUserResponse.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [])

  if(isLoading) {
    return ( <div></div> );
  }

  if(currentUser.mentor != null){
    return (
      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">Profile</h1>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img
                src={currentUser.picture}
                alt=""
                className="userShowImg"
              />
              <div className="userShowTopTitle">
                <span className="userShowUsername"></span>
                <span className="userShowUserTitle"></span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Details</span>
              <div className="userShowInfo">
                  <PermIdentity className="userShowIcon" />
                  <span className="userShowInfoTitle">{currentUser.firstName} {currentUser.lastName}</span>
                </div>
                <div className="userShowInfo">
                  <MailOutline className="userShowIcon" />
                  <span className="userShowInfoTitle">{currentUser.email}</span>
                </div>
                <div className="userShowInfo">
                  <MailOutline className="userShowIcon" />
                  <span className="userShowInfoTitle">{currentUser.mentor} (mentor)</span>
                </div>
                <div className="userShowInfo">
                <Button color="primary" variant="contained" onClick={goToMoodBoard}>
                Post a mood?
                </Button>
              </div>
                

            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Profile</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={currentUser.picture}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername"></span>
              <span className="userShowUserTitle"></span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Details</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">{currentUser.firstName} {currentUser.lastName}</span>
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{currentUser.email}</span>
              </div>
              
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{currentUser.mentee} (mentee)</span>
              </div>
              <div className="userShowInfo">
                <Button color="primary" variant="text" onClick={goToMenteeBoard}>
                View Your Mentee's Board
                </Button>
              </div>
              
          </div>
        </div>
      </div>
    </div>
  );
  
}
