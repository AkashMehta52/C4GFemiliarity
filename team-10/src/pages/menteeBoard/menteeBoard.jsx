import "./menteeBoard.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function User() {

  const [isLoading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [currentMentee, setCurrentMentee] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      let email = JSON.parse(localStorage.getItem('userInfo')).data.email;
      try{
        const getUserResponse = await axios.post('http://localhost:5001/users/getUser', { email });
        setCurrentUser(getUserResponse.data);
        
        email = currentUser.mentee;
        const getMenteeResponse = await axios.post('http://localhost:5001/users/getUser', { email });
        setCurrentMentee(getMenteeResponse.data);
        console.log(currentMentee.moodBoard[0].day);
        
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

    return (
      <div>
        {currentMentee.moodBoard[5].moodValue}
        {currentMentee.moodBoard[1].moodValue}
      </div>
    );
  
}