import { db, collection, getDocs } from '../../Database/firebase-config.js';


//header

const LogeOutIcon = document.getElementById("LogeOutIcon");
LogeOutIcon.style.display = "none";


const savedEmail = localStorage.getItem('email');
const savedID = localStorage.getItem('id');


//Section1 Change The Banners

let TopBannerImg = document.getElementById("TopBannerImg");

async function GetBannersCollection() {
        const BannersSnapshot = await getDocs(collection(db, "banners"));
        const BannersCollection = [];
        BannersSnapshot.forEach(doc => {
                BannersCollection.push(doc.data());
        });
        return BannersCollection;
}

let TopBannerImgs = [];
TopBannerImgs.push(TopBannerImg.src)
var i = 0;
setInterval(() => {
        GetBannersCollection().then((result) => {
                TopBannerImg.src = result[i]["imageUrl"];
                TopBannerImgs.push(result[i]["imageUrl"]);
                i++;
        }).catch(() => false);
}, 3000);
let ChangeBanners;
let counterForBanners = 0;
TopBannerImg.addEventListener("mouseover", () => {
        ChangeBanners = setInterval(() => {
                if (counterForBanners < TopBannerImgs.length) {
                        TopBannerImg.src = TopBannerImgs[counterForBanners];
                        counterForBanners++;
                }
                else counterForBanners = 0;
        }, 3000)
})

TopBannerImg.addEventListener("mouseout", () => {
        clearInterval(ChangeBanners);
})

//Section2 Categories
let counterOfAddedCategories = 0;
(async function GetCategoriesCollection() {
        const CategoriesSnapshot = await getDocs(collection(db, "categories"));
        const CategoriesCollection = [];
        CategoriesSnapshot.forEach((doc) => {
                counterOfAddedCategories++;
                // title imageUrl
                //create Image 
                const img = document.createElement("img");
                img.src = doc.data()["imageUrl"];
                img.style.height = "30px";
                img.style.position = "relative";
                img.style.top = "30px"
                //create p
                const p = document.createElement("p");
                p.innerText = doc.data()["title"];
                //create CategoryDiv 
                const div = document.createElement("div");
                div.appendChild(img);
                div.appendChild(p);
                div.classList.add("Categories");
                div.style.position = "relative";
                div.style.bottom = "10px";
                div.style.display = "none";

                //create Link 
                const AForCategory = document.createElement("a");
                AForCategory.append(div);
                AForCategory.href = "./contact.html?categoy=" + doc.data()["title"];

                //Add div to categories
                document.getElementById("Categories").append(AForCategory);

        });
        return CategoriesCollection;
})();

let Categories = document.getElementsByClassName("Categories");

let rightCounterForCategories = Categories.length - counterOfAddedCategories;
let leftCounterForCategories = 0;

document.getElementById("CircleArrowRight").addEventListener("click", () => {
        if (rightCounterForCategories >= Categories.length) return false;
        Categories[leftCounterForCategories].style.display = "none";
        Categories[rightCounterForCategories].style.display = "inline-block";
        rightCounterForCategories++;
        leftCounterForCategories++;
})

document.getElementById("CircleArrowLeft").addEventListener("click", () => {
        if (leftCounterForCategories <= 0) return false;
        rightCounterForCategories--;
        leftCounterForCategories--;
        Categories[rightCounterForCategories].style.display = "none";
        Categories[leftCounterForCategories].style.display = "inline-block";
})


