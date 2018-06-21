import React, { Component } from 'react';
import './FaceRecognition.css';
import FaceRecognitionList from '../FaceRecognitionList/FaceRecognitionList.js';

class FaceRecognition extends Component {
//({ imageUrl, box, instruction }) => {
	constructor(props) {
		super(props);
		//MODAL 3
		this.state = {
		}
	}

	render() {
		let index = 0;
		const { imageUrl, instruction, stats, faceDetected } = this.props;		
		// console.log(!imageUrl.length, !Object.keys(box).length, !faceDetected);
		//--return instructions if:no image, no facebox, no face detected

		return (stats[index] === 0 && !faceDetected && !imageUrl.length) ?
		(
			<div className="center instruct-container">	
				<p className="instruct_slide-up">no image, face, stats detected</p>
			</div>		
		) :
			  	(
					<div className="center instruct-container">
						<p className="instruct_slide-up pb4">{instruction}</p>
						<div className="mt5 pt2 absolute">
							<img id="inputImage" alt="" src={imageUrl} width="500px" height="auto" />
							 {   
							 	stats.map((face_data) => {
									return (
										<FaceRecognitionList 
											key={face_data.statIndex} //has to be unique
											face_box={face_data} 
											face_stats={face_data} />
									)
								})	
							}		
						</div>
					</div>
				);
	}
}

export default FaceRecognition;

