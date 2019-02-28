import React from 'react';

const Resume = () => {
	return ( 
		<div>
			<h1> Junior JavaScript developer </h1> 
			<hr/>
			<h2>Summary</h2>
			<p className="center">I believe that I can an asset to you company because <br /> 
			I have shown that I have understanding of the basic skills of JavaScript. <br />
			I have a teachable attitude and a desire to learn.</p>
			<hr/>
			<h2>Experience</h2>
 				<p className="center"><a href="https://github.com/VeraKuzub" rel="noopener noreferrer" target="_blank">Click and go to my profile on the GitHub </a></p>
			<hr/>
			<h2>Skills</h2>
			<ul>
				<li>HTML</li>
				<li>CSS</li>
				<li>JavaScript</li>
				<li>Git</li>
			</ul>
			<hr/>
			<h2>Education</h2> 
			<dl>
				<dt>2018 GeekHub Cherkasy</dt>
				<dd>Studying Javascript</dd> 
			</dl>
				<dl>
				<dt>2006-2008 Cherkasy Institute of Banking of the University of Banking of the National Bank of Ukraine</dt>
				<dd>Banking Specialist</dd> 
			</dl>
			<dl>
				<dt>2001-2007 The Bohdan Khmelnytsky National University of Cherkasy</dt>
				<dd> Master of biology. Biology teacher</dd> 
			</dl>
			<hr/>
			<h2>Personal information</h2>
			<ul>
				<li>Status: Married </li>
				<li>Date of Birth: 19 November 1983 </li>
				<li>Hobbies: I love traveling and doing sport in the gym </li>
			</ul>
		</div>
	)
}
	

export default Resume;