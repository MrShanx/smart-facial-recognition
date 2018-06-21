import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo = () => {
	return (
		//tachyons: margin 4, margin top 0
		//react-tilt package
		<div className='Tilt-container ma4 mt0'>
			<Tilt className="Tilt shadow-2" 
				  options={{ reverse: true, max : 55 }} 
				  style={{height: 150, width: 150, borderRadius: '5%'}} >
 				<div className="Tilt-inner pa3">
 					<img style={{paddingTop: '10px'}} src={brain} alt="xray skull & brain" />
 				</div>
			</Tilt>
		</div>
	);
}

export default Logo;