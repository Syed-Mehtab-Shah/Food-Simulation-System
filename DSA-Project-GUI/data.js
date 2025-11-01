/**
 * Food Delivery System - Mock Data and Utility Functions
 * 
 * This file contains all the mock data and utility functions for the food delivery system.
 * It mirrors the C++ DSA Project structure and provides JavaScript equivalents of the
 * data structures and algorithms used in the backend.
 * 
 * Data Structures:
 * - restaurants: Array of restaurant objects
 * - menuItems: Array of menu item objects linked to restaurants
 * - orderQueue: Queue for pending orders (FIFO structure)
 * - orderHistory: Array of completed orders
 * 
 * @author Food Delivery System Team
 * @version 1.0
 */

/**
 * Restaurant Data Structure
 * Represents a restaurant in the food delivery system
 * Each restaurant has a unique ID, name, location, and rating
 * Matches the C++ Restaurant struct from the backend
 */
let restaurants = [
    {
        id: 1,
        name: "Karachi Biryani House",
        location: "Karachi, Pakistan",
        rating: 4.8,
        image: "assets/Karachi-Biryani-House.jpeg",
        menu: [
            { id: 1, name: "Chicken Biryani", price: 450 },
            { id: 2, name: "Mutton Biryani", price: 650 },
            { id: 3, name: "Beef Biryani", price: 550 },
            { id: 4, name: "Prawn Biryani", price: 750 },
            { id: 5, name: "Vegetable Biryani", price: 350 }
        ]
    },
    {
        id: 2,
        name: "Lahore BBQ Corner",
        location: "Lahore, Pakistan",
        rating: 4.6,
        image: "assets/Lahore-BBQ-Corner.png",
        menu: [
            { id: 6, name: "Seekh Kebab", price: 300 },
            { id: 7, name: "Chicken Tikka", price: 400 },
            { id: 8, name: "Lamb Chops", price: 800 },
            { id: 9, name: "BBQ Platter", price: 1200 },
            { id: 10, name: "Grilled Fish", price: 600 }
        ]
    },
    {
        id: 3,
        name: "Islamabad Grill & Fast Food",
        location: "Islamabad, Pakistan",
        rating: 4.5,
        image: "assets/Islamabad-Grill.webp",
        menu: [
            { id: 11, name: "Chicken Burger", price: 250 },
            { id: 12, name: "Beef Burger", price: 300 },
            { id: 13, name: "Club Sandwich", price: 200 },
            { id: 14, name: "Chicken Roll", price: 180 },
            { id: 15, name: "French Fries", price: 120 },
            { id: 16, name: "Chicken Wings", price: 350 }
        ]
    },
    {
        id: 4,
        name: "Peshawar Chapli Kebab",
        location: "Peshawar, Pakistan",
        rating: 4.7,
        image: "assets/Peshawri-chapli-kabab.png",
        menu: [
            { id: 17, name: "Chapli Kebab", price: 200 },
            { id: 18, name: "Peshawari Karahi", price: 800 },
            { id: 19, name: "Lamb Karahi", price: 900 },
            { id: 20, name: "Chicken Karahi", price: 700 },
            { id: 21, name: "Afghani Pulao", price: 400 }
        ]
    },
    {
        id: 5,
        name: "Multan Sohan Halwa House",
        location: "Multan, Pakistan",
        rating: 4.4,
        image: "assets/Multani-Sohan-Halwa.webp",
        menu: [
            { id: 22, name: "Sohan Halwa", price: 150 },
            { id: 23, name: "Gulab Jamun", price: 100 },
            { id: 24, name: "Ras Malai", price: 120 },
            { id: 25, name: "Kheer", price: 80 },
            { id: 26, name: "Jalebi", price: 90 }
        ]
    },
    {
        id: 6,
        name: "Hyderabad Sindhi Cuisine",
        location: "Hyderabad, Pakistan",
        rating: 4.3,
        image: "assets/Hyderabad-Sindhi-Cusiune.jpg",
        menu: [
            { id: 27, name: "Sindhi Biryani", price: 400 },
            { id: 28, name: "Sai Bhaji", price: 250 },
            { id: 29, name: "Koki", price: 80 },
            { id: 30, name: "Sindhi Curry", price: 300 },
            { id: 31, name: "Dal Pakwan", price: 150 }
        ]
    },
    {
        id: 7,
        name: "Faisalabad Desi Dhaba",
        location: "Faisalabad, Pakistan",
        rating: 4.5,
        image: "assets/Faislabad-Desi-Dhaba.webp",
        menu: [
            { id: 32, name: "Daal Makhani", price: 200 },
            { id: 33, name: "Butter Chicken", price: 500 },
            { id: 34, name: "Naan", price: 50 },
            { id: 35, name: "Tandoori Roti", price: 30 },
            { id: 36, name: "Mixed Vegetables", price: 180 },
            { id: 37, name: "Lassi", price: 80 }
        ]
    },
    {
        id: 8,
        name: "Quetta Balochi Restaurant",
        location: "Quetta, Pakistan",
        rating: 4.6,
        image: "assets/Quetta-Balochi-Resturant.jpg",
        menu: [
            { id: 38, name: "Balochi Sajji", price: 1000 },
            { id: 39, name: "Lamb Roast", price: 800 },
            { id: 40, name: "Chicken Sajji", price: 600 },
            { id: 41, name: "Balochi Pulao", price: 350 },
            { id: 42, name: "Dry Fruit Rice", price: 400 }
        ]
    }
];

