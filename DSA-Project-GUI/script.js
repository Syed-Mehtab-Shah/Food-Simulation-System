/**
 * =============================================================================
 * FOODPANDA PAKISTAN - MAIN LANDING PAGE JAVASCRIPT
 * =============================================================================
 * 
 * This JavaScript file handles the main landing page functionality including
 * role selection, user authentication, form interactions, and navigation.
 * It provides the entry point for both users and administrators.
 * 
 * Features:
 * - Role-based authentication system
 * - Dynamic form switching between user and admin login
 * - Toast notifications for user feedback
 * - Interactive form effects and animations
 * - Hardcoded admin credentials matching C++ backend
 * 
 * @author Food Delivery System Team
 * @version 1.0
 */

/* =============================================================================
   NAVIGATION AND FORM SWITCHING
   ============================================================================= */

/**
 * Shows the admin login form
 * Hides role selection and displays admin authentication form
 * 
 * @function showAdminLogin
 * @description Switches from role selection to admin login interface
 */
function showAdminLogin() {
    document.getElementById('roleSelection').style.display = 'none';
    document.getElementById('adminLoginForm').style.display = 'block';
}

/**
 * Shows the role selection interface
 * Hides admin login form and returns to main role selection
 * 
 * @function showRoleSelection
 * @description Returns to the main role selection interface from admin login
 */
function showRoleSelection() {
    document.getElementById('adminLoginForm').style.display = 'none';
    document.getElementById('roleSelection').style.display = 'block';
}

/* =============================================================================
   USER AUTHENTICATION
   ============================================================================= */

/**
 * Handles user login (direct access)
 * Users don't need credentials and are redirected directly to user dashboard
 * 
 * @function userLogin
 * @description Provides immediate access to user dashboard with success feedback
 */
function userLogin() {
    showToast('Welcome User! Redirecting to dashboard...', 'success');
    setTimeout(() => {
        window.location.href = 'user-dashboard.html';
    }, 1500);
}

/* =============================================================================
   ADMIN AUTHENTICATION
   ============================================================================= */

/**
 * Admin form submission handler
 * Validates admin credentials and handles authentication
 * Uses hardcoded credentials matching the C++ backend system
 */
document.getElementById('adminForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form input values
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    
    /**
     * Hardcoded admin credentials (matching C++ backend)
     * Username: admin
     * Password: 1234
     * 
     * Note: In production, this should be replaced with secure authentication
     */
    if (username === 'admin' && password === '1234') {
        showToast('Admin login successful! Redirecting...', 'success');
        setTimeout(() => {
            window.location.href = 'admin-dashboard.html';
        }, 1500);
    } else {
        showToast('Invalid credentials! Please try again.', 'error');
    }
});

/* =============================================================================
   NOTIFICATION SYSTEM
   ============================================================================= */

/**
 * Displays toast notifications for user feedback
 * Creates dynamic toast messages with different styles based on message type
 * 
 * @function showToast
 * @param {string} message - The message to display in the toast
 * @param {string} type - The type of toast ('success' or 'error')
 * @description Shows Bootstrap toast notifications with appropriate styling
 */
function showToast(message, type = 'success') {
    const toast = document.getElementById('loginToast');
    const toastMessage = document.getElementById('toastMessage');
    const toastHeader = toast.querySelector('.toast-header');
    
    // Set the toast message content
    toastMessage.textContent = message;
    
    /**
     * Update toast styling and icon based on message type
     * Error toasts show red exclamation icon
     * Success toasts show green check icon
     */
    if (type === 'error') {
        toastHeader.innerHTML = `
            <i class="fas fa-exclamation-circle text-danger me-2"></i>
            <strong class="me-auto">Error</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
        `;
    } else {
        toastHeader.innerHTML = `
            <i class="fas fa-check-circle text-success me-2"></i>
            <strong class="me-auto">Success</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
        `;
    }
    
    // Initialize and show Bootstrap toast
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
}

/* =============================================================================
   INTERACTIVE EFFECTS AND DOM MANIPULATION
   ============================================================================= */

/**
 * DOM Content Loaded Event Handler
 * Initializes interactive effects and form enhancements when page loads
 */
document.addEventListener('DOMContentLoaded', function() {
    /**
     * Add hover effects to form inputs
     * Creates subtle lift animation when inputs are focused/blurred
     * Enhances user experience with visual feedback
     */
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach(input => {
        /**
         * Focus event handler
         * Lifts the input's parent element when focused
         */
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });
        
        /**
         * Blur event handler
         * Returns the input's parent element to original position when unfocused
         */
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
});