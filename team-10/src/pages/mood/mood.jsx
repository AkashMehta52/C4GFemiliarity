import sademoji from './img/sademoji.svg';
import slhappyemoji from './img/slightlyhappyemoji.svg';
import neutralemoji from './img/neutralemoji.svg';
import slsademoji from './img/slightlysademoji.svg';
import happyemoji from './img/happyemoji.svg';
import './mood.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Helmet from 'react-helmet';


function MoodScale() {

  useEffect(() => {
    const fetchData = async () => {
      const email = JSON.parse(localStorage.getItem('userInfo')).data.email;
      try{
        const getUserResponse = await 
        axios.post('http://localhost:5001/users/getUser', { email });
        setCurrentUser(getUserResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [])

  const [currentUser, setCurrentUser] = useState({});
  const [moodValue, setMood] = useState("3");
  const [journalEntry, setJournal] = useState("");
  const [privateEntry, setPriv] = useState(true); //private or not, private initially

  const history = useHistory();
  const goToHome = () => { history.push('/user'); }

  const AddMood = () => {
    goToHome();
    console.log(moodValue);
    console.log(journalEntry);
    console.log(privateEntry);
    axios.put('http://localhost:5001/users/updateMoodBoard', { email: currentUser.email, moodValue: moodValue, journalEntry: journalEntry, privateEntry: privateEntry.toString() })
    .then( () => {
      goToHome();
    })
  
  }

  

  return (
    <div className="App">
      <Helmet>
        <style>{'body { background-color: rgb(244,148,176);} '}</style>
      </Helmet>
      <div class="container flex">
        <div class="item"><button onClick={() => setMood('1')} data-toggle="buttons" class="btn btn-secondary"><img src={sademoji} alt="" class="emoji"/></button></div>
        <div class="item"><button onClick={() => setMood('2')} data-toggle="buttons" class="btn btn-secondary"><img src={slsademoji} alt="" class="emoji"/></button></div>
        <div class="item"><button onClick={() => setMood('3')} data-toggle="buttons" class="btn btn-secondary"><img src={neutralemoji} alt="" class="emoji"/></button></div>
        <div class="item"><button onClick={() => setMood('4')} data-toggle="buttons" class="btn btn-secondary"><img src={slhappyemoji} alt="" class="emoji"/></button></div>
        <div><button onClick={() => setMood('5')} data-toggle="buttons" class="btn btn-secondary"><img src={happyemoji} alt="" class="emoji"/></button></div>
      </div>
      <div class="container2">
        <div class="form-floating">
          <textarea class="form-control comment-box" placeholder="Leave a comment here" id="floatingTextarea2" style={{height: "100px", width: "500px"}} onChange={(event) => setJournal(event.target.value)} ></textarea>
          <label for="floatingTextarea2">How are you feeling today?</label>
          <div class="custom-control custom-switch">
            <input type="checkbox" class="custom-control-input" id="customSwitches" onClick={() => setPriv(Boolean(Number(privateEntry) + 1 % 2))} />
            <label class="custom-control-label" for="customSwitches">Share with mentor</label>
          </div>
          <button variant="contained" class="btn btn-primary btn-wrapper" onClick={AddMood}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default MoodScale;