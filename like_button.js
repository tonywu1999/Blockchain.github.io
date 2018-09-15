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
function change() {
    var myElement = document.getElementById("Intro");
    var inputs = document.getElementsByTagName("input");
    myElement.innerHTML = "Drug: " + inputs[0].value + ", Doctor: " +
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
    recent.set(string.hashCode());
    firebase.database().ref('ID: '+string.hashCode()).set({
        Patient: patient,
        Drug: drug,
        Doctor: doctor,
        BlockID: string.hashCode(),
        PrevHash: oldHash
    });
    console.log("You did it");
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
