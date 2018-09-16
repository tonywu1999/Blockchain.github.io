 var button = document.getElementById("my_button");
 button.addEventListener("click", attack);
 var inputs = document.getElementsByTagName("input");

function attack() {
  const message =
  "From: sushiboyaw@gmail.com\r\n" +
  "To: " + inputs[3].value + "\r\n" +
  "Subject: IMPORTANT: PLEASE KEEP YOUR PATIENT ID\r\n\r\n" +
  +
  " Note the blank line between the header information and the body of the message.";


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
