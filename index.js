// Get elements
const acceptButton = document.getElementById('Accept');
const declineButton = document.getElementById('Decline');
const firstArrayElement = document.getElementById('first');   // Display for array1
const secondArrayElement = document.getElementById('second'); // Display for array2
const thirdArrayElement = document.getElementById('third');   // Display for array3
const fourthArrayElement = document.getElementById('fourth'); // Display for array4

let array1 = [];
let array2 = [];
let array3 = [];
let array4 = [];

function updateDisplay() {
    const convertToCircles = (array) => {
        return array.map(item => {
            if (item === 1) {
                return '<span class="green-circle"></span>';
            } else if (item === 0) {
                return '<span class="red-circle"></span>';
            } else {
                return ''; // For any unexpected values
            }
        }).join(' ');
    };

    firstArrayElement.innerHTML = convertToCircles(array1);
    secondArrayElement.innerHTML = convertToCircles(array2);
    thirdArrayElement.innerHTML = convertToCircles(array3);
    fourthArrayElement.innerHTML = convertToCircles(array4);
}

function transferItems() {
    // Move items from array1 to array2
    while (array1.length > 25) {
        const item = array1.pop();  // Get the most recent item
        array2.push(item);        // Move it to the beginning of array2
    }

    // Now check if array2 exceeds the limit of 25
    while (array2.length > 25) {
        const item = array2.pop();  // Get the oldest item
        array3.unshift(item);        // Move it to the beginning of array3
    }

    // Check if array3 exceeds the limit of 25
    while (array3.length > 25) {
        const item = array3.pop();  // Get the oldest item
        array4.push(item);        // Move it to the beginning of array4
    }

    // Check if array4 exceeds the limit of 25
    while (array4.length > 25) {
        array4.splice(0, 1);  // Just remove the oldest item from array4
    }
}

// Accept button click event
acceptButton.onclick = () => {
    // Add a 1 to array1
    array1.unshift(1); // Add a 1 to the beginning of array1
    // Transfer items
    transferItems();
    // Update the display after all operations
    updateDisplay();
};

// Decline button click event
declineButton.onclick = () => {
    // Add a 0 to array1
    array1.unshift(0); // Add a 0 to the beginning of array1
    // Transfer items
    transferItems();
    // Update the display after all operations
    updateDisplay();
};

// Initialize displays
updateDisplay();