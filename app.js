import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, db, collection, addDoc, getDocs } from './Database/firebase-config.js';

function signUp() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            addDoc(collection(db, "users"), {
                email: email,
                password: password,
                id: user.uid
            });
            console.log('Sign Up Successful:', user);
        })
        .catch((error) => {
            alert(error.message);
        });
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

// // Realtime Database functions
// function sendMessage() {
//     const message = document.getElementById('message').value;
//     const messagesRef = ref(database, 'messages/');
//     const newMessageRef = push(messagesRef);
//     set(newMessageRef, {
//         text: message
//     });
//     document.getElementById('message').value = '';
// }

const getUsers = async () => {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = '';
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
        messagesDiv.append(doc.data()["email"]);
        //console.log(`${doc.id} => ${doc.data()["email"]}`);
    });
};

getUsers();

// Expose functions to the global scope
window.signUp = signUp;
window.logIn = logIn;
//window.sendMessage = sendMessage;