// Trees, Maps, Linked Links

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
var button = document.getElementById("send_button");
button.addEventListener("click", change);

function change() {
    var myElement = document.getElementById("Intro");
    var inputs = document.getElementsByTagName("input");
    var recents = firebase.database().ref('Patients/');
    recents.once("value")
        .then(function(snapshot) {
            var inDatabase = false;
            for (var i in snapshot.val()) {
                if (i == inputs[0].value) {
                    if (snapshot.child(inputs[0].value + "/Name/").val()
                            == inputs[1].value) {
                        inDatabase = true;
                        break;
                    }
                }
            }
            if (inDatabase == true) {
                button.innerText = "Sent!";
                var childKey = snapshot.child(inputs[0].value).val();
                var displayData = "Info: \n";
                var myEmail = "sushiboyaw@gmail.com"; // Default Email
                for (var j in childKey) {
                  var drugName = snapshot.child(inputs[0].value + "/" + j + "/Drugs/").val();
                  var date = snapshot.child(inputs[0].value + "/" + j + "/Date/").val();
                    if (j == "Email") {
                        myEmail = snapshot.child(inputs[0].value + "/Email/").val();
                    } else {
                        displayData = displayData  + drugName + ", " + date + "\n ";
                    }
                }
                var indexNull = displayData.indexOf("null");
                myElement.innerText = displayData.slice(0, indexNull);
                safety(myEmail, inputs[2].value);
            }
            else {
                myElement.innerText = "Invalid Information";
            }
        });
}

function safety(emailAddress, doctor) {
  const message =
  "From: sushiboyaw@gmail.com\r\n" +
  "To: " + emailAddress + "\r\n" +
  "Subject: IMPORTANT: PROVIDED INFO TO " + doctor + "\r\n\r\n" +
  "We were just notified that you shared your information with another doctor, " +
    doctor + " Please take note.  Thank you.";


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
