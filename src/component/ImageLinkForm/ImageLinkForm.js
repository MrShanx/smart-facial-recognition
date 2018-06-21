import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
	return(
		<div>
			<p className='f4'>
				{'This Smart Brain predicts the demographics of people in your pictures. Try it!'}
			</p>
			<div className="center">
				{/*centered padd, border-radius (circular edges), box-shadow (3d look)*/}
				<div className="center form pa4 br3 shadow-5">
					{/*font, padding, width70%, centered*/}
					<input className="f4 pa2 w-70 center" id="url-input" type="text" onChange={onInputChange} />
					<button className="w-30 grow f4 link ph3 
									   pv2 dib white bg-dark-green"
									   onClick={onPictureSubmit}
									   >
									   Detect </button>
				</div>
			</div>
		</div>
	)
}

export default ImageLinkForm;