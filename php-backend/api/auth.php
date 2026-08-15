<?php
session_start();

// In a real application, you would handle standard login authentication and set these session variables.
// For the purpose of testing the API independently, we are mocking an active session below.
// IMPORTANT: Remove or comment out the testing block before deploying to Hostinger!

/* --- DEVELOPMENT TESTING MOCK --- */
if (!isset($_SESSION['user_id'])) {
    if (isset($_GET['mock_role']) && $_GET['mock_role'] === 'client') {
        $_SESSION['user_id'] = 2;
        $_SESSION['role'] = 'client';
        $_SESSION['name'] = 'Demo Client';
    } else {
        $_SESSION['user_id'] = 1;
        $_SESSION['role'] = 'admin';
        $_SESSION['name'] = 'Admin User';
    }
}
/* -------------------------------- */

// === AUTHENTICATION CHECK ===
if (!isset($_SESSION['user_id'])) {
    jsonResponse(false, null, 'Unauthorized. Please log in.', 401);
}

// Global user variables available to endpoints that include auth.php
$user_id = $_SESSION['user_id'];
$user_role = $_SESSION['role']; // 'admin' or 'client'
$user_name = $_SESSION['name'];
?>
