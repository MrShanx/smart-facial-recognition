import React from 'react';
import './Register.css';

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			name: ''
		}
	}

	onNameChange = (event) => {
		this.setState({name: event.target.value});
	}

	onEmailChange = (event) => {
		this.setState({email: event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({password: event.target.value});
	}

	onSubmitRegister = () => {
		var p_element = document.createElement('p');
		if(this.state.email.length === 0 || this.state.name.length === 0 || this.state.password.length === 0) { //if any data field was left blank
			//remove child first if there is one
			const p_parent_div = document.getElementById('register-notification');
			if(p_parent_div.firstChild !== null) {
				p_parent_div.removeChild(p_parent_div.firstChild);
			}
			//add child next
			p_element.appendChild(document.createTextNode('please enter required information'));
			p_element.setAttribute('class', 'red b grow shrink'); //tachyons
			p_parent_div.appendChild(p_element);
		} else {
			//--connection to server, create new user
			fetch('https://serene-wildwood-51035.herokuapp.com/register', {
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					email: this.state.email,
					password: this.state.password,
					name: this.state.name
				})
			})
				.then(response => response.json())
				.then(user => {
					if(user.id) {
						this.props.loadUser(user); //load user profile
						this.props.onRouteChange('home'); //go to app home page
					} else if(user === 'unable to register') {
						//no connection to database
						//remove child first if there is one
						const p_parent_div = document.getElementById('register-notification');
						if(p_parent_div.firstChild !== null) {
							p_parent_div.removeChild(p_parent_div.firstChild);
						}
						//add child next
						p_element.appendChild(document.createTextNode('unexpected error'));
						p_element.setAttribute('class', 'red b grow shrink'); //tachyons
						p_parent_div.appendChild(p_element);
					}
					else {
						 //email was not left blank, possible that email is already registered
						//remove child first if there is one
						const p_parent_div = document.getElementById('register-notification');
						if(p_parent_div.firstChild !== null) {
							p_parent_div.removeChild(p_parent_div.firstChild);
						}
						//add child next
						p_element.appendChild(document.createTextNode('email is already registered'));
						p_element.setAttribute('class', 'red b grow shrink'); //tachyons
						p_parent_div.appendChild(p_element);
					}
				})
				.catch(console.log);		
		}
	}

	render() {
		return (
		//TACHYONS framework Register form code
		<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">	
			<main className="pa4 black-80">
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f1 fw6 ph0 mh0">Register</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
			        <input 
			        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        	type="text" 
			        	name="name"  
			        	id="name" 
			        	onChange={this.onNameChange} />
			      </div>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
			        <input 
			        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        	type="email" 
			        	name="email-address"  
			        	id="email-address" 
			        	onChange={this.onEmailChange}/>
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input 
			        	className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        	type="password" 
			        	name="password"  
			        	id="password"
			        	onChange={this.onPasswordChange} />
			      </div>
			    </fieldset>
			    <div className="">
			      <input 
			      	onClick={this.onSubmitRegister}
			      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
			      	type="submit" 
			      	value="Register" />
			      	<p className="white" id="register-notification"></p>
			    </div>
			  </div>
			</main>
		</article>
		);
	}
}

export default Register;
