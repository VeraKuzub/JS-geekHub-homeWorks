import React from 'react';
import './App.css';


const Card = ({src,alt,text}) => {
	return ( 
		<div>
	    <h1>Image slideshow</h1>
	    <p><img className="image" src = {src} alt= {alt}/><br />{text}</p>	
      	</div>
	)
}

export default Card;