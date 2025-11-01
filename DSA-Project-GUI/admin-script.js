/**
 * =============================================================================
 * FOODPANDA PAKISTAN - ADMIN DASHBOARD JAVASCRIPT
 * =============================================================================
 * 
 * This JavaScript file handles the admin dashboard functionality including
 * restaurant management, menu item management, order processing, and statistics.
 * It provides comprehensive administrative controls for the food delivery system.
 * 
 * Features:
 * - Restaurant CRUD operations
 * - Menu item management
 * - Order queue processing
 * - Real-time statistics updates
 * - Interactive data visualization
 * - Modal-based detailed views
 * - Toast notifications for admin feedback
 * 
 * @author Food Delivery System Team
 * @version 1.0
 */

/* =============================================================================
   INITIALIZATION AND DASHBOARD SETUP
   ============================================================================= */

/**
 * DOM Content Loaded Event Handler
 * Initializes the admin dashboard with all necessary data and displays
 * 
 * @description Loads dashboard data, updates statistics, and populates all displays
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize data from localStorage first
    initializeData();
    
    loadDashboard();
    updateStatistics();
    populateRestaurantSelect();
    displayRestaurants();
    displayMenuItems();
    displayPendingOrders();
    displayOrderHistory();
});

/**
 * Loads and initializes dashboard data
 * Ensures sample data is available if the system is empty
 * 
 * @function loadDashboard
 * @description Initializes dashboard with sample data if no data exists
 */
function loadDashboard() {
    // Initialize with sample data if empty
    if (restaurants.length === 0) {
        initializeSampleData();
    }
}

/* =============================================================================
   STATISTICS AND METRICS
   ============================================================================= */

/**
 * Updates all dashboard statistics and metrics
 * Calculates and displays real-time system statistics
 * 
 * @function updateStatistics
 * @description Updates restaurant count, menu items, pending orders, and completed orders
 */
function updateStatistics() {
    // Update total restaurants count
    document.getElementById('totalRestaurants').textContent = restaurants.length;
    
    // Calculate total menu items across all restaurants
    let totalMenuItems = 0;
    restaurants.forEach(restaurant => {
        totalMenuItems += restaurant.menu.length;
    });
    document.getElementById('totalMenuItems').textContent = totalMenuItems;
    
    // Update order statistics
    document.getElementById('pendingOrders').textContent = orderQueue.length;
    document.getElementById('completedOrders').textContent = orderHistory.length;
    
    // Update notification badges
    document.getElementById('pendingOrdersBadge').textContent = orderQueue.length;
    document.getElementById('historyOrdersBadge').textContent = orderHistory.length;
}

/* =============================================================================
   RESTAURANT MANAGEMENT
   ============================================================================= */

/**
 * Add Restaurant Form Submission Handler
 * Processes new restaurant creation with validation and feedback
 */
document.getElementById('addRestaurantForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Extract form data
    const name = document.getElementById('restaurantName').value;
    const location = document.getElementById('restaurantLocation').value;
    const rating = parseFloat(document.getElementById('restaurantRating').value);
    
    /**
     * Create new restaurant object
     * Uses auto-incrementing ID for unique identification
     */
    const newRestaurant = {
        id: nextRestaurantId++,
        name: name,
        location: location,
        rating: rating,
        menu: [] // Initialize with empty menu
    };
    
    // Add to restaurants array
    restaurants.push(newRestaurant);
    
    // Save to localStorage
    saveRestaurantsToStorage();
    
    // Reset form for next entry
    this.reset();
    
    // Update all relevant displays
    displayRestaurants();
    populateRestaurantSelect();
    updateStatistics();
    
    showToast(`Restaurant "${name}" added successfully!`, 'success');
});

/**
 * Displays restaurants in a formatted table
 * Shows restaurant details with interactive elements
 * 
 * @function displayRestaurants
 * @description Renders restaurant data in table format with action buttons
 */
