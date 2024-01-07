// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB32m_60dE9gS_1JYibfMGW-YBhpAzRRE4",
  authDomain: "esp32-project-b664f.firebaseapp.com",
  databaseURL: "https://esp32-project-b664f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "esp32-project-b664f",
  storageBucket: "esp32-project-b664f.appspot.com",
  messagingSenderId: "926100602550",
  appId: "1:926100602550:web:aca4e015d4c08b272f3017"
};
const destinationFirebaseConfig = {
apiKey: "AIzaSyAh1qnvbpJow1-Qcl0VEjILClBFTge-1yU",
authDomain: "servo2-9f3ae.firebaseapp.com",
databaseURL: "https://servo2-9f3ae-default-rtdb.europe-west1.firebasedatabase.app",
projectId: "servo2-9f3ae",
storageBucket: "servo2-9f3ae.appspot.com",
messagingSenderId: "1057538766938",
appId: "1:1057538766938:web:dd89e1d7aaaacc17004063"
};
const destinationFirebaseApp = firebase.initializeApp(destinationFirebaseConfig, 'destinationApp');
firebase.initializeApp(firebaseConfig);
const img = document.getElementById('img');
const ref = firebase.database().ref('/camIP'); 
const database = firebase.database();
const ServoX = destinationFirebaseApp.database().ref('servoX');
const ServoY = destinationFirebaseApp.database().ref('servoY');
const LaserRef = destinationFirebaseApp.database().ref('laser');
const VarRef = destinationFirebaseApp.database().ref('y');
const HorRef = destinationFirebaseApp.database().ref('x');
let xaxis = 119;
let yaxis = 119;
let ver = "center";
let hor = "center";
ref.once('value')
.then(snapshot => {
 const link = snapshot.val(); 
 img.src = link;
})
.catch(error => {
  console.error('Error fetching data:', error);
});
// איתחול קוקוססד
let cocoSsd;

function startObjectDetection() {
    console.log('Loading COCO-SSD model...');
    cocoSsd = ml5.objectDetector('cocossd', {}, modelLoaded);
}

function modelLoaded() {
    console.log('COCO-SSD Model Loaded!');
    detectObjects();
}

function detectObjects() {
    // השגת אלאמט הוידיאו
const video = document.getElementById('img');
const canvas = document.getElementById('canvas');

    // מזהה את האובייקטים מהאתר
cocoSsd.detect(video, function (err, results) {
if (err) {
  console.error(err);
} else {
if (results.length > 0) {
  console.log(results); // הדפסה לקונסול את האובייקט
  // ציור סביב אותו האוביקט
  drawBoxes(canvas, results);
  //בדיקה איפה האוביקט ממוקם
  if ((results[0].x + (results[0].width/2)) < 260 ){
      if (xaxis < 255){
          xaxis += 1;
          hor = "left";
      }
   }
  else if((results[0].x + (results[0].width/2)) > 380 ){
        if (xaxis > 0){
            xaxis -= 1;
            hor = "right";
        }
   }
  else{
    hor = "center";
   }
    if ((results[0].y + (results[0].height/2)) < 180 ){
      if (yaxis > 0){
        ver = "up";
        yaxis -= 1;
      }
     }
     else if((results[0].y + (results[0].height/2)) > 300 ){
      if (yaxis < 255){
        ver = "down";
        yaxis += 1;
      }
     }
     else{
      ver = "center";
     }
laser(1);
led(ver,hor);
send(xaxis,yaxis);
} else if (results.length === 0) {
    // ניקוי הקנוס
    clearCanvas(canvas);
    laser(0);
  }
requestAnimationFrame(detectObjects);
   }
    });
}
function drawBoxes(canvas, objects) {
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    // ציור על הכנבס
    objects.forEach(object => {
        context.beginPath();
        context.rect(object.x, object.y, object.width, object.height);
        context.lineWidth = 2;
        context.strokeStyle = 'green';
        context.fillStyle = 'green';
        context.stroke();
        context.fillText(object.label, object.x, object.y - 5);
    });
}

function clearCanvas(canvas) {
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
}

// תחילת זיהוי אובייקט כאשר הדפדפן ניטען
window.onload = startObjectDetection;

function reset(){
  ServoX.set(119);
  ServoY.set(119);
  xaxis = 119;
  yaxis = 119;
  detectObjects();
}
function laser(value) {
LaserRef.set(value)
}
function send(xaxis,yaxis){
ServoX.set(xaxis);
ServoY.set(yaxis);
}
function led(ver,hor){
VarRef.set(ver);
HorRef.set(hor);
}