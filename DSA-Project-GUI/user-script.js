/**
 * =============================================================================
 * FOODPANDA PAKISTAN - USER DASHBOARD JAVASCRIPT
 * =============================================================================
 * 
 * This JavaScript file handles the user dashboard functionality including
 * restaurant browsing, menu viewing, order placement, and order tracking.
 * It provides the customer-facing interface for the food delivery system.
 * 
 * Features:
 * - Restaurant browsing and search
 * - Menu item viewing and ordering
 * - Order placement and tracking
 * - Real-time order status updates
 * - User statistics and order history
 * - Interactive UI with modals and notifications
 * 
 * @author Food Delivery System Team
 * @version 1.0
 */

/* =============================================================================
   GLOBAL VARIABLES AND STATE MANAGEMENT
   ============================================================================= */

/**
 * Global application state variables
 * Manages user session, orders, and application counters
 */
let currentUser = 'user123';        // Current user identifier
let userOrders = [];                // User's order history array
let orderCounter = 1;               // Auto-incrementing order ID counter

/* =============================================================================
   INITIALIZATION AND EVENT HANDLERS
   ============================================================================= */

/**
 * DOM Content Loaded Event Handler
 * Initializes the user dashboard with all necessary data and event listeners
 * 
 * @description Loads restaurants, user orders, updates statistics, and sets up search functionality
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize data from localStorage first
    initializeData();
    
    loadRestaurants();
    loadUserOrders();
    updateStats();
    
    /**
     * Search functionality event listener
     * Enables Enter key search for restaurants
     */
    document.getElementById('searchInput').addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            searchRestaurants();
        }
    });
});

/* =============================================================================
   RESTAURANT DISPLAY AND MANAGEMENT
   ============================================================================= */

/**
 * Loads and displays all restaurants in card format
 * Renders restaurant data from the global restaurants array
 * 
 * @function loadRestaurants
 * @description Creates restaurant cards and updates restaurant count statistics
 */
function loadRestaurants() {
    const container = document.getElementById('restaurantsContainer');
    container.innerHTML = '';

    // Create and append restaurant cards
    restaurants.forEach(restaurant => {
        const restaurantCard = createRestaurantCard(restaurant);
        container.appendChild(restaurantCard);
    });

    // Update statistics display
    document.getElementById('totalRestaurants').textContent = restaurants.length;
}

/**
 * Creates a restaurant card element with interactive features
 * Generates HTML structure for restaurant display with ratings and menu info
 * 
 * @function createRestaurantCard
 * @param {Object} restaurant - Restaurant object containing id, name, location, rating
 * @returns {HTMLElement} Complete restaurant card DOM element
 * @description Creates responsive restaurant card with click functionality for menu viewing
 */
