document.addEventListener('DOMContentLoaded', () => {
    const thoughtDateInput = document.getElementById('thoughtDate');
    const thoughtTextInput = document.getElementById('thoughtText');
    const addThoughtBtn = document.getElementById('addThoughtBtn');
    const thoughtsGrid = document.getElementById('thoughts-grid');

    // Function to create a thought element
    function createThoughtElement(date, text) {
        const thoughtDiv = document.createElement('div');
        thoughtDiv.classList.add('thought');
        thoughtDiv.innerHTML = `
            <h2>Date: ${date}</h2>
            <p>${text}</p>
        `;
        return thoughtDiv;
    }

    // Function to add a new thought
    function addThought(date, text) {
        if (date && text) {
            const thoughtElement = createThoughtElement(date, text);
            thoughtsGrid.prepend(thoughtElement); // Add new thought at the beginning
            // Clear input fields after adding thought
            thoughtDateInput.value = '';
            thoughtTextInput.value = '';

            // Animate the new thought in
            setTimeout(() => {
                thoughtElement.classList.add('show');
            }, 10); // небольшой таймаут чтобы анимация сработала
        } else {
            alert("Please enter both date and thought!");
        }
    }

    // Event listener for the "Add Thought" button
    addThoughtBtn.addEventListener('click', () => {
        const dateValue = thoughtDateInput.value;
        const textValue = thoughtTextInput.value;
        addThought(dateValue, textValue);
    });

    // Initial thoughts (you can remove these, they are just examples)
    const initialThoughts = [
        { date: '2025-02-12', text: 'Embrace the present moment and find joy in the little things.' },
        { date: '2025-02-11', text: 'Kindness is contagious, spread it around.' },
        { date: '2025-02-10', text: 'Believe in yourself, you are stronger than you think.' },
        { date: '2025-02-09', text: 'Gratitude unlocks the fullness of life.' }
    ];

    // Add initial thoughts to the grid and animate them on load
    initialThoughts.forEach((thoughtData, index) => {
        const thoughtElement = createThoughtElement(thoughtData.date, thoughtData.text);
        thoughtsGrid.appendChild(thoughtElement);
        setTimeout(() => {
            thoughtElement.classList.add('show');
        }, 100 * index); // Stagger the fade-in animation
    });
});