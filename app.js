  //Pseudocode
  // Create  variables for train name, destination, frequency and first train time
  // collect values for these variables on every submit click and send to Firebase database.
  //Create variables for Next Arrival and Minutes Away based off first train time and freuquency using MomentJS 
  //Write all the data to DOM from firbase database


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
    
    var trainName = $("#train-input").val().trim();
    console.log(trainName);
    var destination = $("#destination-input").val().trim();
    console.log(destination);
    var firstTime = moment($("#time-input").val().trim(), "HH:mm").format("HH:mm");
    console.log(firstTime);
    var frequency = $("#frequency-input").val().trim();
    console.log(frequency);
    var trainData = {
      name: trainName,
      arrival: destination,
      time: firstTime,
      interval: frequency,
      }
      
    database.ref().push(trainData);
    });
    
 
  