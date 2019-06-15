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
    //console.log(childSnapshot.val());
    // get values from firebase
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().firstTrainTime;
    var frequency = childSnapshot.val().frequency;
    var nextArrival = "";
    var minutesAway = "";

    // perform calculations on Next Arrival and Minutes Away fields
    var arrayFTT = firstTrainTime.split(":");
    var hrs = arrayFTT[0];
    var mins = arrayFTT[1];
    var now = moment();
    var momFirstTrainTime = moment();
    momFirstTrainTime.set({hour:parseInt(hrs),minute:parseInt(mins),second:0,millisecond:0});
    momFirstTrainTime.toISOString()
    momFirstTrainTime.format()
    var minutesNowMinusFirst = now.diff(momFirstTrainTime);
    var minutesNowMinusFirst = moment.duration(minutesNowMinusFirst).asMinutes();
    
    // train arrival logic
    if(minutesNowMinusFirst <= 0){
        // first train hasn't come yet
        nextArrival = momFirstTrainTime.format("HH:mm");
        minutesAway = Math.abs(Math.floor(minutesNowMinusFirst));
    }
    else{
        // all other train intervals
        var minutes = minutesNowMinusFirst % frequency;
        var hours = parseInt(minutesNowMinusFirst / frequency);
        nextArrival = momFirstTrainTime.add(frequency*(hours+1), "minutes");
        minutesAway = Math.ceil(moment.duration(nextArrival.diff(now)).asMinutes()); 
        nextArrival = nextArrival.format("HH:mm");    
    }
   
    // create columns with values on page
    var newTrainName = $("<td>");
    var newDestination = $("<td>");
    var newFrequency = $("<td>");
    var newNextArrival = $("<td>");
    var newMinutesAway = $("<td>");
    
    newTrainName.text(trainName);
    console.log(trainName);
    newDestination.text(destination);
    newFrequency.text(frequency);
    newNextArrival.text(nextArrival);
    newMinutesAway.text(minutesAway);

    // dipslay values on page
    var newRow = $("<tr>");
    newRow.append(newTrainName);
    newRow.append(newDestination);
    newRow.append(newFrequency);
    newRow.append(newNextArrival);
    newRow.append(newMinutesAway);
    $("#currentTrainSchedule > tbody").append(newRow);
});