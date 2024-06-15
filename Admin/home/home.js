

var items = document.querySelectorAll('.manage-item');
items.forEach(function (item, index) {
    item.addEventListener('click', function () {
        if (index === 0) {
            window.location.href = '../banners/banners.html';
        }
        if (index === 1) {
            window.location.href = '../categories/category.html';
        }
        if (index === 2) {
            window.location.href = '../products/products.html';
        }
    });
});