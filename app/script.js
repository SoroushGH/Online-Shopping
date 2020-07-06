let carts = document.querySelectorAll('.shop-item-button');

let products = [
    {
        name: 'All Star',
        tag: 'allstar',
        price: 270,
        inCard: 0
    },
    {
        name: 'Macho Black',
        tag: 'machoblack',
        price: 300,
        inCard: 0
    },
    {
        name: 'Lady Pink',
        tag: 'ladypink',
        price: 1200,
        inCard: 0
    },
    {
        name: 'Sahara Sunnglass',
        tag: 'saharasunnglass',
        price: 70,
        inCard: 0
    },
    {
        name: 'Red Tie',
        tag: 'redtie',
        price: 100,
        inCard: 0
    },
    {
        name: 'Frog shirt',
        tag: 'frogshirt',
        price: 220,
        inCard: 0
    },
    {
        name: 'Blue Bracelet',
        tag: 'bluebracelet',
        price: 175,
        inCard: 0
    },
    {
        name: 'Gold Heart',
        tag: 'goldheart',
        price: 380,
        inCard: 0
    },
    {
        name: 'Brown Belt',
        tag: 'brownbelt',
        price: 450,
        inCard: 0
    },
    {
        name: 'Light Lee',
        tag: 'lightlee',
        price: 1300,
        inCard: 0
    },
    {
        name: 'Leather jacket',
        tag: 'leatherjacket',
        price: 2000,
        inCard: 0
    },
    {
        name: 'Dark Lee',
        tag: 'darklee',
        price: 2600,
        inCard: 0
    }
];


for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', function () {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
};


//check our cart value when the page refresh and keep the value
function onLoadCardNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart').textContent = productNumbers;
    }
}


//add items to the local storage because, when we refresh the page, we are able to keep shoping items
function cartNumbers(product) {

    let productNumbers = localStorage.getItem('cartNumbers');

    //productNumbers will save as a string in local storage. here, we convert it from string to number.
    productNumbers = parseInt(productNumbers);

    //if there is products in my local storage, keep it and add a new item to that
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart').textContent = productNumbers + 1;
    } /* else, set item = 1*/
    else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart').textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem("productsInCart");

    //pass JSON file into JS object by JSON.parse()
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                //grab whatever is on my cartItems from before using the rest operator "define by 3 dots"
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCard += 1;
    } else {
        product.inCard = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    //convert JS object to JSON to able to save data in local sotrage by JSON.stringify()
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

//calculate procucts cost
function totalCost(product) {
    let cartCost = localStorage.getItem("totalCost");
    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCarts() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products-container");
    let paymentBtn = document.querySelector(".paymentBtn");
    let cartCost = localStorage.getItem("totalCost");
    //console.log(cartItems);

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML +=
                `
                <tr>
                    <th scope="row">
                        <img src="../image/${item.tag}.jpg" style="width:100px;">
                    </th>
                    <td class="align-middle">${item.name}</td>
                    <td class="align-middle">kr ${item.price}</td>
                    <td class="align-middle">${item.inCard}</td>
                    <td class="align-middle">kr ${item.inCard * item.price}</td>
                    <td class="align-middle"><button type="button" class="btn btn-danger btn-sm">Remove</button></td>
                </tr>
            `
        });

        productContainer.innerHTML +=
            `
            <tr>
                <th scope="row"></th>
                <td class="align-middle"></td>
                <td class="align-middle"></td>
                <td class="align-middle font-weight-bold">Total Cost: </td>
                <td class="align-middle font-weight-bold">kr ${cartCost}</td>
                <td class="align-middle"></td>
            </tr> </br>
        `;

        paymentBtn.innerHTML +=
            `
            <div>
                <button class="btn btn-primary btn-lg ">Go to Payment</button>
            </div>
        `;

    };
}


onLoadCardNumbers()
displayCarts()