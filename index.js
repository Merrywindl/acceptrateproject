// Get elements
const acceptButton = document.getElementById('Accept');
const declineButton = document.getElementById('Decline');
const firstArrayElement = document.getElementById('first');   // Display for array1
const secondArrayElement = document.getElementById('second'); // Display for array2
const thirdArrayElement = document.getElementById('third');   // Display for array3
const fourthArrayElement = document.getElementById('fourth'); // Display for array4
const acceptRate = document.getElementById('accept-rate');

// Initialize arrays
let array1 = [];  // For even array operations
let array2 = [];  // For odd array operations (push)
let array3 = [];  // For odd array operations (push)
let array4 = [];  // The final array to hold items
let totalOnes = 0;

// Function to update the rate display
function rate () {
    console.log(`Total Ones: ${totalOnes}`);
    acceptRate.innerText = `${totalOnes}%`;
}

// Function to count the total number of 1's in all arrays
function countTotalOnes() {
    console.log('Counting total ones...');
    const allArrays = [array1, array2, array3, array4];

    // Reset totalOnes before counting
    totalOnes = 0;
    for (const array of allArrays) {
        const count = array.filter(item => item === 1).length;
        totalOnes += count;
        console.log(`Counted ${count} ones in array: ${JSON.stringify(array)}`);
    }

    return totalOnes; // Return the total count of 1's
}

// Function to update display for visual representation
function updateDisplay() {
    console.log('Updating display...');
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

    rate();
}

// Function to transfer items ensuring arrays maintain a limit of 25
function transferFromSourceToTarget(source, target, usePush) {
    console.log(`Transferring from ${source} to ${target}, usePush: ${usePush}`);
    while (source.length > 25) {
        const item = source.pop();  // Remove the last item from the source
        if (usePush) {
            target.push(item);        // Add to the end of the target if it's an odd array
        } else {
            target.unshift(item);     // Add to the start of the target if it's an even array
        }
        console.log(`Transferred item: ${item}, Source length: ${source.length}, Target: ${target}`);
    }
}

// Function to handle item transfers between arrays
function transferItems() {
    console.log('Starting item transfers...');
    
    // Check if array1 has more than 25 items
    while (array1.length > 25) {
        array2.unshift(array1.pop()); // Unshift the 26th item to array2
        console.log(`Moved item from array1 to array2. Array1 length: ${array1.length}, Array2: ${array2}`);
    }

    // Manage transfers through other arrays
    while (array2.length > 25) {
        array3.unshift(array2.pop()); // Unshift the 26th item to array3
        console.log(`Moved item from array2 to array3. Array2 length: ${array2.length}, Array3: ${array3}`);
    }
    
    while (array3.length > 25) {
        array4.push(array3.pop()); // Unshift the 26th item to array4
        console.log(`Moved item from array3 to array4. Array3 length: ${array3.length}, Array4: ${array4}`);
    }

    // Ensure array4 does not exceed 25 items
    if (array4.length > 25) {
        while (array4.length >= 25) {
            array4.shift(); // Remove the first element
        }
        console.log(`Trimmed array4 to 25 items. Array4: ${array4}`);
    }

    // Maintain limits for each transfer
    transferFromSourceToTarget(array3, array4, true);  // Transfer from array3 to array4
    transferFromSourceToTarget(array1, array2, false); // Transfer from array1 to array2
    transferFromSourceToTarget(array2, array3, true);  // Transfer from array2 to array3
    
    countTotalOnes(); // Count total ones for rate update
}

// Event handlers for accept and decline buttons
acceptButton.onclick = () => {
    console.log('Accept button clicked');
    array1.unshift(1); // Unshift to array1
    transferItems();
    updateDisplay();
};

declineButton.onclick = () => {
    console.log('Decline button clicked');
    array1.unshift(0); // Unshift to array1
    transferItems();
    updateDisplay();
};

// Initialize display
updateDisplay();