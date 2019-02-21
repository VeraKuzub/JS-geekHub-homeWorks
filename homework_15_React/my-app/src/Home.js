import React, { Component } from 'react';
import Card from './Card'

class Home extends Component {
	render() {
		return (
		<div className="card-container">
			<Card src = {this.props.src} alt= {this.props.alt} text={this.props.text}/>
		</div>
		);
	}
}

export default Home;