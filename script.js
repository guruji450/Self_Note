// script.js (Modified for Modular Imports - type="module" in index.html)

// No need to initialize Firebase or Firestore here anymore!
// It's already initialized in index.html in the <script type="module"> block.
// You can directly access 'db' which was initialized there.

document.addEventListener('DOMContentLoaded', () => {
    const thoughtDateInput = document.getElementById('thoughtDate');
    const thoughtTextInput = document.getElementById('thoughtText');
    const addThoughtBtn = document.getElementById('addThoughtBtn');
    const thoughtsGrid = document.getElementById('thoughts-grid');

    // Function to create a thought element (same as before)
    function createThoughtElement(date, text) {
        const thoughtDiv = document.createElement('div');
        thoughtDiv.classList.add('thought');
        thoughtDiv.innerHTML = `
            <h2>Date: ${date}</h2>
            <p>${text}</p>
        `;
        return thoughtDiv;
    }

    // Function to add a new thought to Firestore
    function addThought(date, text) {
        if (date && text) {
            const thoughtElement = createThoughtElement(date, text);
            thoughtsGrid.prepend(thoughtElement);

            // **Save to Firestore**
            db.collection("thoughts") // Collection name in Firestore (like a table)
              .add({ // Add a new document to the 'thoughts' collection
                  date: date,
                  text: text,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp() // Optional: Add a timestamp
              })
              .then((docRef) => { // 'docRef' is the document reference of the added thought
                  console.log("Document written with ID: ", docRef.id);
              })
              .catch((error) => {
                  console.error("Error adding document: ", error);
                  alert("Error saving thought."); // Handle error more gracefully
              });


            // Clear input fields
            thoughtDateInput.value = '';
            thoughtTextInput.value = '';

            // Animate the new thought in
            setTimeout(() => {
                thoughtElement.classList.add('show');
            }, 10);
        } else {
            alert("Please enter both date and thought!");
        }
    }

    // Event listener for the "Add Thought" button (same as before)
    addThoughtBtn.addEventListener('click', () => {
        const dateValue = thoughtDateInput.value;
        const textValue = thoughtTextInput.value;
        addThought(dateValue, textValue);
    });

    // Load thoughts from Firestore on page load
    function loadThoughtsFromFirestore() {
        db.collection("thoughts") // Query the 'thoughts' collection
          .orderBy("timestamp", "desc") // Order by timestamp, newest first (optional, if you added timestamp)
          .get() // Get all documents in the collection
          .then((querySnapshot) => { // 'querySnapshot' contains all the retrieved documents
              const initialThoughts = [];
              querySnapshot.forEach((doc) => { // Loop through each document
                  // doc.data() is the data in each document
                  initialThoughts.push(doc.data());
              });

              // Display loaded thoughts (same as before, but using Firestore data)
              initialThoughts.forEach((thoughtData, index) => {
                  const thoughtElement = createThoughtElement(thoughtData.date, thoughtData.text);
                  thoughtsGrid.appendChild(thoughtElement);
                  setTimeout(() => {
                      thoughtElement.classList.add('show');
                  }, 100 * index);
              });
          })
          .catch((error) => {
              console.error("Error getting documents: ", error);
              alert("Error loading thoughts."); // Handle error more gracefully
          });
    }

    loadThoughtsFromFirestore(); // Call the function to load thoughts when page loads

});