/**
 * Menu Items Data Structure
 * Represents menu items available at different restaurants
 * Each menu item is linked to a restaurant via restaurantId
 * Matches the C++ MenuItem struct from the backend
 * 
 * Structure:
 * - id: Unique identifier for the menu item
 * - restaurantId: Foreign key linking to restaurant
 * - name: Name of the menu item
 * - price: Price in local currency (PKR)
 */
let menuItems = [
    // Karachi Biryani House (Restaurant ID: 1) - Specializes in various types of biryani
    { id: 1, restaurantId: 1, name: "Chicken Biryani", price: 450 },
    { id: 2, restaurantId: 1, name: "Mutton Biryani", price: 650 },
    { id: 3, restaurantId: 1, name: "Beef Biryani", price: 550 },
    { id: 4, restaurantId: 1, name: "Prawn Biryani", price: 750 },
    { id: 5, restaurantId: 1, name: "Vegetable Biryani", price: 350 },

    // Lahore BBQ Corner (Restaurant ID: 2) - Famous for grilled and BBQ items
    { id: 6, restaurantId: 2, name: "Seekh Kebab", price: 300 },
    { id: 7, restaurantId: 2, name: "Chicken Tikka", price: 400 },
    { id: 8, restaurantId: 2, name: "Lamb Chops", price: 800 },
    { id: 9, restaurantId: 2, name: "BBQ Platter", price: 1200 },
    { id: 10, restaurantId: 2, name: "Grilled Fish", price: 600 },

    // Islamabad Grill & Fast Food (Restaurant ID: 3) - Modern fast food and grilled items
    { id: 11, restaurantId: 3, name: "Chicken Burger", price: 250 },
    { id: 12, restaurantId: 3, name: "Beef Burger", price: 300 },
    { id: 13, restaurantId: 3, name: "Club Sandwich", price: 200 },
    { id: 14, restaurantId: 3, name: "Chicken Roll", price: 180 },
    { id: 15, restaurantId: 3, name: "French Fries", price: 120 },
    { id: 16, restaurantId: 3, name: "Chicken Wings", price: 350 },

    // Peshawar Chapli Kebab (Restaurant ID: 4) - Traditional Peshawari and Afghan cuisine
    { id: 17, restaurantId: 4, name: "Chapli Kebab", price: 200 },
    { id: 18, restaurantId: 4, name: "Peshawari Karahi", price: 800 },
    { id: 19, restaurantId: 4, name: "Lamb Karahi", price: 900 },
    { id: 20, restaurantId: 4, name: "Chicken Karahi", price: 700 },
    { id: 21, restaurantId: 4, name: "Afghani Pulao", price: 400 },

    // Multan Sohan Halwa House (Restaurant ID: 5) - Traditional sweets and desserts
    { id: 22, restaurantId: 5, name: "Sohan Halwa", price: 150 },
    { id: 23, restaurantId: 5, name: "Gulab Jamun", price: 100 },
    { id: 24, restaurantId: 5, name: "Ras Malai", price: 120 },
    { id: 25, restaurantId: 5, name: "Kheer", price: 80 },
    { id: 26, restaurantId: 5, name: "Jalebi", price: 90 },

    // Hyderabad Sindhi Cuisine (Restaurant ID: 6) - Authentic Sindhi dishes
    { id: 27, restaurantId: 6, name: "Sindhi Biryani", price: 400 },
    { id: 28, restaurantId: 6, name: "Sai Bhaji", price: 250 },
    { id: 29, restaurantId: 6, name: "Koki", price: 80 },
    { id: 30, restaurantId: 6, name: "Sindhi Curry", price: 300 },
    { id: 31, restaurantId: 6, name: "Dal Pakwan", price: 150 },

    // Faisalabad Desi Dhaba (Restaurant ID: 7) - Traditional Pakistani dhaba food
    { id: 32, restaurantId: 7, name: "Daal Makhani", price: 200 },
    { id: 33, restaurantId: 7, name: "Butter Chicken", price: 500 },
    { id: 34, restaurantId: 7, name: "Naan", price: 50 },
    { id: 35, restaurantId: 7, name: "Tandoori Roti", price: 30 },
    { id: 36, restaurantId: 7, name: "Mixed Vegetables", price: 180 },
    { id: 37, restaurantId: 7, name: "Lassi", price: 80 },

    // Quetta Balochi Restaurant (Restaurant ID: 8) - Traditional Balochi cuisine
    { id: 38, restaurantId: 8, name: "Balochi Sajji", price: 1000 },
    { id: 39, restaurantId: 8, name: "Lamb Roast", price: 800 },
    { id: 40, restaurantId: 8, name: "Chicken Sajji", price: 600 },
    { id: 41, restaurantId: 8, name: "Balochi Pulao", price: 350 },
    { id: 42, restaurantId: 8, name: "Dry Fruit Rice", price: 400 }
];

