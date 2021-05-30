import {React} from "react";
import "./App.css";
import Signup from "./components/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import {BrowserRouter as Router, Switch,  Route} from "react-router-dom";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import MainContent from "./components/MainContent";
import Profile from "./components/Profile";
import OtherProfile from "./components/OtherProfile";

function App() {
   return (
      <Router>
         <AuthProvider>
            <Switch>
               <Route path = "/signup" component = {Signup}></Route>
               <Route path = "/login" component = {Login}></Route>
               <PrivateRoute path = "/profile" component = {Profile} ></PrivateRoute>
               <PrivateRoute exact path = "/" component = {MainContent}></PrivateRoute>
               <PrivateRoute exact path = "/otherProfile" component = {OtherProfile}></PrivateRoute>
            </Switch>
         </AuthProvider>
      </Router>
   );
}

export default App;
