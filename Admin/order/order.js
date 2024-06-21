import { db, collection, getDocs, doc, getDoc } from '../../Database/firebase-config.js';


window.onload = () => {
    const displayOrders = async () => {
        const ordersDiv = document.getElementById('allOrders');
        const orderCollection = collection(db, "orders");
        try {
            const querySnapshot = await getDocs(orderCollection);
            var index = 0;
            querySnapshot.forEach((order) => {
                index++;
                const data = order.data();
                const orderImages = document.createElement('div');
                orderImages.classList.add('parent-div');
                data['products'].forEach(async (id) => { 
                    const productsCollection = doc(db, "products", id);
                    const docSnap = await getDoc(productsCollection);
                    const data = docSnap.data();
                    // Create image
                    const img = document.createElement('img');
                    img.src = data['imageUrl'];
                    img.alt = "Product Image";
                    img.classList.add('image');
                    orderImages.appendChild(img);
                });
                
                // // create label
                // const label = document.createElement('label');
                // label.classList.add('labelBanner');
                // const textNode = document.createTextNode(`(${index})`);
                // label.appendChild(textNode);
                // // Position & ID
                // const pos = document.createElement('label');
                // pos.classList.add('labelBanner');
                // const title = document.createTextNode(`${data.title}`);
                // pos.appendChild(title);
                // const categoryData = document.createElement('div');
                // categoryData.style.display = 'flex';
                // categoryData.style.flexDirection = 'column';
                // categoryData.style.alignItems = 'flex-start';
                // categoryData.style.justifyContent = 'center';
                // categoryData.appendChild(pos);
                // // Create div
                // const categoryDiv = document.createElement('div');
                // categoryDiv.style.justifyContent = 'start';
                // categoryDiv.classList.add('banner');
                // categoryDiv.appendChild(label);
                
                // categoryDiv.appendChild(categoryData);
                // categoryDiv.addEventListener('click', () => {
                //     selectedCategory.innerHTML = '';
                //     selectedID = doc.id;
                //     selectedImageName = data.name;
                //     selectedTitle = data.title;
                //     imageURL = data.imageUrl
                //     selectedCategory.appendChild(document.createTextNode(`Selected Category ID: ${doc.id}`));
                // });
                // // Parent
                ordersDiv.appendChild(orderImages);
            });
        } catch (error) {
            console.error("Error: ", error);
        }
    }
    displayOrders();
};