/**
 * Order Queue Data Structure
 * Implements a FIFO (First In, First Out) queue for pending orders
 * Matches the C++ order queue structure from the backend
 * 
 * Each order contains:
 * - id: Unique order identifier
 * - restaurantId & restaurantName: Restaurant information
 * - menuItemId & menuItemName: Menu item information
 * - price: Order total price
 * - userId: Customer identifier
 * - status: Current order status (pending, processing, delivered)
 * - orderTime: When the order was placed
 * - estimatedDelivery: Estimated delivery time range
 */
let orderQueue = [
    {
        id: 1,
        restaurantId: 1,
        restaurantName: "Karachi Biryani House",
        menuItemId: 1,
        menuItemName: "Chicken Biryani",
        price: 450,
        userId: "admin",
        status: "pending",
        orderTime: "2024-01-15 14:30:00",
        estimatedDelivery: "30-40 minutes"
    },
    {
        id: 2,
        restaurantId: 2,
        restaurantName: "Lahore BBQ Corner",
        menuItemId: 6,
        menuItemName: "Seekh Kebab",
        price: 300,
        userId: "user456",
        status: "pending",
        orderTime: "2024-01-15 14:45:00",
        estimatedDelivery: "25-35 minutes"
    },
    {
        id: 3,
        restaurantId: 4,
        restaurantName: "Peshawar Chapli Kebab",
        menuItemId: 17,
        menuItemName: "Chapli Kebab",
        price: 200,
        userId: "user789",
        status: "pending",
        orderTime: "2024-01-15 15:00:00",
        estimatedDelivery: "20-30 minutes"
    }
];

