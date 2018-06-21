import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './component/Navigation/Navigation.js';
import FaceRecognition from './component/FaceRecognition/FaceRecognition.js';
import SignIn from './component/SignIn/SignIn.js';
import Register from './component/Register/Register.js';
import Logo from './component/Logo/Logo.js';
import ImageLinkForm from './component/ImageLinkForm/ImageLinkForm.js';
import Rank from './component/Rank/Rank.js';

import './App.css';


const particlesOptions = {
  particles: {
    number: {
      value: 15,
      density: {
        enable: true,
        value_area: 700,
      }
    }
  }
}

//initial state to default values, reset state as needed
const initialState = {
      //for predict Function from API
      input: '',
      //for react image output
      imageUrl: '',
      //for ALL FACES: faceboxes -- NOT USED, consolidated boxes into stats[]
      box: [],
      //if face detected, true.
      faceDetected: false,
      //for ALL FACES: data stats/probabilities -- contains both box and stats
      stats: [],
      //state: signin signout
      //keeps track of where we are on the page
      route: 'signin',
      //isSignedIn for navigation update for different pages
      isSignedIn: false,
      //userprofile object
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''//returns current data upon first execution
      },

      instruction: '',

      //users top 3 in entries
      rankings: {
        firstName: '',
        firstEntries: 0,
        secondtName: '',
        secondEntries: 0, 
        thirdName: '',
        thirdEntries: 0,  
      },
    }

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  //load rankings 
  loadRankings = () => {
    fetch('https://serene-wildwood-51035.herokuapp.com/rankings')
      .then(response => response.json())
      .then(rankings => {
        this.setState({ //this way works out, instead of passing rankings obj to Rank.js -- errors out
          rankings: {
            firstName: rankings[0].name,
            firstEntries: rankings[0].entries,
            secondName: rankings[1].name,
            secondEntries: rankings[1].entries, 
            thirdName: rankings[2].name,
            thirdEntries: rankings[2].entries,  
          }
        })
      })
      .catch(console.log);
  }

  //for userprofile state
  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  }

  //custom() for signin/singout
  onRouteChange = (route) => {
    if(route === 'signout') { //go to signin page
      this.setState(initialState); //reset to default values
    } else if(route === 'home') { //go to app page
      this.loadRankings(); //load user ranks (top 3)
      this.setState({isSignedIn: true});
    }
    this.setState({route: route}); //go to register page
  }

  //custom
  calculateFaceLocations = (data) => {
    const num_faces = data.outputs[0].data.regions.length; //clarifai detected faces count
    const image = document.getElementById('inputImage'); //user submitted img
      //convert image specs into num
      const width = Number(image.width);
      const height = Number(image.height);
    let stats_temp = [];
    for(let i = 0; i < num_faces; i++) {
      let clarifaiFace = data.outputs[0].data.regions[i].region_info.bounding_box;
          //clarifai returns percentage of where the
          //four corners of the face should be
          let leftCol = clarifaiFace.left_col * width;
          let topRow = clarifaiFace.top_row * height;
          let rightCol = width - (clarifaiFace.right_col * width);
          let bottomRow = height - (clarifaiFace.bottom_row * height);
      stats_temp = this.state.stats;
      stats_temp[i].leftCol = leftCol;
      stats_temp[i].rightCol = rightCol;
      stats_temp[i].topRow = topRow;
      stats_temp[i].bottomRow = bottomRow;
      this.setState(Object.assign(this.state.stats, {stats: stats_temp}));  
    }
    return []; // consolidated box into stats[]
  }

  //sets box coordinates into state
  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  //gets gender, age, culture stats
  getStats = (response_data) => {
    const region_count = response_data.outputs[0].data.regions.length; //count of all face_regions detected
    // console.log(response_data.outputs[0].regions.length);
    let facial_regions = []; //array for face_region stats
    for(let i=0; i < region_count; i++) {
      //gender data
      const gender1 = response_data.outputs[0].data.regions[i].data.face.gender_appearance.concepts[0].name;
      const gender1Stats = response_data.outputs[0].data.regions[i].data.face.gender_appearance.concepts[0].value;
      const gender2 = response_data.outputs[0].data.regions[i].data.face.gender_appearance.concepts[1].name;
      const gender2Stats = response_data.outputs[0].data.regions[i].data.face.gender_appearance.concepts[1].value;
      //age data
      const age = response_data.outputs[0].data.regions[i].data.face.age_appearance.concepts[0].name;    
      const ageStats = response_data.outputs[0].data.regions[i].data.face.age_appearance.concepts[0].value;    
      //culture data
      const culture1 = response_data.outputs[0].data.regions[i].data.face.multicultural_appearance.concepts[0].name;
      const culture1Stats = response_data.outputs[0].data.regions[i].data.face.multicultural_appearance.concepts[0].value;    
      const culture2 = response_data.outputs[0].data.regions[i].data.face.multicultural_appearance.concepts[1].name;
      const culture2Stats = response_data.outputs[0].data.regions[i].data.face.multicultural_appearance.concepts[1].value;    
      const culture3 = response_data.outputs[0].data.regions[i].data.face.multicultural_appearance.concepts[2].name;
      const culture3Stats = response_data.outputs[0].data.regions[i].data.face.multicultural_appearance.concepts[2].value;    
      //face obj for each regiondetected
      //consolidation of face_stats and box_coordinates
      let face_obj_temp = {
        gender1: gender1,
        gender1Stats: gender1Stats,
        gender2: gender2,
        gender2Stats: gender2Stats,
        age: age,
        ageStats: ageStats,
        culture1: culture1,
        culture1Stats: culture1Stats,
        culture2: culture2,
        culture2Stats: culture2Stats,
        culture3: culture3,
        culture3Stats: culture3Stats,
        statIndex: i,
        leftCol: 0,
        rightCol: 0,
        topRow: 0,
        bottomRow: 0
      }
      //add each face obj to region array
      facial_regions.push(face_obj_temp);
    } 
    return facial_regions; 
  }

  //sets face probabilities into state
  displayInfo = (stats) => {
    this.setState({stats: stats}) 
  }

  //sets faceDetected to true upon API success
  apiSuccess = () => {
    this.setState({faceDetected: true});
  }

  //sets faceDetected to false upon API error
  apiError = () => {
    this.setState({faceDetected: false});
  }

  //setInstructions upon detect button click
  displayInstructions = (instruct) => {
    this.setState({instruction: instruct});
  }

  //image url textfield change handler
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  //upon image submission, call upon clarifai api for processing
  onPictureSubmit = () => {
    const image_url_length = this.state.input.length;
    const image_url = this.state.input;
    let instruction_string = "";
    if(image_url_length === 0) { //if no url is submitted
      this.displayInstructions(`Please submit a valid image link`);
    } else { //else process img url
      this.setState({imageUrl: image_url})
      fetch('https://serene-wildwood-51035.herokuapp.com/imageurl', { //Clarifai API call in backend, using api key
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            input: image_url
          })
      }).then(response => response.json())
      //predict function: model type, Image passed,
        //this.state.input is used, not imageUrl 
        //(react hasnt processed imageUrl, but input is ready to go)
        .then(response => {
          //--connection to server-api, update user entry count
          const response_string = typeof response.outputs[0].data.regions; //need typeof when comparing a var and undefined
          //checks if API didnt error out && if API detected a face
          if(response_string === "undefined") { //didnt detect a face
              instruction_string = "did not detect a clear face";            
            }
          if(response !== "unable to work with API" && response_string !== "undefined") { //responds with obj{} if face is detected
            fetch('https://serene-wildwood-51035.herokuapp.com/image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
              .then(response => response.json())
              .then(count => {
                this.setState(Object.assign(this.state.user, {entries: count})) //update object without deleting other values - hence Object.assign
                //update rankings
                this.loadRankings();
              })
              .catch(console.log)
            //set instructions after link success
            this.displayInstructions(`Click the face(s) for some stats.`)
            //get and set info for each face onto state -- ORDER MATTERS 1/2
            this.displayInfo(this.getStats(response))
            //this. - since function is part of the class -- ORDER MATTERS 2/2
            this.displayFaceBox(this.calculateFaceLocations(response))
            //set faceDetected to true
            this.apiSuccess();
          } else {
            //reset box to empty
            this.displayFaceBox([]);
            //set faceDetected to false, upon api error
            this.apiError();
            //reset image link upon error
            this.setState({imageUrl: ''})
            //clarifai couldnt process link
            this.displayInstructions(instruction_string);
          }
          //clear image url input field once text has been processed
          const url_input_field = document.getElementById('url-input');
          url_input_field.value = "";
          //clear this.state.input once img url has been processed
          this.setState({input: ""});
        })
        .catch(err => {
          //reset box to empty
          this.displayFaceBox([]);
          //set faceDetected to false, upon api error
          this.apiError();
          //reset image link upon error
          this.setState({imageUrl: ''})
          //clarifai couldnt process link
          this.displayInstructions(`Please submit a valid image link`);
          //clear image url input field once text has been processed
          const url_input_field = document.getElementById('url-input');
          url_input_field.value = "";
          //clear this.state.input once img url has been processed
          this.setState({input: ""});
          })//promise catch method
      }
  }

  render() {
    const { isSignedIn, imageUrl, route, instruction, stats, faceDetected } = this.state;
    return (
      <div className="App">
        <Particles 
          className="particles"
          params={particlesOptions}
        />
        <Navigation 
          isSignedIn={isSignedIn} 
          onRouteChange={this.onRouteChange}/>
        { 
          route === "home" 
          ? (
              //otherwise: route = app page, return everything
              <div>
                <Logo />
                <Rank name={this.state.user.name} entries={this.state.user.entries} rankings={this.state.rankings} />
              {/*this.onInputChange - since function is part of the class*/}
                <ImageLinkForm 
                  onInputChange={this.onInputChange} 
                  onPictureSubmit={this.onPictureSubmit} />
                <FaceRecognition     
                  imageUrl={imageUrl} 
                  instruction={instruction}
                  stats={stats} 
                  faceDetected={faceDetected} />
              </div>
            )
          : (
            //goes to register if route != signin || home
              route === "signin" || route === "signout"
              ? //return signin page
                <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : //return register page
                <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            )
        }
      </div>
    );
  }
}

export default App;
