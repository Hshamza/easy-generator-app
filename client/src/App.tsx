import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './components/Signup/SignUp';
import SignIn from './components/SignIn/SignIn';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from './components/Home/Home';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route path="/home" component={Home} />
          <Route path="/" component={SignUp} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;