function displayRestaurants() {
    const tbody = document.getElementById('restaurantsTableBody');
    tbody.innerHTML = '';
    
    restaurants.forEach(restaurant => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>#${restaurant.id}</strong></td>
            <td>${restaurant.name}</td>
            <td><i class="fas fa-map-marker-alt me-1"></i>${restaurant.location}</td>
            <td>
                <span class="rating-stars">
                    ${generateStars(restaurant.rating)}
                </span>
                <small class="text-muted">(${restaurant.rating})</small>
            </td>
            <td><span class="badge bg-primary">${restaurant.menu.length} items</span></td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="viewRestaurantMenu(${restaurant.id})">
                    <i class="fas fa-eye me-1"></i>View Menu
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

/**
 * Generates star rating display HTML
 * Creates visual star representation of numeric rating
 * 
 * @function generateStars
 * @param {number} rating - Numeric rating (0-5)
 * @returns {string} HTML string with star icons
 * @description Converts numeric rating to visual star display with full, half, and empty stars
 */
function generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    // Add half star if needed
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Add empty stars to complete 5-star display
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

/**
 * Populates restaurant selection dropdown
 * Updates dropdown options for menu item assignment
 * 
 * @function populateRestaurantSelect
 * @description Fills restaurant dropdown with current restaurant list
 */
function populateRestaurantSelect() {
    const select = document.getElementById('menuRestaurant');
    select.innerHTML = '<option value="">Choose restaurant...</option>';
    
    restaurants.forEach(restaurant => {
        const option = document.createElement('option');
        option.value = restaurant.id;
        option.textContent = `${restaurant.name} (${restaurant.location})`;
        select.appendChild(option);
    });
}

/* =============================================================================
   MENU ITEM MANAGEMENT
   ============================================================================= */

/**
 * Add Menu Item Form Submission Handler
 * Processes new menu item creation and assignment to restaurants
 */
document.getElementById('addMenuItemForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Extract form data
    const restaurantId = parseInt(document.getElementById('menuRestaurant').value);
    const itemName = document.getElementById('menuItemName').value;
    const price = parseFloat(document.getElementById('menuItemPrice').value);
    
    // Find target restaurant
    const restaurant = restaurants.find(r => r.id === restaurantId);
    if (restaurant) {
        /**
         * Create new menu item object
         * Uses auto-incrementing ID for unique identification
         */
        const newMenuItem = {
            id: nextMenuItemId++,
            name: itemName,
            price: price
        };
        
        // Add to restaurant's menu
        restaurant.menu.push(newMenuItem);
        
        // Save to localStorage
        saveRestaurantsToStorage();
        
        // Reset form for next entry
        this.reset();
        
        // Update all relevant displays
        displayRestaurants();
        displayMenuItems();
        updateStatistics();
        
        showToast(`Menu item "${itemName}" added to ${restaurant.name}!`, 'success');
    }
});

/**
 * Displays all menu items organized by restaurant
 * Shows comprehensive menu overview with pricing
 * 
 * @function displayMenuItems
 * @description Renders menu items grouped by restaurant in card format
 */
function displayMenuItems() {
    const container = document.getElementById('menuItemsDisplay');
    
    if (restaurants.length === 0) {
        container.innerHTML = '<p class="text-muted text-center">Add restaurants first to manage menu items</p>';
        return;
    }
    
    let html = '';
    restaurants.forEach(restaurant => {
        html += `
            <div class="mb-4">
                <h5 class="text-primary">
                    <i class="fas fa-store me-2"></i>${restaurant.name}
                    <small class="text-muted">(${restaurant.location})</small>
                </h5>
                <div class="row">
        `;
        
        if (restaurant.menu.length === 0) {
            html += '<div class="col-12"><p class="text-muted">No menu items yet</p></div>';
        } else {
            restaurant.menu.forEach(item => {
                html += `
                    <div class="col-md-6 mb-2">
                        <div class="d-flex justify-content-between align-items-center p-2 border rounded">
                            <div>
                                <strong>${item.name}</strong>
                                <br><small class="text-muted">ID: ${item.id}</small>
                            </div>
                            <span class="badge bg-success">PKR ${item.price.toFixed(2)}</span>
                        </div>
                    </div>
                `;
            });
        }
        
        html += '</div><hr></div>';
    });
    
    container.innerHTML = html;
}

/* =============================================================================
   ORDER MANAGEMENT
   ============================================================================= */

/**
 * Displays pending orders in the queue
 * Shows orders awaiting processing with customer details
 * 
 * @function displayPendingOrders
 * @description Renders pending orders with restaurant, item, and customer information
 */
function displayPendingOrders() {
    const container = document.getElementById('pendingOrdersList');
    
    if (orderQueue.length === 0) {
        container.innerHTML = '<p class="text-muted text-center">No pending orders</p>';
        return;
    }
    
    let html = '';
    orderQueue.forEach(order => {
        // Find associated restaurant and menu item
        const restaurant = restaurants.find(r => r.id === order.restaurantId);
        const menuItem = restaurant ? restaurant.menu.find(m => m.id === order.menuItemId) : null;
        
        html += `
            <div class="card mb-3">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start">
                        <div>
                            <h6 class="card-title">Order #${order.orderId}</h6>
                            <p class="card-text mb-1">
                                <strong>Restaurant:</strong> ${restaurant ? restaurant.name : 'Unknown'}<br>
                                <strong>Item:</strong> ${menuItem ? menuItem.name : 'Unknown'}<br>
                                <strong>Customer:</strong> ${order.customerName}<br>
                                <strong>Address:</strong> ${order.customerAddress}
                            </p>
                        </div>
                        <div class="text-end">
                            <span class="order-status status-pending">Pending</span>
                            <br><small class="text-muted">ETA: ${order.estimatedMinutes} min</small>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

/**
 * Displays order history in table format
 * Shows completed orders with delivery details
 * 
 * @function displayOrderHistory
 * @description Renders completed orders in reverse chronological order
 */
function displayOrderHistory() {
    const tbody = document.getElementById('orderHistoryTableBody');
    tbody.innerHTML = '';
    
    // Display in reverse order (most recent first)
    for (let i = orderHistory.length - 1; i >= 0; i--) {
        const order = orderHistory[i];
        // Find associated restaurant and menu item
        const restaurant = restaurants.find(r => r.id === order.restaurantId);
        const menuItem = restaurant ? restaurant.menu.find(m => m.id === order.menuItemId) : null;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>#${order.orderId}</strong></td>
            <td>${restaurant ? restaurant.name : 'Unknown'}</td>
            <td>${menuItem ? menuItem.name : 'Unknown'}</td>
            <td>${order.customerName}</td>
            <td>${order.customerAddress}</td>
            <td>${order.estimatedMinutes}</td>
            <td><span class="order-status status-delivered">Delivered</span></td>
        `;
        tbody.appendChild(row);
    }
}

/* =============================================================================
   ORDER PROCESSING OPERATIONS
   ============================================================================= */

/**
 * Processes the next order in the queue
 * Moves order from pending to completed status
 * 
 * @function processNextOrder
 * @description Processes first order in queue using FIFO principle
 */
function processNextOrder() {
    if (orderQueue.length === 0) {
        showToast('No pending orders to process!', 'warning');
        return;
    }
    
    // Remove from front of queue (FIFO)
    const order = orderQueue.shift();
    // Add to completed orders history
    orderHistory.push(order);
    
    // Get order details for notification
    const restaurant = restaurants.find(r => r.id === order.restaurantId);
    const menuItem = restaurant ? restaurant.menu.find(m => m.id === order.menuItemId) : null;
    
    // Update all relevant displays
    displayPendingOrders();
    displayOrderHistory();
    updateStatistics();
    
    showToast(`Order #${order.orderId} processed and delivered to ${order.customerName}!`, 'success');
}

/* =============================================================================
   UTILITY FUNCTIONS
   ============================================================================= */

/**
 * Sorts restaurants by rating in descending order
 * Updates display to show highest-rated restaurants first
 * 
 * @function sortRestaurantsByRating
 * @description Sorts restaurants array by rating and refreshes display
 */
function sortRestaurantsByRating() {
    restaurants.sort((a, b) => b.rating - a.rating);
    displayRestaurants();
    showToast('Restaurants sorted by rating (highest first)!', 'info');
}

/**
 * Displays restaurant menu in a modal dialog
 * Shows detailed menu items with pricing information
 * 
 * @function viewRestaurantMenu
 * @param {number} restaurantId - ID of the restaurant to display
 * @description Creates and shows modal with restaurant's complete menu
 */
function viewRestaurantMenu(restaurantId) {
    const restaurant = restaurants.find(r => r.id === restaurantId);
    if (!restaurant) return;
    
    // Build modal HTML structure
    let menuHtml = `
        <div class="modal fade" id="menuModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i class="fas fa-utensils me-2"></i>
                            ${restaurant.name} Menu
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
    `;
    
    // Add menu items or empty state message
    if (restaurant.menu.length === 0) {
        menuHtml += '<div class="col-12"><p class="text-muted text-center">No menu items available</p></div>';
    } else {
        restaurant.menu.forEach(item => {
            menuHtml += `
                <div class="col-md-6 mb-3">
                    <div class="card">
                        <div class="card-body">
                            <h6 class="card-title">${item.name}</h6>
                            <p class="card-text">
                                <span class="badge bg-success">PKR ${item.price.toFixed(2)}</span>
                                <br><small class="text-muted">Item ID: ${item.id}</small>
                            </p>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    
    menuHtml += `
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('menuModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add new modal to DOM and show
    document.body.insertAdjacentHTML('beforeend', menuHtml);
    const modal = new bootstrap.Modal(document.getElementById('menuModal'));
    modal.show();
}

/* =============================================================================
   NOTIFICATION SYSTEM
   ============================================================================= */

/**
 * Displays toast notifications for admin feedback
 * Creates dynamic toast messages with different styles and icons
 * 
 * @function showToast
 * @param {string} message - The message to display in the toast
 * @param {string} type - The type of toast ('success', 'error', 'warning', 'info')
 * @description Shows Bootstrap toast notifications with appropriate styling and icons
 */
function showToast(message, type = 'success') {
    const toast = document.getElementById('adminToast');
    const toastMessage = document.getElementById('adminToastMessage');
    const toastHeader = toast.querySelector('.toast-header');
    
    // Set the toast message content
    toastMessage.textContent = message;
    
    // Determine icon and title based on message type
    let icon = 'fas fa-check-circle text-success';
    let title = 'Success';
    
    if (type === 'error') {
        icon = 'fas fa-exclamation-circle text-danger';
        title = 'Error';
    } else if (type === 'warning') {
        icon = 'fas fa-exclamation-triangle text-warning';
        title = 'Warning';
    } else if (type === 'info') {
        icon = 'fas fa-info-circle text-info';
        title = 'Info';
    }
    
    // Update toast header with appropriate icon and title
    toastHeader.innerHTML = `
        <i class="${icon} me-2"></i>
        <strong class="me-auto">${title}</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
    `;
    
    // Initialize and show Bootstrap toast
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
}