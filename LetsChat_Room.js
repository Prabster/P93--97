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

    function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
      document.getElementById("output").innerHTML = "";
      snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;

                  row = "<div id=" + Room_names + " onclick='redirectToRoomName(this.id)'>#" + Room_names + "</div><hr>";
                  document.getElementById("output").innerHTML += row;
            });
      });
}
getData();

user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome " + user_name;

function addRoom() {
      room_name = document.getElementById("room_name").value;

      firebase.database().ref("/").child(room_name).update({
            purpose: "addingRoom"
      })

      localStorage.setItem("room_name", room_name);

      window.location = "LetsChat_page.html"
}

function redirectToRoomName(name) {
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "LetsChat_page.html";
}

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}