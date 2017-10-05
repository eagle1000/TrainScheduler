  //Pseudocode
  // Create  variables for train name, destination, frequency and first train time
  // collect values for these variables on every submit click and send to Firebase database.
  //Create variables for Next Arrival and Minutes Away based off first train time and freuquency using MomentJS 
  //Read all the data to DOM from firbase database


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCo23qnYnRZr8mGGS_GO2QRu4rlWpQyWPU",
    authDomain: "coder-bay-e5ea9.firebaseapp.com",
    databaseURL: "https://coder-bay-e5ea9.firebaseio.com",
    projectId: "coder-bay-e5ea9",
    storageBucket: "coder-bay-e5ea9.appspot.com",
    messagingSenderId: "128503367852"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  $("#submit-btn").on("click",function(){
    event.preventDefault();
    var audio = $("#whistle")[0];
      audio.play();
    var trainName = $("#train-input").val().trim();
    
    var destination = $("#destination-input").val().trim();
    
    var firstTime = moment($("#time-input").val().trim(),"HH:mm").format("HH:mm");
  
    var frequency = $("#frequency-input").val().trim();
    
    var trainData = {
      name: trainName,
      arrival: destination,
      time: firstTime,
      interval: frequency,
    }

    database.ref().push(trainData);
    console.log(trainData.name);
    //Clear text boxes after form submission
    $("#train-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
  });
//Code to write from database to the DOM
database.ref().on("child_added", function (childSnapshot) {
  var train = childSnapshot.val().name;
  var finalDestination = childSnapshot.val().arrival;
  var trainFrequency = childSnapshot.val().interval;
  var firstTime2 = childSnapshot.val().time;
  //Variable needed to create minutes away and next train time
  var firstTimeConverted = moment(firstTime2, "HH:mm").subtract(1, "years");
  // console.log(firstTimeConverted);
  var currentTime = moment().format("HH:mm");
  // console.log("CURRENT TIME: " + currentTime);
     // Difference between the times
     var diffTime = moment().diff(firstTimeConverted, "minutes");
     // console.log("DIFFERENCE IN TIME: " + diffTime);
     var timeRemainder = diffTime % trainFrequency;
     console.log(timeRemainder);
     // to calculate minutes till train,we store it in a variable
    var minToTrain = trainFrequency - timeRemainder;
    var nextTrain = moment().add(minToTrain, "minutes").format("HH:mm");

     var tableRow = $("<tr>");
     var tableTrain = $("<td class='table-row-data'>").text(train);
     var tableDestination = $("<td class='table-row-data'>").text(finalDestination);
     var tableFrequency = $("<td class='table-row-data'>").text(trainFrequency);
     var tableMinutesAway = $("<td class='table-row-data'>").text(minToTrain);
     var tableNextTrain = $("<td class='table-row-data'>").text(nextTrain)

    tableRow.append(tableTrain);
    tableRow.append(tableDestination);
    tableRow.append(tableFrequency);
    tableRow.append(tableNextTrain);
    tableRow.append(tableMinutesAway);
    $("#info-table").append(tableRow);
  });
