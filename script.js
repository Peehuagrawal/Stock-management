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

    // Populate sales table
    const salesTable = document.getElementById('salesTable');
    for (const date in sales) {
        for (const item in sales[date]) {
            const row = salesTable.insertRow();
            row.insertCell(0).innerText = date;
            row.insertCell(1).innerText = item;
            row.insertCell(2).innerText = sales[date][item];
        }
    }
}

// Calculate total sales for the selected date
function calculateTotalSalesForDate() {
    const selectedDate = document.getElementById('salesDate').value;
    const inventory = JSON.parse(localStorage.getItem('inventory')) || {};
    const sales = JSON.parse(localStorage.getItem('sales')) || {};
    let totalSales = 0;

    if (sales[selectedDate]) {
        for (const item in sales[selectedDate]) {
            const quantitySold = sales[selectedDate][item];
            const costPrice = inventory[item] ? inventory[item].price : 0;
            totalSales += costPrice * quantitySold; // Calculate total sales
        }
    }

    // Display total sales for the selected date
    document.getElementById('totalSalesForDate').innerText = `Total Sales: ₹${totalSales.toFixed(2)}`; // Change to ₹
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

// Record sale
function recordSale() {
    const saleDate = document.getElementById('saleDate').value;
    const saleItemName = document.getElementById('saleItemName').value;
    const quantitySold = parseInt(document.getElementById('quantitySold').value);

    const inventory = JSON.parse(localStorage.getItem('inventory')) || {};
    const sales = JSON.parse(localStorage.getItem('sales')) || {};

    if (inventory[saleItemName] && inventory[saleItemName].quantity >= quantitySold) {
        inventory[saleItemName].quantity -= quantitySold;
        if (!sales[saleDate]) {
            sales[saleDate] = {};
        }
        if (!sales[saleDate][saleItemName]) {
            sales[saleDate][saleItemName] = 0;
        }
        sales[saleDate][saleItemName] += quantitySold;

        localStorage.setItem('inventory', JSON.stringify(inventory));
        localStorage.setItem('sales', JSON.stringify(sales));
        
        location.reload(); // Reload to update the tables
    } else {
        alert("Not enough stock or item not found.");
    }
}

// Load data on page load
window.onload = loadData;