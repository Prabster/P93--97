const firebaseConfig = {
    apiKey: "AIzaSyAjjn2hkeRBsmYSazo4b1TseA167_sGQJw",
    authDomain: "letschat-ede28.firebaseapp.com",
    databaseURL: "https://letschat-ede28-default-rtdb.firebaseio.com",
    projectId: "letschat-ede28",
    storageBucket: "letschat-ede28.appspot.com",
    messagingSenderId: "721903023657",
    appId: "1:721903023657:web:574df896a3f0d4c5550e38",
    measurementId: "G-PGZMLCXRJ4"
  };
  
  firebase.initializeApp(firebaseConfig);

  room_name = localStorage.getItem("room_name");

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;

         name = message_data["name"];
         message = message_data["message"];
         like = message_data["like"];

         name_tag = "<h4>" + name + " <img src='tick.png' class='user_tick'></h4>";
         message_tag = "<h3>" + message + "</h3>";
         button_tag = "<button class='btn btn-warning' id='" + firebase_message_id + "' value=" + like + " onclick='updateLike(this.id)'>";
         span_tag = "<span class='glyphicon glyphicon-thumbs-up'>likes:" + like + "</span></button><hr>";

         row = name_tag + message_tag + button_tag + span_tag;
         document.getElementById("output").innerHTML += row;
      } });  }); }
getData();

function send() {
      user_name = localStorage.getItem("user_name");
      room_name = localStorage.getItem("room_name");

      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name : user_name,
            message : msg,
            like : 0
      })

      document.getElementById("msg").value = "";
}

function updateLike(message_id) {
      like = document.getElementById(message_id).value;
      update_like = Number(like) + 1;
      firebase.database().ref(room_name).child(message_id).update({
            like : update_like
      })
}