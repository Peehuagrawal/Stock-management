// Load data from local storage
function loadData() {
    const inventory = JSON.parse(localStorage.getItem('inventory')) || {};
    const sales = JSON.parse(localStorage.getItem('sales')) || {};

    // Populate inventory table
    const inventoryTable = document.getElementById('inventoryTable');
    for (const item in inventory) {
        const row = inventoryTable.insertRow();
        row.insertCell(0).innerText = item;
        row.insertCell(1).innerText = `₹${inventory[item].price.toFixed(2)}`; // Change to ₹
        row.insertCell(2).innerText = inventory[item].quantity;
    }

    // Populate sales table and calculate total sales
    const salesTable = document.getElementById('salesTable');
    let totalSales = 0; // Initialize total sales
    for (const date in sales) {
        for (const item in sales[date]) {
            const row = salesTable.insertRow();
            row.insertCell(0).innerText = date;
            row.insertCell(1).innerText = item;
            row.insertCell(2).innerText = sales[date][item];

            // Calculate total sales for each sale
            const costPrice = inventory[item] ? inventory[item].price : 0;
            const quantitySold = sales[date][item];
            totalSales += costPrice * quantitySold; // Update total sales
        }
    }

    // Display total sales
    document.getElementById('totalSales').innerText = `Total Sales: ₹${totalSales.toFixed(2)}`; // Change to ₹
}

// Add item to inventory
function addItem() {
    const itemName = document.getElementById('itemName').value;
    const itemPrice = parseFloat(document.getElementById('itemPrice').value);

    if (itemName && !isNaN(itemPrice)) {
        const inventory = JSON.parse(localStorage.getItem('inventory')) || {};
        if (!inventory[itemName]) {
            inventory[itemName] = { price: itemPrice, quantity: 0 };
            localStorage.setItem('inventory', JSON.stringify(inventory));
            location.reload(); // Reload to update the table
        } else {
            alert("Item already exists.");
        }
    } else {
        alert("Please enter valid item details.");
    }
}

// Update stock
function updateStock() {
    const itemName = document.getElementById('updateItemName').value;
    const quantityChange = parseInt(document.getElementById('quantityChange').value);

    const inventory = JSON.parse(localStorage.getItem('inventory')) || {};
    if (inventory[itemName]) {
        inventory[itemName].quantity += quantityChange;
        localStorage.setItem('inventory', JSON.stringify(inventory));
        location.reload(); // Reload to update the table
    } else {
        alert("Item not found in inventory.");
    }
}

// Record