function createRestaurantCard(restaurant) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4';
    
    // Handle missing image for newly added restaurants
    const imageElement = restaurant.image ? 
        `<img src="${restaurant.image}" alt="${restaurant.name}" class="card-img-top" style="height: 200px; object-fit: cover;">` :
        `<div class="d-flex align-items-center justify-content-center bg-light" style="height: 200px;">
            <i class="fas fa-utensils text-muted" style="font-size: 3rem;"></i>
        </div>`;
    
    col.innerHTML = `
        <div class="card restaurant-card fade-in" onclick="showMenu(${restaurant.id})">
            <div class="restaurant-image position-relative">
                ${imageElement}
                <div class="rating-badge">
                    <i class="fas fa-star me-1"></i>${restaurant.rating}
                </div>
            </div>
            <div class="card-body">
                <h5 class="card-title text-primary">${restaurant.name}</h5>
                <p class="card-text">
                    <i class="fas fa-map-marker-alt text-muted me-2"></i>${restaurant.location}
                </p>
                <div class="d-flex justify-content-between align-items-center">
                    <small class="text-muted">
                        <i class="fas fa-utensils me-1"></i>
                        ${getMenuItemCount(restaurant.id)} items
                    </small>
                    <span class="badge bg-primary">
                        <i class="fas fa-clock me-1"></i>25-35 min
                    </span>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

/**
 * Calculates menu item count for a specific restaurant
 * Filters menu items by restaurant ID and returns count
 * 
 * @function getMenuItemCount
 * @param {number} restaurantId - ID of the restaurant
 * @returns {number} Number of menu items for the restaurant
 * @description Counts menu items associated with a specific restaurant
 */
function getMenuItemCount(restaurantId) {
    return menuItems.filter(item => item.restaurantId === restaurantId).length;
}

/* =============================================================================
   MENU DISPLAY AND INTERACTION
   ============================================================================= */

/**
 * Displays restaurant menu in a modal dialog
 * Shows all menu items for a selected restaurant with ordering options
 * 
 * @function showMenu
 * @param {number} restaurantId - ID of the restaurant to display menu for
 * @description Creates modal with restaurant menu items and order buttons
 */
function showMenu(restaurantId) {
    // Find restaurant and its menu items
    const restaurant = restaurants.find(r => r.id === restaurantId);
    const restaurantMenuItems = menuItems.filter(item => item.restaurantId === restaurantId);
    
    // Set modal title with restaurant name
    document.getElementById('restaurantName').innerHTML = `
        <i class="fas fa-utensils me-2"></i>${restaurant.name} Menu
    `;
    
    const container = document.getElementById('menuItemsContainer');
    container.innerHTML = '';
    
    // Handle empty menu state
    if (restaurantMenuItems.length === 0) {
        container.innerHTML = `
            <div class="text-center py-4">
                <i class="fas fa-utensils text-muted" style="font-size: 3rem;"></i>
                <h4 class="text-muted mt-3">No menu items available</h4>
            </div>
        `;
    } else {
        // Create menu item cards with order buttons
        restaurantMenuItems.forEach(item => {
            const menuCard = document.createElement('div');
            menuCard.className = 'menu-item-card';
            menuCard.innerHTML = `
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <h6 class="mb-1">${item.name}</h6>
                        <small class="text-muted">Delicious ${item.name.toLowerCase()}</small>
                    </div>
                    <div class="col-md-3">
                        <span class="price-tag">Rs. ${item.price}</span>
                    </div>
                    <div class="col-md-3 text-end">
                        <button class="btn order-btn" onclick="placeOrder(${restaurantId}, ${item.id})">
                            <i class="fas fa-plus me-1"></i>Order Now
                        </button>
                    </div>
                </div>
            `;
            container.appendChild(menuCard);
        });
    }
    
    // Show the menu modal
    const modal = new bootstrap.Modal(document.getElementById('menuModal'));
    modal.show();
}

/* =============================================================================
   ORDER PLACEMENT AND PROCESSING
   ============================================================================= */

/**
 * Places an order for a specific menu item
 * Creates order object and adds to user orders and global queue
 * 
 * @function placeOrder
 * @param {number} restaurantId - ID of the restaurant
 * @param {number} menuItemId - ID of the menu item to order
 * @description Processes order placement with validation and user feedback
 */
function placeOrder(restaurantId, menuItemId) {
    // Find restaurant and menu item details
    const restaurant = restaurants.find(r => r.id === restaurantId);
    const menuItem = menuItems.find(m => m.id === menuItemId);
    
    /**
     * Create order object matching C++ backend structure
     * Contains all necessary order information for processing
     */
    const order = {
        id: orderCounter++,                    // Unique order ID
        restaurantId: restaurantId,            // Restaurant reference
        restaurantName: restaurant.name,       // Restaurant name for display
        menuItemId: menuItemId,               // Menu item reference
        menuItemName: menuItem.name,          // Menu item name for display
        price: menuItem.price,                // Order price
        userId: currentUser,                  // User identifier
        status: 'pending',                    // Initial order status
        orderTime: new Date().toLocaleString(), // Order timestamp
        estimatedDelivery: calculateETA()     // Estimated delivery time
    };
    
    // Add order to user's order history and global order queue
    userOrders.push(order);
    orderQueue.push(order);
    
    // Display success modal with order details
    document.getElementById('orderIdDisplay').textContent = `#ORD${order.id.toString().padStart(3, '0')}`;
    document.getElementById('estimatedTime').textContent = order.estimatedDelivery;
    
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    successModal.show();
    
    // Close menu modal
    const menuModal = bootstrap.Modal.getInstance(document.getElementById('menuModal'));
    menuModal.hide();
    
    // Update dashboard statistics and show confirmation
    updateStats();
    showToast('Order placed successfully!');
}

/**
 * Calculates estimated delivery time
 * Uses random algorithm matching C++ backend logic
 * 
 * @function calculateETA
 * @returns {string} Formatted delivery time range
 * @description Generates realistic delivery time estimate with base time + random variance
 */
function calculateETA() {
    const baseTime = 20;                                    // Base delivery time in minutes
    const randomTime = Math.floor(Math.random() * 20) + 1; // Random variance (1-20 minutes)
    const totalTime = baseTime + randomTime;               // Total estimated time
    return `${totalTime}-${totalTime + 10} minutes`;       // Return time range
}