/**
 * Order History Data Structure
 * Stores completed orders for analytics and user order history
 * Matches the C++ order history structure from the backend
 * 
 * Used for:
 * - Displaying user's past orders
 * - Generating revenue reports
 * - Analytics and business intelligence
 * - Popular item tracking
 */
let orderHistory = [
    {
        id: 101,
        restaurantId: 1,
        restaurantName: "Karachi Biryani House",
        menuItemId: 2,
        menuItemName: "Mutton Biryani",
        price: 650,
        userId: "admin",
        status: "delivered",
        orderTime: "2024-01-14 19:30:00",
        deliveredTime: "2024-01-14 20:15:00"
    },
    {
        id: 102,
        restaurantId: 3,
        restaurantName: "Islamabad Grill & Fast Food",
        menuItemId: 11,
        menuItemName: "Chicken Burger",
        price: 250,
        userId: "user123",
        status: "delivered",
        orderTime: "2024-01-14 18:00:00",
        deliveredTime: "2024-01-14 18:35:00"
    },
    {
        id: 103,
        restaurantId: 2,
        restaurantName: "Lahore BBQ Corner",
        menuItemId: 7,
        menuItemName: "Chicken Tikka",
        price: 400,
        userId: "user456",
        status: "delivered",
        orderTime: "2024-01-14 20:15:00",
        deliveredTime: "2024-01-14 20:50:00"
    },
    {
        id: 104,
        restaurantId: 5,
        restaurantName: "Multan Sohan Halwa House",
        menuItemId: 22,
        menuItemName: "Sohan Halwa",
        price: 150,
        userId: "user789",
        status: "delivered",
        orderTime: "2024-01-13 16:30:00",
        deliveredTime: "2024-01-13 17:00:00"
    },
    {
        id: 105,
        restaurantId: 6,
        restaurantName: "Hyderabad Sindhi Cuisine",
        menuItemId: 27,
        menuItemName: "Sindhi Biryani",
        price: 400,
        userId: "admin",
        status: "delivered",
        orderTime: "2024-01-13 13:45:00",
        deliveredTime: "2024-01-13 14:30:00"
    },
    {
        id: 106,
        restaurantId: 7,
        restaurantName: "Faisalabad Desi Dhaba",
        menuItemId: 33,
        menuItemName: "Butter Chicken",
        price: 500,
        userId: "user123",
        status: "delivered",
        orderTime: "2024-01-12 21:00:00",
        deliveredTime: "2024-01-12 21:40:00"
    },
    {
        id: 107,
        restaurantId: 8,
        restaurantName: "Quetta Balochi Restaurant",
        menuItemId: 38,
        menuItemName: "Balochi Sajji",
        price: 1000,
        userId: "user456",
        status: "delivered",
        orderTime: "2024-01-12 19:30:00",
        deliveredTime: "2024-01-12 20:30:00"
    },
    {
        id: 108,
        restaurantId: 4,
        restaurantName: "Peshawar Chapli Kebab",
        menuItemId: 18,
        menuItemName: "Peshawari Karahi",
        price: 800,
        userId: "user789",
        status: "delivered",
        orderTime: "2024-01-11 18:15:00",
        deliveredTime: "2024-01-11 19:00:00"
    }
];

/**
 * =============================================================================
 * UTILITY FUNCTIONS
 * =============================================================================
 * 
 * The following functions provide core functionality for the food delivery system.
 * They match the C++ helper functions from the backend and implement common
 * operations like searching, sorting, and data manipulation.
 */

