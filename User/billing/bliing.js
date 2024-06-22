import { db, collection, addDoc, where, getDocs, update } from '../../Database/firebase-config.js';

var modal = document.getElementById("myModal");
var paypalRadio = document.getElementById("paypal");
var closePaypal = document.getElementById("closePaypal");
var closeVisa = document.getElementById("closeVisa");
var submitPaypal = document.getElementById("submitPaypal");
var submitVisa = document.getElementById("submitVisa");
var visaRadio = document.getElementById("visa");
var name = document.getElementById('full-name');
var address = document.getElementById('address');
var phone = document.getElementById('phone-number');
var paypalEmail = document.getElementById('paypal-email');
var cardNumber = document.getElementById('card-number');
var date = document.getElementById('expiry-date');
var cvv = document.getElementById('cvv');

paypalRadio.onclick = function () {
    document.getElementById("paypalForm").style.display = "block";
}
closePaypal.onclick = function () {
    document.getElementById("paypalForm").style.display = "none";
}
visaRadio.onclick = function () {
    document.getElementById("visaForm").style.display = "block";
}
closeVisa.onclick = function () {
    document.getElementById("visaForm").style.display = "none";
}


span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function checkValidation(type) {
    name = document.getElementById('full-name');
    address = document.getElementById('address');
    phone = document.getElementById('phone-number');
    paypalEmail = document.getElementById('paypal-email');
    let isValid = true;
    let fullNamePattern = /^[a-zA-Z]+(?:\s+[a-zA-Z]+)+$/;
    let addressPattern = /^[a-zA-Z0-9\s,.'-]{3,}$/;
    let egyptPhonePattern = /^(?:\(?02\)?|\(?03\)?)?(\d{8}|\d{11})$/;
    let emailPaypalPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let visaCardPattern = /^4[0-9]{12}(?:[0-9]{3})?(?:[0-9]{3})?$/;
    let cvvPattern = /^[0-9]{3}$/;
    let expiryDatePattern = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    if (!fullNamePattern.test(name)) {
        isValid = false;
        alert("Invalid full name. Please enter a valid full name with at least two parts, consisting of alphabetic characters only, separated by spaces.");
    }
    if (!egyptPhonePattern.test(phone)) {
        isValid = false;
        alert("Invalid phone number. Please enter a valid Egyptian phone number. Examples: (02) 12345678, 01012345678.");
    }
    if (!addressPattern.test(address)) {
        isValid = false;
        alert("Invalid address. Please enter a valid address with at least 3 characters, including numbers and letters.");
    }
    if (type === 'paypal' && !emailPaypalPattern.test(paypalEmail)) {
        isValid = false;
        alert("Invalid email address. Please enter a valid PayPal email address.");
    }
    if (type === 'visa' && !visaCardPattern.test(cardNumber)) {
        isValid = false;
        alert("Invalid Visa card number. Please enter a valid 13 to 19-digit Visa card number starting with 4.");
    }
    if (type === 'visa' && !expiryDatePattern.test(date)) {
        isValid = false;
        alert("Invalid expiration date. Please enter a valid expiration date in MM/YY format.");
    }
    if (type === 'visa' && !cvvPattern.test(cvv)) {
        isValid = false;
        alert("Invalid CVV. Please enter a valid 3-digit CVV.");
    }
    if (isValid) {
        // code for submit payment here
    }
}

submitPaypal.addEventListener('click', function () {
    checkValidation('paypal');
});
submitVisa.addEventListener('click', function () {
    checkValidation('visa');
});

submitBtn.onclick = function () {
    if (paypalRadio.checked) {
        var paypalEmail = document.getElementById("paypal-email").value;
        alert("PayPal Email: " + paypalEmail);
    } else if (visaRadio.checked) {
        var cardNumber = document.getElementById("card-number").value;
        var expiryDate = document.getElementById("expiry-date").value;
        var cvv = document.getElementById("cvv").value;
        alert("Card Number: " + cardNumber + ", Expiry Date: " + expiryDate + ", CVV: " + cvv);
    }
    modal.style.display = "none";
}


//const savedEmail = localStorage.getItem('email');
const savedID = localStorage.getItem('id');
const queryString = window.location.search;
const UrlParams = new URLSearchParams(queryString);
const ReqorderIds = UrlParams.get("orderIds");
const Reqtotal = UrlParams.get("total");
const subtotal = document.getElementById("subtotal");
const total = document.getElementById("total");
const PaypalEmail = document.getElementById("paypal-email");
const CardNumber = document.getElementById("card-number");
const ExpiryDate = document.getElementById("expiry-date");
const Cvv = document.getElementById("cvv");

let OrderIds = [];
for (let i = 0; i < ReqorderIds.split(",").length; i++) {
    OrderIds.push(ReqorderIds.split(",")[i])
}

//console.log(OrderIds);



document.getElementById("PlaceOrder").addEventListener("click", SetBillingData)


async function SetBillingData() {
    if (paypalRadio.checked) {
        await addDoc(
            collection(db, "billing"), {
            UserID: savedID,
            OrderIds: OrderIds,
            PaypalEmail: PaypalEmail.value,
            CardNumber: "",
            ExpiryDate: "",
            Cvv: ""
        }).then(() => {
            alert("Successefully :)")
            PaypalEmail.value = "";
            CardNumber.value = "";
            ExpiryDate.value = "";
            Cvv.value = "";
        }
        ).catch((error) => { alert(`Error${error}`) });
    } else if (visaRadio.checked) {
        await addDoc(
            collection(db, "Billing"), {
            UserID: savedID,
            OrderIds: OrderIds,
            PaypalEmail: "",
            CardNumber: CardNumber.value,
            ExpiryDate: ExpiryDate.value,
            Cvv: Cvv.value
        }).then(() => {
            alert("Successefully :)")
            PaypalEmail.value = "";
            CardNumber.value = "";
            ExpiryDate.value = "";
            Cvv.value = "";
        }
        ).catch((error) => { alert(`Error${error}`) });
    }
    const querySnapshot = await getDocs(collection(db, "orders"), where("userId", "==", savedID))
    querySnapshot.forEach(function (doc) {

    });
}











