import firebase from 'firebase';

try {  
  var config = {
    apiKey: "AIzaSyAJ2FhIZr1HjN9lg70nbGWnBe0h4A_26HQ",
    authDomain: "react-todo-app-23567.firebaseapp.com",
    databaseURL: "https://react-todo-app-23567.firebaseio.com",
    storageBucket: "react-todo-app-23567.appspot.com",
    messagingSenderId: "335314579496"
  };

  firebase.initializeApp(config);
} catch (e) {

}

export var firebaseRef = firebase.database().ref();

export default firebase;
