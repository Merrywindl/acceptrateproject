// Get elements
const acceptButton = document.getElementById('Accept');
const declineButton = document.getElementById('Decline');
const firstArrayElement = document.getElementById('first');  
const secondArrayElement = document.getElementById('second');
const thirdArrayElement = document.getElementById('third');  
const fourthArrayElement = document.getElementById('fourth'); 
const acceptRate = document.getElementById('accept-rate');
let totalZeroes = 0;
let totalOnes = 0;
let totalItems = 0;

// Initialize arrays
let array1 = [];  
let array2 = [];  
let array3 = [];  
let array4 = []; 

// Function to update the rate display
function rate() {
    totalZeroes = countTotalZeroes();
    totalOnes = countTotalOnes();
    totalItems = totalOnes + totalZeroes;
    const currentRate = totalItems > 0 ? (totalOnes / totalItems * 100).toFixed(2) : 0;

    acceptRate.innerText = `${currentRate}%`;
}

function countTotalZeroes() {
    totalZeroes = 0;
    const allArrays = [array1, array2, array3, array4];
    for (const array of allArrays) {
        const count = array.filter(item => item === 0).length;
        totalZeroes += count;
    }
    return totalZeroes; // Return the total count of zeroes
}

function countTotalOnes() {
    totalOnes = 0;
    const allArrays = [array1, array2, array3, array4];
    for (const array of allArrays) {
        const count = array.filter(item => item === 1).length;
        totalOnes += count;
    }
    return totalOnes; // Return the total count of ones
}

// Function to update display for visual representation
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

    rate();
}

function finalArrayCount() {
    let array4Size = array4.length;
    // Trim array4 if it exceeds 25 items
    if (array4Size > 25) {
        while (array4Size > 25) {
            array4.shift(); // Remove the first element
            array4Size = array4.length;
        }
    }
}

// Function to transfer items ensuring arrays maintain a limit of 25
function transferFromSourceToTarget(source, target, sourceName, targetName, useUnshift) {
    if (source.length > 25) {
        const item = sourceName === 'array2' ? source.shift() : source.pop(); // Pop the item once, or shift if source is array2
        if (useUnshift) {
            target.unshift(item); 
            console.log(`Transferred item ${item} from ${sourceName} to ${targetName} using unshift`);
        } else {
            target.push(item);  
            console.log(`Transferred item ${item} from ${sourceName} to ${targetName} using push`);
        }
    }
}

// Function to handle item transfers between arrays
function transferItems() {
    console.log('Starting item transfers...');
    
    // Maintain limits for each transfer
    transferFromSourceToTarget(array1, array2, 'array1', 'array2', false);  
    transferFromSourceToTarget(array2, array3, 'array2', 'array3', true);  
    transferFromSourceToTarget(array3, array4, 'array3', 'array4', false);  

    finalArrayCount();
    updateDisplay();    // Update display
    rate(); // update rate
    console.log(`Array1: ${JSON.stringify(array1)}`);
    console.log(`Array2: ${JSON.stringify(array2)}`);
    console.log(`Array3: ${JSON.stringify(array3)}`);
    console.log(`Array4: ${JSON.stringify(array4)}`);
    console.log(`${array4.length} items`);
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