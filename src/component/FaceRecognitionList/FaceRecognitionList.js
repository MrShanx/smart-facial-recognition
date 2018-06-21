import React, { Component } from 'react';
//MODAL 1
import ReactModal from 'react-modal';
ReactModal.setAppElement('#root');


//MODAL 2
//MAIN MODAL DESIGN
const customStyles = {
  overlay : {
    position		 : 'fixed', /* Stay in place */
    zIndex			 : 1, /* Sit on top */
    paddingTop		 : '100px', /* Location of the box */
    left 			 : 0,
    top 			 : 0,
    width 			 : '100%', /* Full width */
    height 			 : '100%', /* Full height */
    overflow   		 : 'auto', /* Enable scroll if needed */
    backgroundColor  : 'rgba(51,51,0,0.4)', 
	},
  content : {
  	position		 : 'relative',
    backgroundColor  : '#fefefe',
    margin			 : 'auto',
    padding          : 0,
    border           : '1px solid #888',
    width            : '80%',
    boxShadow        : '0 4px 8px 0 rgba(0,0,0,0.1),0 6px 20px 0 rgba(0,0,0,0.19)',
  	animation        : 'animatetop 0.4s'
  }
};

class FaceRecognitionList extends Component {
	constructor(props) {
		super(props);
		//MODAL 3
		this.state = {
			showModal: false,
		}
	}

	//custom() for Modal 4
	  openModal = () => {
	    this.setState({showModal: true})
	  }

	  closeModal = () => {
	    this.setState({showModal: false})
	  }

	render() {
		//MODAL 5
    	const { showModal } = this.state;
    	const { face_box, face_stats } = this.props;
    	return (
			<div className='bounding-box'
				 style={{
				 		top: face_box.topRow, 
				 		right: face_box.rightCol, 
				 		left: face_box.leftCol, 
				 		bottom: face_box.bottomRow
				 		}}>
				<div className="modal-box" onClick={this.openModal}>
				</div>
				<Modal 
					showModal={showModal} 
					closeModal={this.closeModal}
					modalStats={face_stats} /> 
			</div>
		);
	}
}

const Modal = ({ showModal, closeModal, modalStats }) => (
	<ReactModal
	    className="modal"
	    isOpen={showModal}
	    onRequestClose={closeModal}
	    shouldCloseOnOverlayClick={true}
	    style={customStyles}
    	>
		<div className="modal">
				<div className="modal-header">
					<div><span onClick={closeModal} 
					   className="close-modal white pointer f2">
					   &times;</span></div>
					<h3 className="bb">Demographics</h3>
				</div>
				<div className="modal-content">
					<div className="gender-stat-container">
						<table>
							<tbody>
								<tr>
									<th className="stat-left f6 gray">GENDER APPEARANCE</th>
									<th className="stat-right f6 gray">Probability</th>
								</tr>
								<tr>
									<td className="stat-left black b f5 bb b--light-red">{modalStats.gender1}</td>
									<td className="stat-right black f5 bb b--light-red">{Number(modalStats.gender1Stats).toFixed(3)}</td>
								</tr>
								<tr>
									<td className="stat-left b f5 bb b--light-red">{modalStats.gender2}</td>
									<td className="stat-right f5 bb b--light-red">{Number(modalStats.gender2Stats).toFixed(3)}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="age-stat-container">
						<table>
							<tbody>
								<tr>
									<th className="stat-left f6 gray">AGE APPEARANCE</th>
									<th className="stat-right f6 gray">Probability</th>
								</tr>
								<tr>
									<td className="stat-left b f5 bb b--light-red">{modalStats.age}</td>
									<td className="stat-right f5 bb b--light-red">{Number(modalStats.ageStats).toFixed(3)}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="culture-stat-container">
						<table>
							<tbody>
								<tr>
									<th className="stat-left f6 gray">MULTICULTURAL APPEARANCE</th>
									<th className="stat-right f6 gray">Probability</th>
								</tr>
								<tr>
									<td className="stat-left b f5 bb b--light-red">{modalStats.culture1}</td>
									<td className="stat-right f5 bb b--light-red">{Number(modalStats.culture1Stats).toFixed(3)}</td>
								</tr>
								<tr>
									<td className="stat-left b f5 bb b--light-red">{modalStats.culture2}</td>
									<td className="stat-right f5 bb b--light-red">{Number(modalStats.culture2Stats).toFixed(3)}</td>
								</tr>
								<tr>
									<td className="stat-left b f5 bb b--light-red">{modalStats.culture3}</td>
									<td className="stat-right f5 bb b--light-red">{Number(modalStats.culture3Stats).toFixed(3)}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div className="modal-footer">
					<h4><a href="https://clarifai.com/models">Clarifai API</a></h4>
				</div>
		</div>
	</ReactModal>
);

export default FaceRecognitionList;