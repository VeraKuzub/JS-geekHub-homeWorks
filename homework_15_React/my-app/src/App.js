import React, { Component } from 'react';
import './App.css'
import SlideContainer from './SlideContainer'

class App extends Component {
  
  render() {
  
    return (
      <div className="App">
      <SlideContainer slideTime = "5000"/>
      <SlideContainer slideTime = "10000"/>
      </div>
    )
  }
}

export default App;