/**
 * Find Restaurant by ID
 * Searches the restaurants array for a restaurant with the specified ID
 * 
 * @param {number} id - The restaurant ID to search for
 * @returns {Object|undefined} Restaurant object if found, undefined otherwise
 * 
 * Time Complexity: O(n) where n is the number of restaurants
 * Space Complexity: O(1)
 */
function findRestaurantById(id) {
    return restaurants.find(restaurant => restaurant.id === id);
}

/**
 * Find Menu Item by ID
 * Searches the menuItems array for a menu item with the specified ID
 * 
 * @param {number} id - The menu item ID to search for
 * @returns {Object|undefined} Menu item object if found, undefined otherwise
 * 
 * Time Complexity: O(n) where n is the number of menu items
 * Space Complexity: O(1)
 */
function findMenuItemById(id) {
    return menuItems.find(item => item.id === id);
}

/**
 * Get Menu Items by Restaurant ID
 * Filters menu items to return only those belonging to a specific restaurant
 * 
 * @param {number} restaurantId - The restaurant ID to filter by
 * @returns {Array} Array of menu items for the specified restaurant
 * 
 * Time Complexity: O(n) where n is the number of menu items
 * Space Complexity: O(k) where k is the number of matching items
 */
function getMenuItemsByRestaurantId(restaurantId) {
    return menuItems.filter(item => item.restaurantId === restaurantId);
}

/**
 * Sort Restaurants by Rating
 * Returns a new array of restaurants sorted by rating in descending order
 * Uses the spread operator to avoid mutating the original array
 * 
 * @returns {Array} New array of restaurants sorted by rating (highest first)
 * 
 * Time Complexity: O(n log n) where n is the number of restaurants
 * Space Complexity: O(n) for the new array
 */
function sortRestaurantsByRating() {
    return [...restaurants].sort((a, b) => b.rating - a.rating);
}

/**
 * Get Order Statistics
 * Calculates and returns various statistics about the food delivery system
 * 
 * @returns {Object} Object containing system statistics
 * @returns {number} returns.totalRestaurants - Total number of restaurants
 * @returns {number} returns.totalMenuItems - Total number of menu items
 * @returns {number} returns.pendingOrders - Number of pending orders
 * @returns {number} returns.completedOrders - Number of completed orders
 * @returns {number} returns.totalRevenue - Total revenue from completed orders
 * 
 * Time Complexity: O(n) where n is the number of completed orders
 * Space Complexity: O(1)
 */
function getOrderStats() {
    return {
        totalRestaurants: restaurants.length,
        totalMenuItems: menuItems.length,
        pendingOrders: orderQueue.length,
        completedOrders: orderHistory.length,
        totalRevenue: orderHistory.reduce((sum, order) => sum + order.price, 0)
    };
}

/**
 * Add New Restaurant
 * Adds a new restaurant to the system with auto-generated ID
 * Matches the C++ addRestaurant function from the backend
 * 
 * @param {string} name - Name of the restaurant
 * @param {string} location - Location/address of the restaurant
 * @param {number|string} rating - Restaurant rating (will be converted to float)
 * @returns {Object} The newly created restaurant object
 * 
 * Time Complexity: O(n) for finding max ID + O(1) for insertion = O(n)
 * Space Complexity: O(1)
 */
function addRestaurant(name, location, rating) {
    const newId = Math.max(...restaurants.map(r => r.id)) + 1;
    const newRestaurant = {
        id: newId,
        name: name,
        location: location,
        rating: parseFloat(rating)
    };
    restaurants.push(newRestaurant);
    return newRestaurant;
}

/**
 * Add New Menu Item
 * Adds a new menu item to a restaurant with auto-generated ID
 * Matches the C++ addMenuItem function from the backend
 * 
 * @param {number|string} restaurantId - ID of the restaurant to add item to
 * @param {string} name - Name of the menu item
 * @param {number|string} price - Price of the menu item (will be converted to float)
 * @returns {Object} The newly created menu item object
 * 
 * Time Complexity: O(n) for finding max ID + O(1) for insertion = O(n)
 * Space Complexity: O(1)
 */
