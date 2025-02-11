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

    // Function to save thoughts to local storage
    function saveThoughts(thoughts) {
        localStorage.setItem('myThoughts', JSON.stringify(thoughts)); // Store as JSON string
    }

    // Function to get thoughts from local storage
    function getThoughts() {
        const storedThoughts = localStorage.getItem('myThoughts');
        return storedThoughts ? JSON.parse(storedThoughts) : []; // Parse JSON or return empty array
    }

    // Function to add a new thought (modified to include local storage)
    function addThought(date, text) {
        if (date && text) {
            const thoughtElement = createThoughtElement(date, text);
            thoughtsGrid.prepend(thoughtElement);

            // Get existing thoughts, add new one, and save
            const currentThoughts = getThoughts();
            currentThoughts.unshift({ date: date, text: text }); // Add new thought to the beginning of array
            saveThoughts(currentThoughts);

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

    // Load thoughts from local storage on page load
    const initialThoughts = getThoughts(); // Get thoughts from local storage

    // Display loaded thoughts and animate them on load (modified to use loaded thoughts)
    initialThoughts.forEach((thoughtData, index) => {
        const thoughtElement = createThoughtElement(thoughtData.date, thoughtData.text);
        thoughtsGrid.appendChild(thoughtElement);
        setTimeout(() => {
            thoughtElement.classList.add('show');
        }, 100 * index);
    });
});