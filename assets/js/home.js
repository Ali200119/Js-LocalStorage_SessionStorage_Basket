"use strict"

let addBtns = document.querySelectorAll("main #products .cards .card .details button");

let products = [];

if (localStorage.getItem("basket") != null) {
    products = JSON.parse(localStorage.getItem("basket"));
}

addBtns.forEach(btn => {
    btn.addEventListener("click", function () {
        let productImgUrl = this.parentNode.previousElementSibling.firstElementChild.getAttribute("src");
        let productName = this.parentNode.firstElementChild.innerText;
        let productDescription = this.parentNode.children[1].innerText;
        let productPrice = parseInt(this.previousElementSibling.lastElementChild.innerText);
        let productId = parseInt(this.parentNode.parentNode.getAttribute("data-id"));

        let existProduct = products.find(p => p.id == productId);

        if (existProduct != undefined) {
            existProduct.count ++;
        }

        else {
            products.push({
                id: productId,
                name: productName,
                imageUrl: productImgUrl,
                description: productDescription,
                count: 1,
                price: productPrice
            })
        }

        localStorage.setItem("basket", JSON.stringify(products));

        Swal.fire(
            'Success!',
            `${productName} has been added to the cart`,
            'success'
        )

        if (products == null) {
            document.querySelector("header .cart sup").innerText = 0;
        }
        
        else {
            document.querySelector("header .cart sup").innerText = products.length;
        }
    })
});

document.querySelector("header .cart sup").innerText = products.length;