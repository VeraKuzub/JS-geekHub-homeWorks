import React from 'react';
import './Home.css';

const Home = () => {
	return ( 
		<div className='homeContainer'>
		<p> Hey, I'm  Vera Kuzub <br/> 
		<br/>
		junior JavaScript developer</p>
		<a href="https://github.com/VeraKuzub" rel="noopener noreferrer" target="_blank"><img src={require('./GitHubLogo.png')} alt="GitHub"/></a>
		<a href="https://www.facebook.com/v.kuzub" rel="noopener noreferrer" target="_blank"><img src={require('./facebookLogo.png')} alt="facebook"/></a>
		</div>
		)
	}

export default Home;