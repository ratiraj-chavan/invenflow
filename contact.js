// ✅ Import Firebase Modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getDatabase, ref, set, push, onValue, remove } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

// ✅ Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyD8HgbEsnfyZg52TyWRMr7nvHqZmPqy4-Y",
    authDomain: "invenflow-14344.firebaseapp.com",
    projectId: "invenflow-14344",
    storageBucket: "invenflow-14344.appspot.com",
    messagingSenderId: "793435005040",
    appId: "1:793435005040:web:29b2314c6513b7b2e994b5"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Form submission event
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    const contactData = {
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString()
    };

    // Store data in Firebase Realtime Database
    push(ref(database, "contactMessages"), contactData)
        .then(() => {
            console.log("Message sent successfully");
            alert("Your message has been sent successfully!");
            document.getElementById('contact-form').reset();
        })
        .catch(error => {
            console.error("Error sending message:", error);
            alert("There was an error sending your message. Please try again.");
        });
});