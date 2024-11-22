
const firebaseConfig = {
    apiKey: "AIzaSyAhoXJ96H-5BISAoLyjm3jBtTrDqZmd8z0",
    authDomain: "complaints-6cb17.firebaseapp.com",
    databaseURL: "https://complaints-6cb17-default-rtdb.firebaseio.com",
    projectId: "complaints-6cb17",
    storageBucket: "complaints-6cb17.firebasestorage.app",
    messagingSenderId: "981468015628",
    appId: "1:981468015628:web:d1cecb91eb9560b3d99229",
    measurementId: "G-9Z9123GQ1G"
  };

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const complaintRef = ref(database, 'complaints');

// Function to add complaint
document.getElementById('complaintForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;

    // Push new complaint to Firebase
    push(complaintRef, { category, description })
        .then(() => console.log("Complaint added successfully"))
        .catch((error) => console.error("Error adding complaint:", error));

    
    document.getElementById('complaintForm').reset();
});


function loadComplaints() {
    const complaintList = document.getElementById('complaintList');
    console.log('Clearing the list'); 
    complaintList.innerHTML = ''; 

    onValue(complaintRef, (snapshot) => {
        const complaints = snapshot.val();
        if (complaints) {
            Object.values(complaints).forEach((complaint, index) => {
                const li = document.createElement('li');
                li.textContent = `${index + 1}. [${complaint.category}] ${complaint.description}`;
                complaintList.appendChild(li);
            });
        }
    });
}

// Load complaints on page load
loadComplaints();
