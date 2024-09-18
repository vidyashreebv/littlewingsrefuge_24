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

// Reference your database
var LoginFormDB = firebase.database().ref('LoginForm');

document.getElementById('LoginForm').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();
    var user_name = getElementVal('user');
    var pass_word = getElementVal('pass');

    saveMessages(user_name, pass_word);

    if (user_name === 'lwr_staff' && pass_word === 'welovetoserve') {
        // If they match, redirect to childinfodetails.html
        window.location.href = 'Staff Salary and Roles.html';
    } else {
        // If they don't match, display an alert
        alert('Invalid username or password');
    }

    //reset the form
    document.getElementById("LoginForm").reset();
}

const saveMessages = (user_name, pass_word) => {
    var newLoginForm = LoginFormDB.push();
    newLoginForm.set({
        user_name: user_name,
        pass_word: pass_word,
    });
};

const getElementVal = (id) => {
    return document.getElementById(id).value;
};