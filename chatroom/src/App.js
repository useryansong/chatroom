import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import WrappedNormalLoginForm from './Login/Login'
import WrappedRegistrationForm from './Register/Register'
import Main from './Main/Main'



function App() {

  return (
    <Router>
      <Switch>
        <Route path='/login' component={WrappedNormalLoginForm}>
        </Route>
        <Route path='/register' component={WrappedRegistrationForm}>
        </Route>
        <Route path='/main' component={Main}>
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
