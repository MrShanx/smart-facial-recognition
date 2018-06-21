import React from 'react';
import './SignIn.css';

class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state ={
			signInEmail: '',
			signInPassword: ''
		}
	}

	onEmailChange = (event) => {
		this.setState({signInEmail: event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value});
	}

	onSubmitSignIn = () => {
		const email = this.state.signInEmail;
		const password = this.state.signInPassword;
		var p_element = document.createElement('p');
		if(email.length === 0 || password.length === 0) { //if any data field was left blank
			//remove child first if there is one
			const p_parent_div = document.getElementById('signin-notification');
			if(p_parent_div.firstChild !== null) {
				p_parent_div.removeChild(p_parent_div.firstChild);
			}
			//add child next
			p_element.appendChild(document.createTextNode('please enter required information'));
			p_element.setAttribute('class', 'red b grow shrink'); //tachyons
			p_parent_div.appendChild(p_element);
		} else {
			//--connection to server-api, login if user valid
			fetch('https://serene-wildwood-51035.herokuapp.com/signin', {
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					email: email,
					password: password
				})
			})
				.then(response => response.json())
				.then(user => {
					if(user.id) { //if theres a user id, login
						this.props.loadUser(user);
						this.props.onRouteChange('home');
					} else if(user === 'unexpected error') {
						//no connection to database
						//remove child first
						const p_parent_div = document.getElementById('signin-notification');
						p_parent_div.removeChild(p_parent_div.firstChild);
						//add child next
						p_element.appendChild(document.createTextNode('unexpected error'));
						p_element.setAttribute('class', 'red b grow shrink'); //tachyons
						p_parent_div.appendChild(p_element);
					}
					else { //show login error
						//remove child first
						const p_parent_div = document.getElementById('signin-notification');
						p_parent_div.removeChild(p_parent_div.firstChild);
						//add child next
						p_element.appendChild(document.createTextNode('invalid login'));
						p_element.setAttribute('class', 'red b grow shrink'); //tachyons
						p_parent_div.appendChild(p_element);
					}
				})
				.catch(console.log);
		}		
	}

	render() {
		const { onRouteChange } = this.props;
		return (
				//TACHYONS framework signIn form code
				<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">	
					<main className="pa4 black-80">
					  <div className="measure">
					    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
					        <input 
					        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        	type="email" 
					        	name="email-address"  
					        	id="email-address"
					        	placeholder="tester"
					        	onChange={this.onEmailChange} />
					      </div>
					      <div className="mv3">
					        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
					        <input 
					        	className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        	type="password" 
					        	name="password"  
					        	id="password" 
					        	placeholder="tester"
					        	onChange={this.onPasswordChange} />
					      </div>
					    </fieldset>
					    <div className="">
					    {/* onClick: function definition syntax below, () => onRoute
							otherwise function is called when rendered */}
					      <input 
					      	onClick={this.onSubmitSignIn}
					      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
					      	type="submit" 
					      	value="Sign in" />
					    </div>
					    <div className="lh-copy mt3">
					      <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
						</div>
						<div className="f6 white grow-large" id="signin-notification">
						  	<p className="">Register or login as a tester.</p>
						</div>
					  </div>
					</main>
				</article>
		);
	}
}

export default SignIn;
