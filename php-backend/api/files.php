<?php
require_once 'config.php';
require_once 'auth.php';

// Only accept GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonResponse(false, null, 'Method not allowed. Use GET.', 405);
}

// 1. Sanitize & Validate Inputs
$project_id = filter_input(INPUT_GET, 'project_id', FILTER_VALIDATE_INT);
$client_id_filter = filter_input(INPUT_GET, 'client_id', FILTER_VALIDATE_INT);

if (!$project_id) {
    jsonResponse(false, null, 'Missing or invalid project_id.', 400);
}

// 2. Query Setup & Access Controls
try {
    if ($user_role === 'client') {
        // Enforce: Client can only view files belonging to their user_id within the project
        $stmt = $pdo->prepare("SELECT * FROM files WHERE project_id = ? AND client_id = ? ORDER BY uploaded_at DESC");
        $stmt->execute([$project_id, $user_id]);
    } else {
        // Admin can view files for the project. Apply optional client_id filter if provided.
        if ($client_id_filter) {
            $stmt = $pdo->prepare("SELECT * FROM files WHERE project_id = ? AND client_id = ? ORDER BY uploaded_at DESC");
            $stmt->execute([$project_id, $client_id_filter]);
        } else {
            $stmt = $pdo->prepare("SELECT * FROM files WHERE project_id = ? ORDER BY uploaded_at DESC");
            $stmt->execute([$project_id]);
        }
    }

    $files = $stmt->fetchAll();

    // 3. Format Response
    $formatted_files = array_map(function($f) {
        return [
            'id' => $f['id'],
            'project_id' => $f['project_id'],
            'client_id' => $f['client_id'],
            'uploader_name' => $f['uploader_name'],
            'file_name' => $f['file_name'],
            'file_size' => $f['file_size'],
            'file_type' => $f['file_type'],
            'uploaded_at' => $f['uploaded_at'],
            'status' => $f['status'],
            // Dynamic UI Label based on uploader type
            'direction' => $f['uploader_type'] === 'admin' ? 'Sent to Client' : 'Received from Client'
        ];
    }, $files);

    jsonResponse(true, $formatted_files);

} catch (PDOException $e) {
    jsonResponse(false, null, 'Database query failed.', 500);
}
?>
