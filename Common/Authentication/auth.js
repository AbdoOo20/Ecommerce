import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, db, doc, setDoc } from '../../Database/firebase-config.js';

function signUp() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var name = document.getElementById('name').value;
    var createAccountButton = document.querySelector('.auth-button');
    var loader = document.querySelector('.loading-indicator');
    if (email === "") {
        alert("You must enter email");
    } else if (password === "") {
        alert("You must enter password");
    } else if (name === "") {
        alert("You must enter name");
    } else {
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
                    createAccountButton.style.display = 'block';
                    loader.style.display = 'none';
                    window.location.href = '../../User/home/home.html';
                    email = "";
                    password = "";
                    name = "";
                });
            })
            .catch((error) => {
                email = "";
                password = "";
                name = "";
                alert(error.message);
                createAccountButton.style.display = 'block';
                loader.style.display = 'none';
            });
    }
}

function logIn() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var createAccountButton = document.querySelector('.auth-button');
    var loader = document.querySelector('.loading-indicator');
    if (email === "") {
        alert("You must enter email");
    } else if (password === "") {
        alert("You must enter password");
    } else {
        createAccountButton.style.display = 'none';
        loader.style.display = 'block';
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                createAccountButton.style.display = 'block';
                loader.style.display = 'none';
                window.location.href = '../../User/home/home.html';
                email = "";
                password = "";
            })
            .catch((error) => {
                email = "";
                password = "";
                alert(error.message);
                createAccountButton.style.display = 'block';
                loader.style.display = 'none';
            });
    }

}



function onLoadPage() {
    var list = window.location.href.split('/');
    console.log(list);
    if (list[list.length - 1] === 'register.html') {
        document.getElementById('createAccount').addEventListener('click', function () {
            signUp();
        });
    }
    if (list[list.length - 1] === 'login.html') {
        document.getElementById('login').addEventListener('click', function () {
            logIn();
        });
    }
}

onLoadPage();
