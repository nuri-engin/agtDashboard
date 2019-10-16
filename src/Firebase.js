import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAoXqY-psb9DlAVTCeGlBI8xU-I1fiUXVY",
  authDomain: "agtcloudapp.firebaseapp.com",
  databaseURL: "https://agtcloudapp.firebaseio.com",
  projectId: "agtcloudapp",
  storageBucket: "agtcloudapp.appspot.com",
  messagingSenderId: "574496063309",
  appId: "1:574496063309:web:5dd707cb667441cc374104",
  measurementId: "G-GCSQ2T7J6E"
};

firebase.initializeApp(config);

export default firebase;