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
const dataRef = database.ref("email");

function send(){
    const email = document.getElementById("email").value;
    dataRef.set(email);
}