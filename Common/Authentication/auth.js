import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, db, collection, addDoc, doc, setDoc } from '../../Database/firebase-config.js';



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
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('Log In Successful:', user);
        })
        .catch((error) => {
            console.error('Error logging in:', error.message);
        });
}

document.getElementById('createAccount').addEventListener('click', function () {
    signUp();
});