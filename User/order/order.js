import { 
    getAuth, db, collection, getDoc, getDocs, doc, onAuthStateChanged,
    query, where, deleteDoc
} from '../../Database/firebase-config.js';

const auth = getAuth();
var uid;
var total = 0;
var orderIds = [];
////// Get data from cart
onAuthStateChanged(auth, async(user) => {
    if (user) {
        uid = user.uid;
        const q = query(collection(db, "orders"), where("userId", "==", uid));
        const ordersSnapshot = await getDocs(q);
        ordersSnapshot.forEach(async (order) => {
            orderIds.push(order.id);
            const data = order.data();
            const status = order.data().status;
            const btnBuy = document.getElementById("btnBuy");
            
            var price;
            var checkBox;
            var tbodyRef;          
            data['products'].forEach(async (id) => {                
                const docProduct = doc(db, "products", id); 
                const product = await getDoc(docProduct);
                const img = product.data().imageUrl;
                price = product.data().price;
                const title = product.data().title;

                 //Create td inside table
                tbodyRef = document.getElementById('myTable').getElementsByTagName('tbody')[0];
                const emptyRow = tbodyRef.insertRow(0);
                emptyRow.classList.add("emptyRow");

                const tableRow = tbodyRef.insertRow(1);
                tableRow.classList.add("tableRow");

                const tableDataOfProductDetails = tableRow.insertCell(0);
                const tableDataOfProductPrice = tableRow.insertCell(1);
                const tableDataOfProductQuantity = tableRow.insertCell(2);
                checkBox = tableRow.insertCell(3);

                tableDataOfProductQuantity.style.paddingLeft = "50px";
                tableDataOfProductQuantity.classList.add("wid");

                tableDataOfProductDetails.style.padding = "10px 30px"
                tableDataOfProductDetails.classList.add("widThirty");
    
                tableDataOfProductPrice.style.paddingLeft = "40px";
                tableDataOfProductPrice.classList.add("wid");
    
                const productImg = document.createElement("img");
                productImg.style.width = "50px";
                productImg.style.height = "50px";

                const productName = document.createElement("span");
                productName.style.paddingLeft = "10px";

                const productPrice = document.createElement("span");
                productImg.src = img
                productName.append(title);
                productPrice.append(price);
                
                tableRow.setAttribute("data-rowid", order.id);
                tableDataOfProductDetails.appendChild(productImg);
                tableDataOfProductDetails.appendChild(productName);
                tableDataOfProductPrice.appendChild(productPrice);
                tableDataOfProductQuantity.append(status);
                
                let inputCheck = document.createElement("INPUT");
                inputCheck.setAttribute("type", "checkbox");
                checkBox.appendChild(inputCheck);
                inputCheck.classList.add("row-checkbox");

                if(status == "accepted") {
                    var p = (price * 1)
                    total += p;
                    document.getElementById("btnBuy").disabled = false;
                }
                 // Assum total value in cart            
                document.getElementById("subtotal").textContent = `$${total}`;
                document.getElementById("total").textContent = `$${total}`;
            });   
        });
    }
});
console.log(orderIds);
btnBuy.href = "../../User/billing/billing.html?orderIds=" + orderIds;

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
            deleteDoc(doc(db, "orders", rowId));
            
        } catch (error) {
            alert(`Error deleting document with ID ${rowId}:`, error);
        }
    }
}