const firebaseConfig = {
    apiKey: "AIzaSyCLKFG_pOXAwunmzn53LZSB4wkcjBsTlPI",
    authDomain: "littlewingsrefuge.firebaseapp.com",
    databaseURL: "https://littlewingsrefuge-default-rtdb.firebaseio.com",
    projectId: "littlewingsrefuge",
    storageBucket: "littlewingsrefuge.appspot.com",
    messagingSenderId: "348059961928",
    appId: "1:348059961928:web:5b2c1adc112a083af5e67d",
    measurementId: "G-RZEX5JDDYH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Set database reference
var FinanceDB = firebase.database().ref('Finance');

// Function to save expense
function saveExpense(e) {
    e.preventDefault();
    var date = getElementVal('date');
    var category = getElementVal('category');
    var amount = getElementVal('amount');
    var description = getElementVal('description');

    saveEntries(date, category, amount, description);
    displayExistingExpenses();

    document.getElementById("Finance").reset();
}

// Function to retrieve and display existing expenses
function displayExistingExpenses() {
    FinanceDB.once('value', function(snapshot) {
        const expenses = snapshot.val();
        if (expenses) {
            displayExpenses(expenses);
        }
    });
}

// Function to display retrieved expenses
function displayExpenses(data) {
    // Get the tbody element of the expenses table
    var tbody = document.getElementById('expenses-table').getElementsByTagName('tbody')[0];

    // Clear any existing table rows
    tbody.innerHTML = "";

    // Loop through the data object (assuming data is structured as an object where keys are unique identifiers and values are expense details)
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            var expense = data[key]; // Expense object for each key

            // Create a new table row element (<tr>)
            var row = document.createElement('tr');

            // Create table data elements (<td>) and populate with expense details
            var dateCell = document.createElement('td');
            dateCell.textContent = expense.date;
            row.appendChild(dateCell);

            var categoryCell = document.createElement('td');
            categoryCell.textContent = expense.category;
            row.appendChild(categoryCell);

            var amtCell = document.createElement('td');
            amtCell.textContent = expense.amount;
            row.appendChild(amtCell);

            var descCell = document.createElement('td');
            descCell.textContent = expense.description;
            row.appendChild(descCell);

            // Append the row to the table body
            tbody.appendChild(row);
        }
    }
}

// Function to save expense entries
const saveEntries = (date, category, amount, description) => {
    var newEntry = FinanceDB.push();
    newEntry.set({
        date: date,
        category: category,
        amount: amount,
        description: description,
    });
};

// Function to get element value by ID
const getElementVal = (id) => {
    return document.getElementById(id).value;
};

// Call function to display existing expenses when the page loads
displayExistingExpenses();

// Add event listener for submitting the form
document.getElementById('Finance').addEventListener('submit', saveExpense);
