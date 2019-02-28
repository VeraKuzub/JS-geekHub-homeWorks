import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './Home/Home'
import Resume from './Resume/Resume'
import Skills from './Skills/Skills'
import Contact from './Contact/Contact'
import './App.css'

const browserHistory = Router.browserHistory;


class App extends Component {

  render() {
    return (
      <div className="App">
        <Router history={browserHistory}>
        <div>
          <nav className="Header-nav">
            <Link to="/">Home</Link>
            <Link to="/resume">Resume</Link>
            <Link to="/skills">Skills</Link>
            <Link to="/contact">Contact me</Link>
          </nav>
          <div className="Main">
            <Route exact path="/" component={Home}/>
            <Route path="/resume" component={Resume}/>
            <Route path="/skills" component={Skills}/>
            <Route path="/contact" component={Contact}/>
          </div>
        </div>
        </Router>
      </div>
    )
  }
};

export default App;