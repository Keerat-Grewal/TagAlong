import logo from './logo.svg';
import './App.css';
import Navigation from './components/Navigation'
import SimpleMap from './components/SimpleMap'
import { Container } from 'react-bootstrap';
import Signup from './components/Signup';
import { AuthProvider } from './contexts/AuthContext';
import {BrowserRouter as Router, Switch,  Route} from 'react-router-dom'
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute'
import MainContent from './components/MainContent';
import Profile from './components/Profile'

function App() {
  return (
     <Router>
     <AuthProvider>
        <Switch>
           <Route path = "/signup" component = {Signup}></Route>
           <Route path = "/login" component = {Login}></Route>
           <PrivateRoute path = "/profile" component = {Profile} ></PrivateRoute>
           <PrivateRoute exact path = "/" component = {MainContent}></PrivateRoute>
         
         </Switch>
        </AuthProvider>
      </Router>


   // {/* <Signup></Signup> */}
   

  );
}

export default App;
