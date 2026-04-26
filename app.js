const firebaseConfig = {
  apiKey: "AIzaSyB2HSAqONJvBwu5YHTvL3_BBJw1ICSQHzM",
  authDomain: "lalalala-7715f.firebaseapp.com",
  projectId: "lalalala-7715f",
  storageBucket: "lalalala-7715f.firebasestorage.app",
  messagingSenderId: "587306754939",
  appId: "1:587306754939:web:3c52403f77807a21eb93de",
  measurementId: "G-3G1E5CHBBF"
};

/* INIT FIREBASE */
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/* COLLECTIONS */
const scheduleRef = db.collection("schedule");
const messagesRef = db.collection("messages");

/* ADD CLASS (ADMIN) */
function add() {
  scheduleRef.add({
    subject: subject.value,
    start: start.value,
    end: end.value,
    status: "pending"
  });
}

/* SEND MESSAGE (STUDENT) */
function send() {
  let msg = document.getElementById("msg");
  messagesRef.add({
    text: msg.value
  });
  msg.value = "";
}

/* ACTIONS (ADMIN) */
function done(id) {
  scheduleRef.doc(id).update({ status: "done" });
}

function cancel(id) {
  scheduleRef.doc(id).update({ status: "cancel" });
}

function del(id) {
  scheduleRef.doc(id).delete();
}

/* REALTIME DATA */
let dbSchedule = [];
let dbMessages = [];

/* LIVE SCHEDULE */
scheduleRef.onSnapshot(snapshot => {
  dbSchedule = [];
  snapshot.forEach(doc => {
    dbSchedule.push({ id: doc.id, ...doc.data() });
  });

  if (typeof renderAdmin === "function") renderAdmin();
  if (typeof renderStudent === "function") renderStudent();
});

/* LIVE MESSAGES */
messagesRef.onSnapshot(snapshot => {
  dbMessages = [];
  snapshot.forEach(doc => {
    dbMessages.push(doc.data().text);
  });

  if (typeof renderAdmin === "function") renderAdmin();
  if (typeof renderStudent === "function") renderStudent();
});
