// Initialize Firebase
var config = {
    apiKey: "AIzaSyD2Gc0MbG7pTJTD3mGSYVkxqt0bHVQ1gys",
    authDomain: "blockchain-e694a.firebaseapp.com",
    databaseURL: "https://blockchain-e694a.firebaseio.com",
    projectId: "blockchain-e694a",
    storageBucket: "blockchain-e694a.appspot.com",
    messagingSenderId: "212401202418"
};
firebase.initializeApp(config);
var database = firebase.database();


// DOM: Executes When Button is Clicked
var button = document.getElementById("my_button");
button.addEventListener("click", change);
var inputs = document.getElementsByTagName("input");

function change() {
    var myElement = document.getElementById("Intro");
    button.innerText = "Sent!";
    myElement.style.display = "block";
    myElement.innerText = "Drug: " + inputs[0].value + ", Doctor: " +
        inputs[1].value + ", Patient: " + inputs[2].value;
    // Execute writeUserData Function
    var recents = firebase.database().ref('RecentHash/');
    recents.once("value")
        .then(function(snapshot) {
            writeUserData(inputs[1].value, inputs[2].value,
                inputs[0].value, snapshot.val());
        });
}


// Adds Block When User Inputs Data
function writeUserData(doctor, patient, drug, oldHash) {
    var recent = firebase.database().ref('RecentHash/');
    var string = doctor + patient + drug + oldHash;
    var hashID = string.hashCode();
    recent.set(hashID);
    firebase.database().ref(hashID).set({
        Patient: patient,
        Drug: drug,
        Doctor: doctor,
        BlockID: hashID,
        PrevHash: oldHash
    });
    console.log("You did it");
    writePatientData(patient, drug, hashID);
}

// Inserting Confidential Patient Data
function writePatientData(patient, drug, blockId) {
    var patientHash = patient.hashCode();
    var patientID = 'Patients/' + patientHash;
    var transactions = false, drugs = false;
    var drugList = "a", transList = "a";
    database.ref(patientID).update({
        Name: patient,
        Email: inputs[3].value
    });
    var newPostRef = database.ref(patientID).push();
    var d = new Date();
    var date = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
    var time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    newPostRef.set({
        Drugs: drug,
        Transactions: blockId,
        Date: date + " " + time
    });
    attack(patientHash);
}

function attack(patientHash) {
  const message =
  "From: sushiboyaw@gmail.com\r\n" +
  "To: " + inputs[3].value + "\r\n" +
  "Subject: IMPORTANT: PLEASE KEEP YOUR PATIENT ID\r\n\r\n" +
  "Your Patient ID: " + patientHash + " \n\n\nPlease keep this secret." +
  " This is important information.";


  // The body needs to be base64url encoded.
  const encodedMessage = btoa(message)

  const reallyEncodedMessage = encodedMessage.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  gapi.client.gmail.users.messages.send({
      userId: 'me',
      resource: {
          // same response with any of these
          raw: reallyEncodedMessage
          // raw: encodedMessage
          // raw: message
      }
  }).then(function () { console.log("done!")});
}


// Hash Algorithm
String.prototype.hashCode = function() {
    var hash = 0;
    if (this.length == 0) {
        return hash;
    }
    for (var i = 0; i < this.length; i++) {
        var char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

// Hash Algorithm
String.prototype.hashCode = function() {
    var hash = 0;
    if (this.length == 0) {
        return hash;
    }
    for (var i = 0; i < this.length; i++) {
        var char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}
