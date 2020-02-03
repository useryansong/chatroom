import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import WrappedNormalLoginForm from './Login/Login'
import WrappedRegistrationForm from './Register/Register'



function App() {
  return (
    <Router>
      <Switch>
        <Route path='/login' component={WrappedNormalLoginForm}>
        </Route>
        <Route path='/register' component={WrappedRegistrationForm}>
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
