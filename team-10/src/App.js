import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Topbar from './components/topbar/Topbar';

import Login from './pages/login/login';
import SignUp from './pages/signup/signup';
import SignUpMentor from './pages/signupmentor/signupmentor';
import MoodBoard from './pages/mood/mood';
import MenteeBoard from './pages/menteeBoard/menteeBoard.jsx';
import UserPage from './pages/user/user';


function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginContainer}/>
        <Route path="/login" component={LoginContainer}/>
        <Route exact path="/signup" component={SignUpContainer}/>
        <Route exact path="/signupmentor" component={SignUpMentorContainer}/>
        <Route component={DefaultContainer}/>
      </Switch>
    </Router>
  );
}

const LoginContainer = () => (
    <div className="container">
      <Route exact path='/' render={() => <Redirect to='/login' />} />
      <Route path='/login' component={Login} />
    </div>
)

const SignUpContainer = () => (
  <div className="container"><SignUp /></div>
)

const SignUpMentorContainer = () => (
  <div className="container"><SignUpMentor /></div>
)

const DefaultContainer = () => (
  <div>
  <Topbar />
      <div className="container">
        <Switch>
          <Route path="/user"> <UserPage /> </Route>
          <Route path="/moodBoard"> <MoodBoard /> </Route>
          <Route path="/menteeBoard"><MenteeBoard /></Route>
        </Switch>
      </div>
  </div>
)

export default App;

