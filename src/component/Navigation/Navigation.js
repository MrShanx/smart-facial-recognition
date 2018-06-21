import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn } ) => {
		//if signed in, return home page
		if(isSignedIn) {
			return (
				<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				{/* onClick: function definition syntax below, () => onRoute
					otherwise function is called when rendered */}
					<p 
						onClick={() => onRouteChange('signout')}
						className='f3 link dim black 
								  underline pa3 pointer'>Sign Out</p>
				</nav>
			);
		} 
		//user isnt signed in
		//returns sign in and register nav
		else {
				return (
				<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				{/* onClick: function definition syntax below, () => onRoute
					otherwise function is called when rendered */}
					<p 
						onClick={() => onRouteChange('signin')}
						className='f3 link dim black 
								  underline pa3 pointer'>Sign In</p>
					<p 
						onClick={() => onRouteChange('register')}
						className='f3 link dim black 
								  underline pa3 pointer'>Register</p>
				</nav>
			);
		}
}

export default Navigation;