function addMenuItem(restaurantId, name, price) {
    const newId = Math.max(...menuItems.map(m => m.id)) + 1;
    const newMenuItem = {
        id: newId,
        restaurantId: parseInt(restaurantId),
        name: name,
        price: parseFloat(price)
    };
    menuItems.push(newMenuItem);
    return newMenuItem;
}

/**
 * Process Next Order
 * Processes the next order in the queue (FIFO - First In, First Out)
 * Moves the order from pending queue to order history
 * Matches the C++ processNextOrder function from the backend
 * 
 * @returns {Object|null} The processed order object, or null if queue is empty
 * 
 * Time Complexity: O(1) for queue operations
 * Space Complexity: O(1)
 */
function processNextOrder() {
    if (orderQueue.length > 0) {
        const processedOrder = orderQueue.shift(); // Remove from queue (FIFO)
        processedOrder.status = "delivered";
        processedOrder.deliveredTime = new Date().toLocaleString();
        orderHistory.push(processedOrder); // Add to history
        return processedOrder;
    }
    return null;
}

/**
 * Enqueue Order
 * Adds a new order to the pending orders queue
 * Validates restaurant and menu item existence before creating order
 * Matches the C++ enqueueOrder function from the backend
 * 
 * @param {number} restaurantId - ID of the restaurant
 * @param {number} menuItemId - ID of the menu item
 * @param {string} userId - ID of the user placing the order
 * @returns {Object|null} The newly created order object, or null if validation fails
 * 
 * Time Complexity: O(n) for finding restaurant/menu item + O(n) for max ID = O(n)
 * Space Complexity: O(1)
 */
function enqueueOrder(restaurantId, menuItemId, userId) {
    const restaurant = findRestaurantById(restaurantId);
    const menuItem = findMenuItemById(menuItemId);
    
    if (restaurant && menuItem) {
        const newId = Math.max(...orderQueue.map(o => o.id), ...orderHistory.map(o => o.id)) + 1;
        const newOrder = {
            id: newId,
            restaurantId: restaurantId,
            restaurantName: restaurant.name,
            menuItemId: menuItemId,
            menuItemName: menuItem.name,
            price: menuItem.price,
            userId: userId,
            status: "pending",
            orderTime: new Date().toLocaleString(),
            estimatedDelivery: calculateEstimatedDelivery()
        };
        orderQueue.push(newOrder);
        return newOrder;
    }
    return null;
}

/**
 * Calculate Estimated Delivery Time
 * Generates a random delivery time estimate based on base time + random factor
 * Matches the C++ logic from the backend
 * 
 * @returns {string} Estimated delivery time range (e.g., "25-35 minutes")
 * 
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
function calculateEstimatedDelivery() {
    const baseTime = 20; // Base delivery time in minutes
    const randomTime = Math.floor(Math.random() * 20) + 1; // Random 1-20 minutes
    const totalTime = baseTime + randomTime;
    return `${totalTime}-${totalTime + 10} minutes`;
}

/**
 * Search Restaurants
 * Searches restaurants by name or location using case-insensitive matching
 * Implements a simple linear search algorithm
 * 
 * @param {string} searchTerm - The term to search for
 * @returns {Array} Array of restaurants matching the search term
 * 
 * Time Complexity: O(n) where n is the number of restaurants
 * Space Complexity: O(k) where k is the number of matching restaurants
 */
function searchRestaurants(searchTerm) {
    const term = searchTerm.toLowerCase();
    return restaurants.filter(restaurant => 
        restaurant.name.toLowerCase().includes(term) ||
        restaurant.location.toLowerCase().includes(term)
    );
}

