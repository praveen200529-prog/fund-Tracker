// ================================
// 🔥 Firebase App & Database
// ================================

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIiw1jcMGouxlpbCm1Qfack5ehBfqdASw",
  authDomain: "fund-monitering-tool.firebaseapp.com",
  databaseURL: "https://fund-monitering-tool-default-rtdb.firebaseio.com",
  projectId: "fund-monitering-tool",
  storageBucket: "fund-monitering-tool.firebasestorage.app",
  messagingSenderId: "498728137004",
  appId: "1:498728137004:web:5e79f48cc301df62a3fc89"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Database reference
const db = firebase.database();

// ================================
// 📦 Common Database Functions
// ================================

// Save new data
function saveData(path, data) {
  return db.ref(path).push(data);
}

// Update existing data
function updateData(path, data) {
  return db.ref(path).update(data);
}

// Delete data
function deleteData(path) {
  return db.ref(path).remove();
}

// Read data (real-time)
function readData(path, callback) {
  db.ref(path).on("value", snapshot => {
    callback(snapshot.val());
  });
}

// Read data once
function readOnce(path, callback) {
  db.ref(path).once("value").then(snapshot => {
    callback(snapshot.val());
  });
}