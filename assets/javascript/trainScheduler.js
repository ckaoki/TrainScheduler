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


//   A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "ready!" )  
    
});


// Add new train schedule
$(document).on("click","#submitButton", function(event){
    event.preventDefault();
    // get values from page
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrainTime = $("#firstTrainTime").val().trim();
    var frequency = $("#frequency").val().trim();
    console.log(firstTrainTime);


    // push values to firebase
    database.ref().push({
        "trainName": trainName,
        "destination":destination,
        "firstTrainTime": firstTrainTime,
        "frequency": frequency});
}); 

// firebase event for new train schedule.
// Updates page.
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    // get values from firebase
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().firstTrainTime;
    var frequency = childSnapshot.val().frequency;

    // perform calculations on Next Arrival and Minutes Away fields


    // create columns with values on page
    var colTrainName = $("<td>");
    var colDestination = $("<td>");
    var colFrequency = $("<td>");
    var colNextArrival = $("<td>");
    var colMinutesAway = $("<td>");
    
    colTrainName.text(trainName);
    console.log(trainName);
    colDestination.text(destination);
    colFrequency.text(frequency);

    // dipslay values on page
    var newRow = $("<tr>");
    newRow.append(colTrainName);
    newRow.append(colDestination);
    newRow.append(colFrequency);
    newRow.append(colNextArrival);
    newRow.append(colMinutesAway);
    $("#currentTrainSchedule > tbody").append(newRow);
});