/* =============================================================================
   SEARCH AND FILTERING
   ============================================================================= */

/**
 * Searches restaurants by name or location
 * Filters restaurants based on user input and updates display
 * 
 * @function searchRestaurants
 * @description Performs case-insensitive search on restaurant name and location
 */
function searchRestaurants() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const container = document.getElementById('restaurantsContainer');
    container.innerHTML = '';
    
    // Filter restaurants by search term
    const filteredRestaurants = restaurants.filter(restaurant => 
        restaurant.name.toLowerCase().includes(searchTerm) ||
        restaurant.location.toLowerCase().includes(searchTerm)
    );
    
    // Handle no results found
    if (filteredRestaurants.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-search text-muted" style="font-size: 3rem;"></i>
                <h4 class="text-muted mt-3">No restaurants found</h4>
                <p class="text-muted">Try searching with different keywords</p>
            </div>
        `;
    } else {
        // Display filtered results
        filteredRestaurants.forEach(restaurant => {
            const restaurantCard = createRestaurantCard(restaurant);
            container.appendChild(restaurantCard);
        });
    }
}

/* =============================================================================
   ORDER HISTORY AND TRACKING
   ============================================================================= */

/**
 * Loads and displays user's order history
 * Shows all user orders in reverse chronological order
 * 
 * @function loadUserOrders
 * @description Renders order history with status indicators and order details
 */
function loadUserOrders() {
    const container = document.getElementById('orderHistoryContainer');
    container.innerHTML = '';
    
    // Handle empty order history
    if (userOrders.length === 0) {
        container.innerHTML = `
            <div class="text-center py-4">
                <i class="fas fa-shopping-bag text-muted" style="font-size: 3rem;"></i>
                <h4 class="text-muted mt-3">No orders yet</h4>
                <p class="text-muted">Start ordering from your favorite restaurants!</p>
            </div>
        `;
    } else {
        // Display orders in reverse chronological order (most recent first)
        userOrders.reverse().forEach(order => {
            const orderCard = document.createElement('div');
            orderCard.className = 'order-history-card';
            orderCard.innerHTML = `
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <h6 class="mb-1">${order.menuItemName}</h6>
                        <small class="text-muted">${order.restaurantName}</small>
                    </div>
                    <div class="col-md-3">
                        <strong>Rs. ${order.price}</strong><br>
                        <small class="text-muted">${order.orderTime}</small>
                    </div>
                    <div class="col-md-3 text-end">
                        <span class="status-badge ${order.status === 'delivered' ? 'status-delivered' : 'status-pending'}">
                            <i class="fas ${order.status === 'delivered' ? 'fa-check' : 'fa-clock'} me-1"></i>
                            ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                    </div>
                </div>
            `;
            container.appendChild(orderCard);
        });
    }
}

/* =============================================================================
   STATISTICS AND UI UPDATES
   ============================================================================= */

/**
 * Updates dashboard statistics display
 * Calculates and displays total orders and pending orders count
 * 
 * @function updateStats
 * @description Updates real-time statistics on the user dashboard
 */
function updateStats() {
    // Update total orders count
    document.getElementById('totalOrders').textContent = userOrders.length;
    
    // Update pending orders count
    document.getElementById('pendingOrders').textContent = 
        userOrders.filter(order => order.status === 'pending').length;
}

/* =============================================================================
   NOTIFICATION SYSTEM
   ============================================================================= */

/**
 * Displays toast notification for user feedback
 * Shows Bootstrap toast with custom message
 * 
 * @function showToast
 * @param {string} message - Message to display in the toast
 * @description Shows success notification to user with fade-in/out animation
 */
function showToast(message) {
    const toast = document.getElementById('orderToast');
    toast.querySelector('.toast-body').textContent = message;
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
}

/* =============================================================================
   DEMO SIMULATION AND REAL-TIME UPDATES
   ============================================================================= */

/**
 * Simulates order processing for demonstration purposes
 * Randomly updates pending orders to delivered status
 * 
 * @description Runs every 10 seconds to simulate real-time order processing
 * In production, this would be replaced with real-time updates from the backend
 */
setInterval(() => {
    const pendingOrders = userOrders.filter(order => order.status === 'pending');
    
    // 30% chance to process a random pending order
    if (pendingOrders.length > 0 && Math.random() > 0.7) {
        const randomOrder = pendingOrders[Math.floor(Math.random() * pendingOrders.length)];
        randomOrder.status = 'delivered';
        
        // Update UI to reflect status change
        updateStats();
        loadUserOrders();
    }
}, 10000); // Check every 10 seconds