//Section3 Products
let counterOfAddedProducts = 0;
let counterOfAddedProductsRow1 = 0;
let counterOfAddedProductsRow2 = 0;
(async function GetAllProducts() {
        const ProductsSnapshot = await getDocs(collection(db, "products"));
        ProductsSnapshot.forEach(doc => {
                // category description imageUrl oldQuantity price quantity title
                const ProdutcID = doc.id;
                const category = doc.data()["category"];
                const description = doc.data()["description"];
                const imageUrl = doc.data()["imageUrl"];
                const oldQuantity = doc.data()["oldQuantity"];
                const price = doc.data()["price"];
                const quantity = doc.data()["quantity"];
                const title = doc.data()["title"];

                //create display Ditals Icon
                const displayDitalsIcon = document.createElement("img");
                displayDitalsIcon.src = "./img/eye.png"

                //create Add To  Wishlist Icon
                const addToWishlistIcon = document.createElement("img");
                addToWishlistIcon.src = "./img/heart.png"

                // create Div For Icons Of Product
                const IconsDiv = document.createElement("div");
                IconsDiv.append(displayDitalsIcon);
                IconsDiv.append(addToWishlistIcon);
                IconsDiv.classList.add("ProductIcons");

                //create Link For Add To Create
                const AForAddToCart = document.createElement("a");
                AForAddToCart.innerText = "Add To Cart";
                AForAddToCart.href = "";
                //create Add To Cart
                const AddToCartBtn = document.createElement("div");
                AddToCartBtn.append(AForAddToCart);
                AddToCartBtn.classList.add("AddToCart");

                //create Img Of Product
                const imgOfProduct = document.createElement("img");
                imgOfProduct.src = imageUrl;

                //create P For Title 
                const titleOfProduct = document.createElement("p");
                titleOfProduct.innerText = title;
                titleOfProduct.style.fontWeight = "bold";
                titleOfProduct.classList.add("titleOfProduct");

                //create p For price 
                const priceOfProduct = document.createElement("p");
                priceOfProduct.innerText = price;
                priceOfProduct.classList.add("PriceOfProduct");

                //create Div For Prodect 
                const ProductDiv = document.createElement("div");
                ProductDiv.id = ProdutcID;
                ProductDiv.setAttribute("category", category);
                ProductDiv.setAttribute("oldQuantity", oldQuantity);
                ProductDiv.setAttribute("quantity", quantity);
                ProductDiv.setAttribute("description", description);
                ProductDiv.append(IconsDiv);
                ProductDiv.append(imgOfProduct);
                ProductDiv.append(titleOfProduct);
                ProductDiv.append(priceOfProduct);
                ProductDiv.append(AddToCartBtn);
                ProductDiv.classList.add("divproducts");
                ProductDiv.style.display = "none";
                //console.log(ProductDiv);

                //create A For Product
                const LinkForProduct = document.createElement("a");
                LinkForProduct.append(ProductDiv);
                LinkForProduct.href = "./contact.html?ID=" + ProdutcID;
                if (counterOfAddedProducts % 2 == 0) {
                        document.getElementById("ProductsRow1").appendChild(LinkForProduct);
                        counterOfAddedProductsRow1++;
                } else {
                        document.getElementById("ProductsRow2").appendChild(LinkForProduct);
                        counterOfAddedProductsRow2++;
                }
                counterOfAddedProducts++;

        });
})();

let Products = document.getElementsByClassName("DivProducts");

let leftCounter = 0;
let RightCounter = 5;


document.getElementById("CircleArrowRightForProdects").addEventListener("click", () => {
        if (RightCounter >= Products.length - 5 - counterOfAddedProductsRow2) return false;
        Products[leftCounter].style.display = "none";
        Products[RightCounter].style.display = "inline-block";
        Products[leftCounter + 5 + counterOfAddedProductsRow1].style.display = "none";
        Products[RightCounter + 5 + counterOfAddedProductsRow1].style.display = "inline-block";
        leftCounter++;
        RightCounter++;
})

document.getElementById("CircleArrowLeftForProdects").addEventListener("click", () => {
        if (leftCounter <= 0) return false;
        RightCounter--;
        leftCounter--;
        Products[RightCounter].style.display = "none";
        Products[leftCounter].style.display = "inline-block";
        Products[leftCounter + 5 + counterOfAddedProductsRow1].style.display = "inline-block";
        Products[RightCounter + 5 + counterOfAddedProductsRow1].style.display = "none";
})