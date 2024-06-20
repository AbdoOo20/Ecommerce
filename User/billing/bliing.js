var modal = document.getElementById("myModal");
var paypalRadio = document.getElementById("paypal");
var visaRadio = document.getElementById("visa");
var span = document.getElementsByClassName("close")[0];
var submitBtn = document.getElementById("submitBtn");

paypalRadio.onclick = function() {
    document.getElementById("paypal-form").style.display = "block";
    document.getElementById("visa-form").style.display = "none";
    modal.style.display = "block";
}

visaRadio.onclick = function() {
    document.getElementById("visa-form").style.display = "block";
    document.getElementById("paypal-form").style.display = "none";
    modal.style.display = "block";
}


span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

submitBtn.onclick = function() {
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


    







