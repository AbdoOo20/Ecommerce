import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, db, doc, setDoc } from '../../Database/firebase-config.js';

function signUp() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var name = document.getElementById('name').value;
    var createAccountButton = document.querySelector('.auth-button');
    var loader = document.querySelector('.loading-indicator');
    createAccountButton.style.display = 'none';
    loader.style.display = 'block';
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            setDoc(doc(db, "users", user.uid), {
                email: email,
                password: password,
                name: name,
                id: user.uid
            }).then(() => {
                document.getElementById('name').value = '';
                document.getElementById('email').value = '';
                document.getElementById('password').value = '';
                createAccountButton.style.display = 'block';
                loader.style.display = 'none';
                window.location.href = '../../User/home/home.html';
            });
        })
        .catch((error) => {
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
            alert(error.message);
            createAccountButton.style.display = 'block';
            loader.style.display = 'none';
        });
}

function logIn() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var createAccountButton = document.querySelector('.auth-button');
    var loader = document.querySelector('.loading-indicator');
    createAccountButton.style.display = 'none';
    loader.style.display = 'block';
    document.querySelector('.loading-indicator').style.top = '35%';
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            createAccountButton.style.display = 'block';
            loader.style.display = 'none';
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
            window.location.href = '../../User/home/home.html';
        })
        .catch((error) => {
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
            alert(error.message);
            createAccountButton.style.display = 'block';
            loader.style.display = 'none';
        });
}

function checkValidation(type) {
    let isValid = true;
    let name;
    let nameRegex = /^[a-zA-Z\s'-]+$/;
    if (type !== 'login') {
        name = document.getElementById('name').value;
    }
    if (!nameRegex.test(name) && type !== 'login') {
        isValid = false;
    }
    let email = document.getElementById('email').value;
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        isValid = false;
        alert('Invalid email format. Please enter a valid email address in the format: example@domain.com');
    }
    let password = document.getElementById('password').value;
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        isValid = false;
        alert('Invalid password format. Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)');
    }
    if (isValid) {
        type === 'login' ? logIn() : signUp();
    }
}



function onLoadPage() {
    var list = window.location.href.split('/');
    if (list[list.length - 1] === 'register.html') {
        document.getElementById('myForm').addEventListener('submit', function (event) {
            event.preventDefault();
            checkValidation('signup');
        });
    }
    if (list[list.length - 1] === 'login.html') {
        document.getElementById('myForm').addEventListener('submit', function (event) {
            event.preventDefault();
            checkValidation('login');
        });
    }
}

onLoadPage();
