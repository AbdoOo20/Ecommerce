import { 
    set, db, ref, addDoc, collection, getDoc, getDocs, update, doc, storage
} from '../../Database/firebase-config.js';

////////////////////////Get ProductID and UserId from url params
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("ProductID");
const userId = urlParams.get("UserID");

////////////////////get product details from firbase////////////////////
const productName = document.getElementById("productName");
const productImage = document.getElementById("productImage");
const productPrice = document.getElementById("productPrice");
const description = document.getElementById("description");
const stockValue = document.getElementById("stockValue");
const numberOfReviews = document.getElementById("numberOfReviews");
const btnIncreaseQuantity= document.getElementById("increaseQuantity");
const btnDecreaseQuantity= document.getElementById("decreaseQuantity");
const inputOfQuantity = document.getElementById("quantityInput");
const btnAddToWishlist = document.getElementById("addToWishlist");
var quantity;

let productDetails = doc(db, "products", productId);
const productSnapshot = await getDoc(productDetails);

if(productSnapshot.exists()) {
    productImage.src = productSnapshot.data().imageUrl;
    productName.textContent = productSnapshot.data().title;   
    productPrice.textContent = `$ ${productSnapshot.data().price}`;
    description.textContent = productSnapshot.data().description;
    quantity = productSnapshot.data().quantity;
} else { 
    alert ="Something went wrong"
}

if(quantity <= productSnapshot.data().oldQuantity) {
    stockValue.textContent = "In stock"
} else {
    stockValue.textContent = "Out stock"
}

//////////////////get rating data from firebase//////////////////////
let ratingOfProduct = collection(db, "rating");
const productRating = await getDocs(ratingOfProduct);
let reviewCount = 0;

productRating.forEach((doc) => {
    let productId = doc.data().productId;
    if(productId === productId) {
        var review = doc.data().comment;
        if(review) {
            reviewCount++;
        }
    }  
})

numberOfReviews.textContent = `( ${reviewCount} Reviews )`

////////////////////////Increase Quantity////////////////
btnIncreaseQuantity.addEventListener("click", function() {
    let quantityValue = inputOfQuantity.value;

    if(quantityValue >= productSnapshot.data().remainingQuantity) {
        btnIncreaseQuantity.disabled = true;
    } else {
        quantityValue ++;
        inputOfQuantity.value = quantityValue;
        btnDecreaseQuantity.disabled = false;
    }
})

/////////////////Decrease Quantity////////////////////
btnDecreaseQuantity.addEventListener("click", function() {
    let quantityValue = inputOfQuantity.value;

    if(quantityValue <= 0) {
        btnDecreaseQuantity.disabled = true;
    } else {
        quantityValue --;
        inputOfQuantity.value = quantityValue;
        btnDecreaseQuantity.disabled = false;
        btnIncreaseQuantity.disabled = false;
    }
})

////////////////////////Add to cart /////////////////////////
async function addToCart() {
    let refCart = collection(db, "cart");
    const productsOfCart = await getDocs(refCart);

    productsOfCart.forEach((doc) => {
        if((doc.data().productId == productId) && (doc.data().userId == userId)) {
            alert("This product has already been added to the shopping cart");
        } else {
            addDoc(
                refCart, {
                    productId: productId,
                    userId: userId,
                    quantity: inputOfQuantity.value
                }
            ) 
        }
        alert("Product added successfully to cart!")
    })
}
document.getElementById("addToCart").addEventListener("click", addToCart);

////////////////////Add to wishlist//////////////////////
async function addToWishlist() {
    let refWishList = collection(db, "favourites");
    addDoc(refWishList, {
        productID: productId,
        userID: userId
    })
}
document.getElementById("btnAddToWishlist").addEventListener("click", addToWishlist);

/////////////////////////////////stars///////////////////////////
const stars = document.querySelectorAll(".star");
const rating = document.getElementById("rating");
const reviewText = document.getElementById("review");
const submitBtn = document.getElementById("submit");
const reviewsContainer = document.getElementById("reviews");

stars.forEach((star) => {
    star.addEventListener("click", () => {
        var value = parseInt(star.getAttribute("data-value"));
        rating.innerText = value;
 
        // Remove all existing classes from stars
        stars.forEach((s) => s.classList.remove("one", 
                                                "two", 
                                                "three", 
                                                "four", 
                                                "five"));
 
        // Add the appropriate class to 
        // each star based on the selected star's value
        stars.forEach((s, index) => {
            if (index < value) {
                s.classList.add(getStarColorClass(value));
            }
        });
 
        // Remove "selected" class from all stars
        stars.forEach((s) => s.classList.remove("selected"));
        // Add "selected" class to the clicked star
        star.classList.add("selected");
    });
});

var userRating;
var review;
submitBtn.addEventListener("click", () => {
    review = reviewText.value;
    userRating = parseInt(rating.innerText);
 
    if (!userRating || !review) {
        alert(
            "Please select a rating and provide a review before submitting."
        );
        return;
    }
 
    if (userRating > 0) {
        const reviewElement = document.createElement("div");
        reviewElement.classList.add("review");
        reviewElement.innerHTML = `<p><strong>Rating: ${userRating}/5</strong></p><p>${review}</p>`;
        reviewsContainer.appendChild(reviewElement);
 
        // Reset styles after submitting
        reviewText.value = "";
        rating.innerText = "0";
        stars.forEach((s) => s.classList.remove("one", 
                                                "two", 
                                                "three", 
                                                "four", 
                                                "five", 
                                                "selected"));
    }

    ////////set rating value to firebase/////////////////
    let refRating = collection(db, "rating");
    const docRef = addDoc(
        refRating, {
            comment: review,
            productId: userId,
            rating: userRating, 
        }
    ) 
    alert("Review added successfully");
});

function getStarColorClass(value) {
    switch (value) {
        case 1:
            return "one";
        case 2:
            return "two";
        case 3:
            return "three";
        case 4:
            return "four";
        case 5:
            return "five";
        default:
            return "";
    }
}