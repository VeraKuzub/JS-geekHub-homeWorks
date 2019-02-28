import React from 'react';
import './Contact.css';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	fname: '', 
    	lname: '', 
    	subject: '', 
    	email: '',
    	error: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
  	if (event.target.id === "fname") this.setState({fname: event.target.value});
  	if (event.target.id === "lname") this.setState({lname: event.target.value});
  	if (event.target.id === "subject") this.setState({subject: event.target.value});
  	if (event.target.id === "email") this.setState({email: event.target.value});
  }

  

  handleSubmit(event) {
    event.preventDefault();
    let data = {
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      text: this.state.subject
    }
    console.log('dataToSend', data);
    this.sendForm(data);
    }


   sendForm (data) {
    
  	fetch ("http://localhost:3001/contact", {
          headers: { "Access-Control-Allow-Origin":"*", "Content-Type": "application/json"},
          method: 'post',
          body: JSON.stringify(data)
          })
      .then (response => response.json())
      .then (results => {
        console.log(results);
        return results;} , 
      	error => {this.setState({error})
  	});
  }


  render() {
    return (
    	<div className="contactContainer">
	    	<h2>Contact Me </h2>
		    <p>You can leave me a message</p>
		    
	    	<div className="column">
		      <form onSubmit={this.handleSubmit} action="/contact" method="post">
		        <label>
		          First Name:
		          <input type="text" id="fname" name="fname" placeholder="Your name.."  onChange={this.handleChange} />
		        </label>
		         <label>
		          Last Name:
		          <input type="text" id="lname" name="lname" placeholder="Your last name.."  onChange={this.handleChange} />
		        </label>
		        <label>
		          Email:
		          <input type="email" id="email" name="email" placeholder="Your email.."  onChange={this.handleChange} />
		        </label>
		        <label>
		        Subject
        		<textarea id="subject" name="subject" placeholder="Write something.."  onChange={this.handleChange}></textarea>
        		</label>
		        <input type="submit" value="Submit" />
		      </form>
			  
			</div>
      </div>
    );
  }
}

export default Contact;