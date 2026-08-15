<?php
require_once 'config.php';
require_once 'auth.php';

// Only accept GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonResponse(false, null, 'Method not allowed. Use GET.', 405);
}

// 1. Sanitize & Validate Inputs
$file_id = filter_input(INPUT_GET, 'file_id', FILTER_VALIDATE_INT);

if (!$file_id) {
    jsonResponse(false, null, 'Missing or invalid file_id.', 400);
}

// 2. Lookup Database Record
try {
    $stmt = $pdo->prepare("SELECT * FROM files WHERE id = ?");
    $stmt->execute([$file_id]);
    $fileRecord = $stmt->fetch();

    if (!$fileRecord) {
        jsonResponse(false, null, 'File not found in database.', 404);
    }

    // 3. Access Controls
    // Client can only download files tied to their client_id
    if ($user_role === 'client' && $fileRecord['client_id'] != $user_id) {
        jsonResponse(false, null, 'Forbidden. You do not have access to this file.', 403);
    }

    // 4. Validate Physical File
    $file_path = UPLOAD_DIR . $fileRecord['file_path'];

    if (!file_exists($file_path)) {
        jsonResponse(false, null, 'Physical file missing on server.', 404);
    }

    // 5. Stream File to Browser securely
    // Clean output buffer to prevent corrupted file downloads
    if (ob_get_level()) {
        ob_end_clean();
    }

    header('Content-Description: File Transfer');
    header('Content-Type: ' . ($fileRecord['file_type'] ?: 'application/octet-stream'));
    // Use quotes around filename to handle spaces properly
    header('Content-Disposition: attachment; filename="' . basename($fileRecord['file_name']) . '"');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($file_path));

    // Read and output the file contents
    readfile($file_path);
    exit;

} catch (PDOException $e) {
    jsonResponse(false, null, 'Database query failed.', 500);
}
?>
