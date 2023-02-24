"use strict"

let products = JSON.parse(localStorage.getItem("basket"));
let table = document.querySelector("main table");
let total = table.nextElementSibling;
let alert = document.querySelector("main .alert");

if (products != null && products.length != 0) {
    alert.classList.add("deactive");
    table.classList.remove("deactive");
    total.classList.remove("deactive");

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
            <td><i class="fa-solid fa-xmark"></i></td>
        </tr>`;

        totalPrice += product.price * product.count;
    }

    total.innerText = `Total: $${totalPrice}`;

    let deleteProduct = document.querySelectorAll("main table tbody tr td i");

    for (const remove of deleteProduct) {
        remove.addEventListener("click", function () {
            let filterBasket = products.filter(p => p.id != parseInt(this.parentNode.parentNode.firstElementChild.innerText));
            localStorage.setItem("basket", JSON.stringify(filterBasket));
            let filteredBasket = JSON.parse(localStorage.getItem("basket"));
            let filteredTable = document.querySelector("main table");
            filteredTable.lastElementChild.firstElementChild.remove();

            if (filteredBasket.length != 0) {
                alert.classList.add("deactive");
                table.classList.remove("deactive");
                total.classList.remove("deactive");

                let totalPrice = 0;

                for (const filteredproduct of filteredBasket) {
                    filteredTable.lastElementChild.innerHTML += `<tr>
            <td class="deactive">${filteredproduct.id}</td>
            <td><img src="${filteredproduct.imageUrl}"></td>
            <td>${filteredproduct.name}</td>
            <td>${filteredproduct.description}</td>
            <td>$${filteredproduct.price}</td>
            <td>${filteredproduct.count}</td>
            <td>$${filteredproduct.price * filteredproduct.count}</td>
            <td><i class="fa-solid fa-xmark"></i></td>
        </tr>`;

                    totalPrice += filteredproduct.price * filteredproduct.count;
                }

                total.innerText = `Total: $${totalPrice}`;
            }

            else {
                alert.classList.remove("deactive");
                table.classList.add("deactive");
                total.classList.add("deactive");
            }
            
            if (filterBasket.length == 0) {
                document.querySelector("header .cart sup").innerText = 0;
            }
            
            else {
                document.querySelector("header .cart sup").innerText = filterBasket.length;
            }

            window.location.reload();
        })
    }
}

else {
    alert.classList.remove("deactive");
    table.classList.add("deactive");
    total.classList.add("deactive");
}

if (products == null && products.length == 0) {
    document.querySelector("header .cart sup").innerText = 0;
}

else {
    document.querySelector("header .cart sup").innerText = products.length;
}