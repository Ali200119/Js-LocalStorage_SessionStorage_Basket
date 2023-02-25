"use strict"

let products = JSON.parse(localStorage.getItem("basket"));
let header = document.querySelector("main .header");
let clearAll = document.querySelector("main button");
let table = document.querySelector("main table");
let total = table.nextElementSibling;
let alert = document.querySelector("main .alert");

if (products != null && products.length != 0) {
    alert.classList.add("deactive");
    table.classList.remove("deactive");
    total.classList.remove("deactive");
    clearAll.classList.remove("deactive");
    header.classList.remove("deactive");

    let totalPrice = 0;

    for (const product of products) {
        table.lastElementChild.innerHTML += `<tr>
            <td class="deactive">${product.id}</td>
            <td><img src="${product.imageUrl}"></td>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>$${product.price}</td>
            <td>${product.count}</td>
            <td>$${product.price * product.count}</td>
            <td><i class="fa-solid fa-plus plus"></i></td>
            <td><i class="fa-solid fa-minus minus"></i></td>
            <td><i class="fa-solid fa-trash delete"></i></td>
        </tr>`;

        totalPrice += product.price * product.count;
    }

    total.innerText = `Total: $${totalPrice}`;

    let plusCount = document.querySelectorAll("main table tbody tr td .plus");

    plusCount.forEach(plus => {
        plus.addEventListener("click", function () {
            let product = products.find(p => p.id == parseInt(this.parentNode.parentNode.firstElementChild.innerText));
            product.count++;
            localStorage.setItem("basket", JSON.stringify(products));
            window.location.reload();
        })
    });

    let minusCount = document.querySelectorAll("main table tbody tr td .minus");

    minusCount.forEach(minus => {
        minus.addEventListener("click", function () {
            let product = products.find(p => p.id == parseInt(this.parentNode.parentNode.firstElementChild.innerText));

            if (product.count == 1) {
                removeProduct(this);
            }

            else {
                product.count--;
                localStorage.setItem("basket", JSON.stringify(products));
            }

            window.location.reload();
        })
    });

    let deleteProduct = document.querySelectorAll("main table tbody tr td .delete");

    for (const remove of deleteProduct) {
        remove.addEventListener("click", function () {
            removeProduct(this);

            window.location.reload();
        })
    }

    clearAll.addEventListener("click", function () {
        localStorage.removeItem("basket");
        window.location.reload();
    })
}

else {
    alert.classList.remove("deactive");
    table.classList.add("deactive");
    total.classList.add("deactive");
    clearAll.classList.add("deactive");
    header.classList.add("deactive");

}

if (products == null || products.length == 0) {
    document.querySelector("header .cart sup").innerText = 0;
}

else {
    document.querySelector("header .cart sup").innerText = products.length;
}



function removeProduct(element) {
    let filterBasket = products.filter(p => p.id != parseInt(element.parentNode.parentNode.firstElementChild.innerText));
    localStorage.setItem("basket", JSON.stringify(filterBasket));
    let filteredBasket = JSON.parse(localStorage.getItem("basket"));

    if (filteredBasket.length != 0) {
        alert.classList.add("deactive");
        table.classList.remove("deactive");
        total.classList.remove("deactive");
        clearAll.classList.remove("deactive");
        header.classList.remove("deactive");

    }

    else {
        alert.classList.remove("deactive");
        table.classList.add("deactive");
        total.classList.add("deactive");
        clearAll.classList.add("deactive");
        header.classList.add("deactive");

    }

    if (filterBasket.length == 0) {
        document.querySelector("header .cart sup").innerText = 0;
    }

    else {
        document.querySelector("header .cart sup").innerText = filterBasket.length;
    }
}