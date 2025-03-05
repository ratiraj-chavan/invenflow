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

console.log("🔥 Firebase Initialized:", app);
console.log("🔗 Database Reference:", database);

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
        .then(userCredential => {
            console.log("✅ User Created:", userCredential.user);
            alert("Signup successful! Redirecting to dashboard...");
            window.location.href = "dashboard.html";
        })
        .catch(error => {
            console.error("❌ Signup Error:", error.code, error.message);
            alert("Signup Failed: " + error.message);
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
        .then(() => {
            alert("✅ Login successful! Redirecting to dashboard...");
            window.location.href = "dashboard.html";
        })
        .catch(error => {
            console.error("❌ Login Error:", error);
            alert(error.message);
        });
};

// ✅ Logout Function
window.logout = function () {
    signOut(auth).then(() => {
        alert("✅ Logged out successfully!");
        window.location.href = "login.html";
    }).catch(error => {
        console.error("❌ Logout Error:", error);
    });
};

// ✅ Protect Dashboard (Restrict Unauthorized Access)
window.onload = function () {
    onAuthStateChanged(auth, (user) => {
        if (window.location.pathname.includes("dashboard.html")) {
            if (!user) {
                alert("❌ You must be logged in to access the dashboard.");
                window.location.href = "login.html";
            } else {
                loadUserInventory(user.uid);
            }
        }
    });
};

// ✅ Function to Add Inventory Item
window.addItem = function () {
    console.log("📝 addItem function triggered");

    const name = document.getElementById("itemName")?.value.trim();
    let quantity = parseInt(document.getElementById("itemQuantity")?.value.trim(), 10);
    const location = document.getElementById("itemLocation")?.value.trim();

    if (!name || isNaN(quantity) || quantity <= 0 || !location) {
        alert("⚠️ Please fill in all fields with valid data.");
        return;
    }

    const user = auth.currentUser; // Get the logged-in user
    if (!user) {
        alert("❌ User not logged in!");
        return;
    }

    console.log("📌 Item Details:", { name, quantity, location });

    const inventoryRef = ref(database, `users/${user.uid}/inventory`);
    const newItemRef = push(inventoryRef); // Creates a unique item entry

    set(newItemRef, { name, quantity, location })
        .then(() => {
            console.log("✅ Item added:", name, quantity, location);
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
function loadUserInventory(userId) {
    console.log("📡 Loading inventory for user:", userId);

    const inventoryRef = ref(database, `users/${userId}/inventory`);
    
    onValue(inventoryRef, (snapshot) => {
        console.log("📡 Data received from Firebase:", snapshot.val());

        const inventoryTable = document.getElementById("inventory-tbody");
        inventoryTable.innerHTML = ""; // Clear table before reloading data

        snapshot.forEach((childSnapshot) => {
            const item = childSnapshot.val();
            const itemId = childSnapshot.key;
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${item.name}</td>
                <td>
                    <button class="btn btn-sm btn-success" onclick="increaseQuantity('${userId}', '${itemId}', ${item.quantity}, '${item.name}', '${item.location}')">+</button>
                    ${item.quantity}
                    <button class="btn btn-sm btn-warning" onclick="decreaseQuantity('${userId}', '${itemId}', ${item.quantity}, '${item.name}', '${item.location}')">-</button>
                </td>
                <td>${item.location}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="deleteItem('${userId}', '${itemId}')">Delete</button>
                </td>
            `;
            inventoryTable.appendChild(row);
        });
    });
}

// ✅ Function to Increase Quantity
window.increaseQuantity = function (userId, itemId, currentQuantity, itemName, itemLocation) {
    const user = auth.currentUser;
    if (!user || user.uid !== userId) {
        alert("🚫 Unauthorized action.");
        return;
    }

    const itemRef = ref(database, `users/${userId}/inventory/${itemId}`);
    
    set(itemRef, { name: itemName, location: itemLocation, quantity: currentQuantity + 1 })
        .then(() => {
            console.log("✅ Quantity increased!");
        })
        .catch(error => {
            console.error("❌ Error increasing quantity:", error);
        });
};

// ✅ Function to Decrease Quantity
window.decreaseQuantity = function (userId, itemId, currentQuantity, itemName, itemLocation) {
    const user = auth.currentUser;
    if (!user || user.uid !== userId) {
        alert("🚫 Unauthorized action.");
        return;
    }

    const itemRef = ref(database, `users/${userId}/inventory/${itemId}`);

    if (currentQuantity > 1) {
        set(itemRef, { name: itemName, location: itemLocation, quantity: currentQuantity - 1 })
            .then(() => {
                console.log("✅ Quantity decreased!");
            })
            .catch(error => {
                console.error("❌ Error decreasing quantity:", error);
            });
    } else {
        deleteItem(userId, itemId);
    }
};

// ✅ Function to Delete an Item
window.deleteItem = function (userId, itemId) {
    const user = auth.currentUser;

    if (!user || user.uid !== userId) {
        alert("🚫 Unauthorized! You can only delete your own items.");
        return;
    }

    remove(ref(database, `users/${userId}/inventory/${itemId}`))
        .then(() => {
            alert("✅ Item deleted successfully!");
        })
        .catch(error => {
            console.error("❌ Error deleting item:", error);
            alert("Failed to delete item: " + error.message);
        });
};