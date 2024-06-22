import { db, collection, addDoc, where, getDocs, update } from '../../Database/firebase-config.js';

var modal = document.getElementById("myModal");
var paypalRadio = document.getElementById("paypal");
var visaRadio = document.getElementById("visa");
var span = document.getElementsByClassName("close")[0];
var submitBtn = document.getElementById("submitBtn");

paypalRadio.onclick = function () {
    document.getElementById("paypal-form").style.display = "block";
    document.getElementById("visa-form").style.display = "none";
    modal.style.display = "block";
}

visaRadio.onclick = function () {
    document.getElementById("visa-form").style.display = "block";
    document.getElementById("paypal-form").style.display = "none";
    modal.style.display = "block";
}


span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

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











