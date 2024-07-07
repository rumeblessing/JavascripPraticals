document.addEventListener("DOMContentLoaded", function () {
    var inputarea = document.getElementById("text");
    var clickMe = document.getElementById("click");
    var list = document.querySelector(".items .list-group");
    var cartList = document.getElementById("cart-list");
    var totalItems = document.getElementById("total-items");
    var errorMessage = document.getElementById("error-message");

    const setError = (message) => {
        errorMessage.innerText = message;
        errorMessage.classList.add('error');
    };

    var addedItems = [];
    var addFinalItem = [];

    const removeItem = (itemName) => {
        const index = addedItems.indexOf(itemName);
        if (index !== -1) {
            addedItems.splice(index, 1);
            console.log('Item removed:', itemName);
            console.log('Updated addedItems:', addedItems);
        }
    };

    const removeCartItem = (itemName) => {
        const index = addFinalItem.indexOf(itemName);
        if (index !== -1) {
            addFinalItem.splice(index, 1);
            console.log('Item removed from cart:', itemName);
            console.log('Updated addFinalItem:', addFinalItem);
            updateCartView();
        }
    };

    const addItem = (itemName) => {
        if (!addedItems.includes(itemName)) {
            errorMessage.innerText = '';

            const myList = document.createElement("li");
            myList.classList.add("list-group-item");
            myList.dataset.item = itemName; // Set a data attribute for the item name
            myList.innerHTML = `
                <div class="row">
                    <div class="col-lg-8">
                        <p>${itemName}</p>
                    </div>
                    <div class="col-lg-4">
                        <div class="btn-group" role="group">
                            <button class="remove-btn">-</button>
                            <button class="add-btn">+</button>
                        </div>
                    </div>
                </div>
            `;

            list.appendChild(myList);

            addedItems.push(itemName);

            // Add event listener to the new remove button
            const removeButton = myList.querySelector('.remove-btn');
            removeButton.addEventListener('click', () => {
                removeItem(itemName);
                removeCartItem(itemName);
                myList.remove();
            });

            inputarea.value = "";
        } else {
            setError('Item already added');
        }
    };

    clickMe.addEventListener('click', (e) => {
        if (inputarea.value.trim() !== "") {
            e.preventDefault();
            if (!addedItems.includes(inputarea.value.trim())) {
                addItem(inputarea.value.trim());
            } else {
                setError('Item already added');
            }
        } else {
            setError('Please enter an item');
        }
    });

    const updateCartView = () => {
        errorMessage.innerText = '';
        cartList.innerHTML = '';
    
        if (addFinalItem.length > 0) {
            addFinalItem.forEach(item => {
                const cartItem = document.createElement("li");
                cartItem.classList.add("list-group-item");
                cartItem.innerText = item;
    
                cartList.appendChild(cartItem);
            });
        } else {
            cartList.innerText = 'Your cart is empty';
        }
    
        totalItems.innerText = addFinalItem.length;
    };
    
    // Event listener for the "-" button in the list items
    list.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const listItem = e.target.closest('.list-group-item');
            const itemName = listItem.dataset.item; // Retrieve item name from the data attribute
            listItem.remove();
            removeItem(itemName);
            removeCartItem(itemName);
        }
    });

    // Event listener for the "+" button in the list items
    list.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-btn')) {
            const listItem = e.target.closest('.list-group-item');
            const itemName = listItem.dataset.item; // Retrieve item name from the data attribute
            if (itemName !== "") {
                errorMessage.innerText = '';
                const existsInAddedItems = addedItems.includes(itemName);

                if (existsInAddedItems && !addFinalItem.includes(itemName)) {
                    addFinalItem.push(itemName);
                }

                updateCartView();
            } else {
                setError('Please enter an item');
            }
        }
    });

    updateCartView();
});
