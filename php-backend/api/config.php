<?php
// === CORS HEADERS ===
// Update this domain to your React frontend's domain in production to prevent unauthorized API usage
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// === DATABASE CONFIGURATION ===
// Replace these with your Hostinger database credentials
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_USER', getenv('DB_USER') ?: 'u123456789_user');
define('DB_PASS', getenv('DB_PASS') ?: 'your_password');
define('DB_NAME', getenv('DB_NAME') ?: 'u123456789_db');

// === FILE UPLOAD CONFIGURATION ===
// The path to the secure uploads directory
define('UPLOAD_DIR', __DIR__ . '/../uploads/');
// Maximum file size in bytes (Default: 50MB)
define('MAX_FILE_SIZE', 50 * 1024 * 1024); 

// === DATABASE CONNECTION ===
try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4", DB_USER, DB_PASS);
    // Throw exceptions on errors and fetch associative arrays by default
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    die(json_encode(['success' => false, 'error' => 'Database connection failed.']));
}

// === HELPER FUNCTION ===
// Ensures consistent JSON responses across all endpoints
function jsonResponse($success, $data = null, $error = null, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json');
    echo json_encode([
        'success' => $success,
        'data' => $data,
        'error' => $error
    ]);
    exit;
}
?>
