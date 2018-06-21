This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app)

## Smart-Facial-Recognition full-stack application

### Goal
To create an application and deploy it as a finished product. <br>

### Application
This smart app takes an image, detects faces on it, then displays demographics based on what it thinks each face is.
- Process:
  - user must register or login as a tester (predefined user) inorder to use the app
  - once logged in, user is taken to the app homepage
  - app takes user submitted image via url/link/webaddress 
  - app detects face(s) on the image and highlights them
    - upon successful face detection, user's score is increased
    - top 3 users are highlighted on the homepage
  - user may click on the highlighted faces to view its demographics (based on what the app thinks it is)
  - user may login/out anytime, with their progress saved

### Technology
Image recognition API is provided by [Clarifai](https://clarifai.com/developer) - a web service that provides image and video recognition  

### Development
- Front-end developed with React.js
  - features: 
    - [particles.js](https://www.npmjs.com/package/react-particles-js) - for page background effects
    - Modal - for lightbox showcasing of demographical statistics
- Backend: 
  - Server created using Node.js and Express.js
    - code: [smart-face-recognition-api](https://github.com/mrshanx/smart-face-recognition-api)
  - Database created using PostgreSql relational db <br>
 
### Hosting
App is hosted on [Heroku](https://www.heroku.com/) - a cloud application platform <br> <br>

#### [View App](https://smart-facial-recognition.herokuapp.com/) <br> <br>

### JSX, CSS, ES6
### Node, Express
### PostgreSql

