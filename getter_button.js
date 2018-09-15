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

    var recents = firebase.database().ref('Users/');
    recents.once("value")
        .then(function(snapshot) {
            var inDatabase = false;
            for (var i in snapshot.val()) {
                if (i == inputs[0].value) {
                    if (snapshot.child(inputs[0].value + "/Patient Name/").val() 
                            == inputs[1].value) {
                        inDatabase = true;
                        break;
                    }
                }
            }
            if (inDatabase == true) {
                var childKey = snapshot.child(inputs[0].value + "/Medicine/").val();
                var displayData = "Drugs: ";
                for (var j in childKey) {
                    displayData = displayData + j + ", ";
                }
                myElement.innerText = displayData;
            }
            else {
                myElement.innerText = "Invalid Information";
            }
        });
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
