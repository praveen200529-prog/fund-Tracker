// Firebase Configuration File
// This file contains the Firebase configuration and initialization
// Import this file in any HTML page that needs Firebase access

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyB69HkygosCAqBhOTb0GG1bkjou0hY-OTc",
    authDomain: "fund-monitoring-tool.firebaseapp.com",
    databaseURL: "https://fund-monitoring-tool-default-rtdb.firebaseio.com",
    projectId: "fund-monitoring-tool",
    storageBucket: "fund-monitoring-tool.firebasestorage.app",
    messagingSenderId: "607672867078",
    appId: "1:607672867078:web:2923b3347d4739aa80e687",
    measurementId: "G-GVBX2LCHX1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get Database Reference
const database = firebase.database();

// Export for use in other files
window.firebaseConfig = firebaseConfig;
window.database = database;

console.log("Firebase initialized successfully!");