// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getDatabase, ref, set, onValue, remove, push } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

// Firebase Configuration 
const firebaseConfig = {
    apiKey: "AIzaSyD8HgbEsnfyZg52TyWRMr7nvHqZmPqy4-Y",
    authDomain: "invenflow-14344.firebaseapp.com",
    databaseURL: "https://invenflow-14344-default-rtdb.firebaseio.com",
    projectId: "invenflow-14344",
    storageBucket: "invenflow-14344.appspot.com",
    messagingSenderId: "793435005040",
    appId: "1:793435005040:web:29b2314c6513b7b2e994b5",
    measurementId: "G-5ZQJRF0RJJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics
if (typeof window !== "undefined") {
    getAnalytics(app);
}

// Initialize Firebase Authentication and Database
const auth = getAuth(app);
const database = getDatabase(app);
const inventoryRef = ref(database, "inventory");

// ✅ Signup Function
window.signup = function () {
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }
    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert("Signup successful! Redirecting...");
            window.location.href = "dashboard.html";
        })
        .catch(error => {
            console.error("Signup Error:", error);
            alert("Signup failed. Please check your email and try again.");
        });
};

// ✅ Login Function
window.login = function () {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then(() => window.location.href = "pages/dashboard.html")
        .catch(error => alert(error.message));
};

// ✅ Logout Function
window.logout = function () {
    signOut(auth).then(() => window.location.href = "pages/login.html");
};

// ✅ Function to Add Inventory Item (PUT Request)
window.addItem = function () {
    const name = document.getElementById("itemName")?.value.trim();
    const quantity = document.getElementById("itemQuantity")?.value.trim();
    const location = document.getElementById("itemLocation")?.value.trim();

    if (!name || !quantity || !location) {
        alert("Please fill in all fields.");
        return;
    }

    // ✅ Generate a unique key for each item
    const inventoryRef = ref(database, "inventory");
    const newItemRef = push(inventoryRef);

    // ✅ Set data at the generated key
    set(newItemRef, {
        name: name,
        quantity: quantity,
        location: location
    })
    .then(() => {
        console.log("✅ Item added successfully:", name, quantity, location);
        alert("Item added successfully!");
        document.getElementById("itemName").value = "";
        document.getElementById("itemQuantity").value = "";
        document.getElementById("itemLocation").value = "";
    })
    .catch(error => {
        console.error("❌ Error adding item:", error);
        alert("Failed to add item: " + error.message);
    });
};

// ✅ Function to Display Inventory in Real-Time
onValue(inventoryRef, (snapshot) => {
    const inventoryTable = document.getElementById("inventory-tbody");
    inventoryTable.innerHTML = ""; // Clear table before reloading data

    snapshot.forEach((childSnapshot) => {
        const item = childSnapshot.val();
        const itemId = childSnapshot.key; // Get unique item key
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.location}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteItem('${itemId}')">Delete</button>
            </td>
        `;
        inventoryTable.appendChild(row);
    });
});

// ✅ Function to Delete an Item
window.deleteItem = function (itemId) {
    remove(ref(database, `inventory/${itemId}`))
        .then(() => alert("Item deleted successfully!"))
        .catch(error => alert("Failed to delete item: " + error.message));
};
console.log("🔥 Firebase Initialized:", app);
console.log("🔗 Database Reference:", database);
console.log("📁 Inventory Reference:", inventoryRef);