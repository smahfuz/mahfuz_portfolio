import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, runTransaction, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1B8gg-rY2-qkpdUk714nyn2AC8o89210",
  authDomain: "bishnupur-directory.firebaseapp.com",
  projectId: "bishnupur-directory",
  storageBucket: "bishnupur-directory.firebasestorage.app",
  messagingSenderId: "305761322819",
  appId: "1:305761322819:web:aa1a3ad490f096cceb51f6",
  measurementId: "G-E833R2FDDM",
  databaseURL: "https://bishnupur-directory-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const visitorCountRef = ref(db, 'visitorCount');

// Increment visitor count once per session
if (!sessionStorage.getItem('hasVisited')) {
  runTransaction(visitorCountRef, (currentValue) => {
    return (currentValue || 0) + 1;
  }).then(() => {
    sessionStorage.setItem('hasVisited', 'true');
  }).catch((error) => {
    console.error("Error updating visitor count: ", error);
  });
}

// Listen for changes and update the UI
onValue(visitorCountRef, (snapshot) => {
  const count = snapshot.val() || 0;
  const counterEl = document.getElementById('visitor-count-val');
  if (counterEl) {
    counterEl.textContent = count.toLocaleString();
  }
}, (error) => {
  console.error("Error reading visitor count: ", error);
});
