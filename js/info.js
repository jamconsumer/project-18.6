const firebaseConfig = {
    apiKey: "AIzaSyB32m_60dE9gS_1JYibfMGW-YBhpAzRRE4",
    authDomain: "esp32-project-b664f.firebaseapp.com",
    databaseURL: "https://esp32-project-b664f-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "esp32-project-b664f",
    storageBucket: "esp32-project-b664f.appspot.com",
    messagingSenderId: "926100602550",
    appId: "1:926100602550:web:aca4e015d4c08b272f3017"
  };
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const dataRefEmail = database.ref("email");
const dataRefPass = database.ref("password");
let passwordValue;
dataRefPass.once('value')
  .then(function(snapshot) {
    passwordValue = snapshot.val(); 
  })
  .catch(function(error) {
    console.error('Error fetching data:', error);
  });
function passcheck() {
  let pass = document.getElementById("pass").value;
  if (passwordValue == pass){
    window.location.href = "webcam.html";
  }
  else{
    alert("wrong, try again");
  }
}
function send(){
  const email = document.getElementById("email").value;
  dataRefEmail.set(email);
}
