import { db, collection, getDocs } from '../../Database/firebase-config.js';

const savedEmail = localStorage.getItem('email');
const savedID = localStorage.getItem('id');

const HeaderIcons = document.getElementById("HeaderIcons");
HeaderIcons.style.display = "inline-block";
HeaderIcons.style.position = "relative";
HeaderIcons.style.right = "10px";


const queryString = window.location.search;
const UrlParams = new URLSearchParams(queryString);
const ReqCategory = UrlParams.get("categoy");

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
                displayDitalsIcon.src = "../../images/eye.png";
                displayDitalsIcon.alt = "Di"

                //create Add To  Wishlist Icon
                const addToWishlistIcon = document.createElement("img");
                addToWishlistIcon.src = "../../images/heart.png"

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
                titleOfProduct.style.position = "relative"
                titleOfProduct.style.top = "20px";

                //create p For price 
                const priceOfProduct = document.createElement("p");
                priceOfProduct.innerText = price;
                priceOfProduct.classList.add("PriceOfProduct");
                priceOfProduct.style.position = "relative"
                priceOfProduct.style.top = "10px";

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
                ProductDiv.style.margin = "5px"
                ProductDiv.style.display = "inline-block"
                //create A For Product
                const LinkForProduct = document.createElement("a");
                LinkForProduct.append(ProductDiv);
                LinkForProduct.href = "../../User/product/Peoduct.html?ProdutcID=" + ProdutcID + "?UserID=" + savedID;
                if (doc.data()["category"] == ReqCategory.split("?")[0])
                        document.getElementById("row").appendChild(LinkForProduct)
        })
})()