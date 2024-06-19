import { db, collection, addDoc } from '../../Database/firebase-config.js';


const Firstname = document.getElementById("Firstname");
const Lastname = document.getElementById("Lastname");
const EmailAddress = document.getElementById("EmailAddress");
const Phonenumber = document.getElementById("Phonenumber");
const Message = document.getElementById("Message");

document.getElementById("SubmitBtn").addEventListener("click", AddMessage())
async function AddMessage() {
        if (Firstname.value != "null" && Lastname.value != "null" && EmailAddress.value != "null" && Message.value != "null") {
                await addDoc(
                        collection(db, "contact"), {
                        Fullname: Firstname.value + Lastname.value,
                        Email: EmailAddress.value,
                        Phone: Phonenumber.value,
                        Msg: Message.value
                }).then(() => alert("Added Successefully")).catch((error) => { alert(`Error${error}`) });
        }
}