/**
 * Get Popular Menu Items
 * Analyzes order history to find the most frequently ordered menu items
 * Returns items sorted by order count in descending order
 * 
 * @param {number} limit - Maximum number of items to return (default: 5)
 * @returns {Array} Array of objects containing menu item and order count
 * 
 * Time Complexity: O(n log n) where n is the number of unique menu items
 * Space Complexity: O(n) for the counting object and result array
 */
function getPopularMenuItems(limit = 5) {
    const itemCounts = {};
    
    // Count orders for each menu item - O(n) where n is order history length
    orderHistory.forEach(order => {
        itemCounts[order.menuItemId] = (itemCounts[order.menuItemId] || 0) + 1;
    });
    
    // Sort by count and return top items - O(k log k) where k is unique items
    return Object.entries(itemCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, limit)
        .map(([menuItemId, count]) => ({
            menuItem: findMenuItemById(parseInt(menuItemId)),
            orderCount: count
        }))
        .filter(item => item.menuItem); // Filter out any null items
}

/* =============================================================================
   ID TRACKING VARIABLES
   ============================================================================= */

/**
 * Auto-incrementing ID counters for new entities
 * These ensure unique IDs when adding new restaurants, menu items, and orders
 */
let nextRestaurantId = 9; // Next available restaurant ID (we have 8 restaurants)
let nextMenuItemId = 43;  // Next available menu item ID (we have 42 menu items)
let nextOrderId = 4;      // Next available order ID (we have 3 pending orders)

/**
 * Data Persistence Functions using localStorage
 * These functions handle saving and loading data to/from browser localStorage
 * to maintain data consistency across different pages and sessions
 */

/**
 * Saves current restaurants data to localStorage
 * @function saveRestaurantsToStorage
 */
function saveRestaurantsToStorage() {
    try {
        localStorage.setItem('foodDelivery_restaurants', JSON.stringify(restaurants));
        localStorage.setItem('foodDelivery_nextRestaurantId', nextRestaurantId.toString());
        localStorage.setItem('foodDelivery_nextMenuItemId', nextMenuItemId.toString());
        localStorage.setItem('foodDelivery_nextOrderId', nextOrderId.toString());
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

/**
 * Loads restaurants data from localStorage
 * @function loadRestaurantsFromStorage
 */
function loadRestaurantsFromStorage() {
    try {
        const savedRestaurants = localStorage.getItem('foodDelivery_restaurants');
        const savedNextRestaurantId = localStorage.getItem('foodDelivery_nextRestaurantId');
        const savedNextMenuItemId = localStorage.getItem('foodDelivery_nextMenuItemId');
        const savedNextOrderId = localStorage.getItem('foodDelivery_nextOrderId');
        
        if (savedRestaurants) {
            restaurants = JSON.parse(savedRestaurants);
        }
        
        if (savedNextRestaurantId) {
            nextRestaurantId = parseInt(savedNextRestaurantId);
        }
        
        if (savedNextMenuItemId) {
            nextMenuItemId = parseInt(savedNextMenuItemId);
        }
        
        if (savedNextOrderId) {
            nextOrderId = parseInt(savedNextOrderId);
        }
    } catch (error) {
        console.error('Error loading from localStorage:', error);
    }
}

/**
 * Initializes data by loading from localStorage on page load
 * @function initializeData
 */
function initializeData() {
    loadRestaurantsFromStorage();
}

/**
 * =============================================================================
 * MODULE EXPORTS AND INITIALIZATION
 * =============================================================================
 */

/**
 * Export data and functions for use in other files (Node.js module system)
 * This allows the data.js file to be used both in browser and Node.js environments
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        // Data arrays
        restaurants,
        menuItems,
        orderQueue,
        orderHistory,
        
        // Utility functions
        findRestaurantById,
        findMenuItemById,
        getMenuItemsByRestaurantId,
        sortRestaurantsByRating,
        getOrderStats,
        addRestaurant,
        addMenuItem,
        processNextOrder,
        enqueueOrder,
        calculateEstimatedDelivery,
        searchRestaurants,
        getPopularMenuItems
    };
}