import "./menteeBoard.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function User() {

  const [isLoading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [currentMentee, setCurrentMentee] = useState({});

  let history = useHistory();
  const goToUserPage = () => { history.push('/user')};

  useEffect(() => {
    const fetchData = async () => {
      let email = JSON.parse(localStorage.getItem('userInfo')).data.email;
      try{
        const getUserResponse = await 
        axios.post('http://localhost:5001/users/getUser', { email });
        setCurrentUser(getUserResponse.data);

        if(currentUser.mentor == null) {
            let email = currentUser.mentee;
            console.log(email);
            const getMenteeResponse = await 
            axios.post('http://localhost:5001/users/getUser', { email });
            setCurrentMentee(getMenteeResponse.data);
        }
        
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
        {currentMentee.email}
      </div>
    );
  
}