import { 
    getAuth, db, collection, setDoc, getDocs, doc, onAuthStateChanged,
    query, where, deleteDoc
} from '../../Database/firebase-config.js';

const auth = getAuth();
var uid;
var total = 0;
var checkStatus = false;
////// Get data from cart
onAuthStateChanged(auth, async(user) => {
    if (user) {
        uid = user.uid;
        const q = query(collection(db, "Orders"), where("userId", "==", uid));
        const ordersSnapshot = await getDocs(q);
        ordersSnapshot.forEach(async (doc) => {
            const productId = doc.data().productId;
            const status = doc.data().status;
            var img;
            var price;
            var title;
            const collProducts = collection(db, "products");
            const products = await getDocs(collProducts);
            products.forEach((doc) => {
                if(doc.id == productId) {
                    img = doc.data().imageUrl;
                    price = doc.data().price;
                    title = doc.data().title;
                }
            });

            //Create td inside table
            var tbodyRef = document.getElementById('myTable').getElementsByTagName('tbody')[0];
            const emptyRow = tbodyRef.insertRow(0);
            emptyRow.classList.add("emptyRow");

            const tableRow = tbodyRef.insertRow(1);
            tableRow.classList.add("tableRow");
            tableRow.setAttribute("data-rowid", doc.id);

            const tableDataOfProductDetails = tableRow.insertCell(0);
            const tableDataOfProductPrice = tableRow.insertCell(1);
            const tableDataOfProductQuantity = tableRow.insertCell(2);
            const checkBox = tableRow.insertCell(3);

            tableDataOfProductDetails.style.padding = "10px 30px"
            tableDataOfProductDetails.classList.add("widThirty");

            tableDataOfProductPrice.style.paddingLeft = "40px";
            tableDataOfProductPrice.classList.add("wid");

            tableDataOfProductQuantity.style.paddingLeft = "50px";
            tableDataOfProductQuantity.classList.add("wid");

            const productImg = document.createElement("img");
            productImg.style.width = "50px";
            productImg.style.height = "50px";
            productImg.src = img

            const productName = document.createElement("span");
            productName.style.paddingLeft = "10px"
            productName.append(title);

            tableDataOfProductDetails.appendChild(productImg);
            tableDataOfProductDetails.appendChild(productName);
            tableDataOfProductPrice.append(price);
            tableDataOfProductQuantity.append(status);
            
            if(status == "approved") {
                checkStatus = true;
            }

            if(checkStatus) {
                document.getElementById("btnCheckout").disabled = false;
            }
            // Assum total value in cart
            var p = (price * 1)
            total += p;
            document.getElementById("subtotal").textContent = `$${total}`;
            document.getElementById("total").textContent = `$${total}`;

            let inputCheck = document.createElement("INPUT");
            inputCheck.setAttribute("type", "checkbox");
            checkBox.appendChild(inputCheck);
            inputCheck.classList.add("row-checkbox");
        });
    }
});

const btnDelete = document.getElementById("btnDelete");
btnDelete.addEventListener("click", deleteProductFromOrder);

function deleteProductFromOrder() {
    const checkboxes = document.getElementsByClassName('row-checkbox');
    const selectedRows = [];
    // Iterate over the checkboxes and find the selected rows
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            const row = checkboxes[i].parentNode.parentNode;
            const rowId = row.dataset.rowid;
            selectedRows.push(rowId);
        }
    }
    // Delete the selected rows from Firestore
    for (let i = 0; i < selectedRows.length; i++) {
        const rowId = selectedRows[i];

        try {
            deleteDoc(doc(db, "Orders", rowId));
            
        } catch (error) {
            alert(`Error deleting document with ID ${rowId}:`, error);
        }
    }
}