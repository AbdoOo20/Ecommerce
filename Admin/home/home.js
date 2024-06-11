

var items = document.querySelectorAll('.manage-item');
items.forEach(function (item, index) {
    item.addEventListener('click', function () {
        if (index === 0) {
            window.location.href = '../banners/banners.html';
        }
        if (index === 1) {
            console.log('1');
        }
        if (index === 2) {
            console.log('2');
        }
    });
});