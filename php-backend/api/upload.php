<?php
require_once 'config.php';
require_once 'auth.php';

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(false, null, 'Method not allowed. Use POST.', 405);
}

// 1. Sanitize & Validate Inputs
$project_id = filter_input(INPUT_POST, 'project_id', FILTER_VALIDATE_INT);
$client_id = filter_input(INPUT_POST, 'client_id', FILTER_VALIDATE_INT);

if (!$project_id || !$client_id) {
    jsonResponse(false, null, 'Missing or invalid project_id or client_id.', 400);
}

// 2. Enforce Access Controls
// A client can only upload files to their assigned project. Admins can upload to any project.
if ($user_role === 'client' && $user_id != $client_id) {
    jsonResponse(false, null, 'Forbidden: You can only upload files to your own project.', 403);
}

// 3. File Validation
if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    jsonResponse(false, null, 'File upload error or no file provided.', 400);
}

$file = $_FILES['file'];

// Validate File Size
if ($file['size'] > MAX_FILE_SIZE) {
    jsonResponse(false, null, 'File exceeds maximum allowed size of 50MB.', 400);
}

// Validate File Type (Extension Allowlist)
$ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
$allowed_exts = ['jpg', 'jpeg', 'png', 'pdf', 'zip', 'doc', 'docx', 'mp4', 'mov', 'txt', 'csv', 'md', 'js', 'html', 'css', 'ts', 'json'];

if (!in_array($ext, $allowed_exts)) {
    jsonResponse(false, null, 'Invalid file type. Not allowed.', 400);
}

// Prevent execution of scripts
if (in_array($ext, ['php', 'php3', 'php4', 'php5', 'phtml', 'exe', 'sh', 'bat'])) {
    jsonResponse(false, null, 'Executable files are strictly forbidden.', 403);
}

// 4. Create Directory if it doesn't exist
$project_dir = UPLOAD_DIR . $project_id . '/';
if (!is_dir($project_dir)) {
    mkdir($project_dir, 0755, true);
}

// 5. Generate Safe Filename
// Prepending uniqid and timestamp avoids collisions and makes guessing file URLs difficult
$safe_filename = uniqid() . '_' . time() . '.' . $ext;
$destination = $project_dir . $safe_filename;

// 6. Save File & DB Record
if (move_uploaded_file($file['tmp_name'], $destination)) {
    try {
        $stmt = $pdo->prepare("INSERT INTO files (project_id, client_id, uploader_type, uploader_id, uploader_name, file_name, file_path, file_size, file_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        
        // Relative path to be stored in the database
        $relative_path = $project_id . '/' . $safe_filename;
        
        $stmt->execute([
            $project_id,
            $client_id,
            $user_role,
            $user_id,
            $user_name,
            basename($file['name']), // Keep original filename for display purposes
            $relative_path,
            $file['size'],
            $file['type']
        ]);

        $file_id = $pdo->lastInsertId();

        jsonResponse(true, [
            'id' => $file_id,
            'file_name' => basename($file['name']),
            'file_size' => $file['size'],
            'uploaded_at' => date('Y-m-d H:i:s'),
            'direction' => $user_role === 'admin' ? 'Sent to Client' : 'Received from Client'
        ]);
        
    } catch (PDOException $e) {
        // Rollback: delete physical file if DB insert fails
        @unlink($destination);
        jsonResponse(false, null, 'Database error during file insertion.', 500);
    }
} else {
    jsonResponse(false, null, 'Failed to save file to disk. Check permissions.', 500);
}
?>
