import React, { Component } from 'react';
import './App.css'
import Home from './Home'


class SlideContainer extends Component {
	constructor (props) {
		super (props);
		this.state = {
      data:[],
      dataLength: 0,
      error: null,
      isLoaded: false,
			image: "",
			time: this.props.slideTime
		};
	}

	nextProperty = () => {
    const newIndex = this.state.image.index + 1;
		this.setState({image: this.state.data.images[newIndex]}); 
	}

	prevProperty = () => {
    const newIndex = this.state.image.index - 1;
		this.setState({image: this.state.data.images[newIndex]});	
  }

	tick() {
		 if(this.state.image.index === this.state.dataLength - 1) {
			this.setState({image: this.state.data.images[0]}); 
		} this.nextProperty();
	}

  
  receiveImages (index = 0) {
    fetch("http://localhost:3001", {
        headers: { 'Access-Control-Allow-Origin':'*'},
        method: 'GET'
        })
        .then( response => response.json())
        .then (results => {return results})
        .then (results => {
          this.setState({
          isLoaded: true,
          data: results,
          image: results.images[0],
          dataLength: results.images.length
          });
          },
        (error) => {
        this.setState({
        isLoaded: true,
        error
        });
      }
    )       
  }
	 

	componentDidMount() {
    this.receiveImages();
		this.timerID = setInterval(
			() => this.tick(),
			this.state.time
		);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	render() {
   	const {image, time, dataLength} = this.state;
		let timeInSecond = time/1000;
		return (	
  	<div className="container">
      
      <button onClick={()=>this.nextProperty()} disabled={image.index === dataLength-1}>Next</button>
      <button onClick={()=>this.prevProperty()} disabled={image.index === 0}>Prev</button>
      <Home keyImage= {image.index} src = {image.picture} alt = {image.alt} text = {image.name} />

      <p>Slide speed is {timeInSecond} seconds</p>
    </div>
		)
  }
}

export default SlideContainer;