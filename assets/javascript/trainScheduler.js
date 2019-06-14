//   Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyDsAUlA2lBhDY9qBbPLlGpgsDBY5xm1Aho",
authDomain: "trainscheduler-c2a25.firebaseapp.com",
databaseURL: "https://trainscheduler-c2a25.firebaseio.com",
projectId: "trainscheduler-c2a25",
storageBucket: "trainscheduler-c2a25.appspot.com",
messagingSenderId: "485330656695",
appId: "1:485330656695:web:8cc4f4d0a7bbf6a7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var connectionRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");
// var test = "this is a test";
// database.ref().push({abc: test});

//   A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "ready!" )

    
});