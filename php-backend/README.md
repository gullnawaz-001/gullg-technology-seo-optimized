# Client Portal File Exchange API

This is a lightweight PHP + MySQL REST API designed to be hosted on shared hosting platforms (like Hostinger) to manage file uploads and downloads between Clients and Admins. 

## Folder Structure

```
/php-backend
├── database.sql         # SQL script to create the required tables
├── README.md            # This documentation file
├── api/
│   ├── config.php       # Database credentials and global settings
│   ├── auth.php         # Session management and role validation
│   ├── upload.php       # POST endpoint to upload a file
│   ├── files.php        # GET endpoint to list files
│   └── download.php     # GET endpoint to securely download a file
└── uploads/
    └── .htaccess        # Apache rule to block direct access to uploaded files
```

## 1. Database Setup

1. Log into your Hostinger hPanel and go to **Databases > MySQL Databases**.
2. Create a new database and user. Note down the Database Name, Username, and Password.
3. Open **phpMyAdmin**.
4. Import the provided `database.sql` file into your newly created database, or simply copy-paste its contents into the SQL tab and run it.

## 2. Configuration (`api/config.php`)

Open `api/config.php` and update the database credentials to match the ones you created in Hostinger:

```php
define('DB_HOST', 'localhost'); // usually 'localhost' on Hostinger
define('DB_USER', 'u123456789_user'); // Replace with your DB Username
define('DB_PASS', 'your_password'); // Replace with your DB Password
define('DB_NAME', 'u123456789_db'); // Replace with your DB Name
```

*(Optional)* Update the `Access-Control-Allow-Origin` header in `config.php` from `*` to your actual frontend domain for better security.

## 3. Deployment to Hostinger

1. Open the **File Manager** in your Hostinger hPanel.
2. Navigate to your website's `public_html` directory.
3. Upload the `api` folder and the `uploads` folder directly into `public_html`.
   * **Note:** Ensure the `.htaccess` file inside the `uploads` folder is uploaded successfully (some file managers hide hidden files by default). This is crucial to prevent people from accessing files directly via URL.
4. Ensure the `uploads` folder has write permissions (CHMOD `755` or `775`).

## 4. Testing the API

Before connecting your frontend UI, you can test the API using a tool like [Postman](https://www.postman.com/) or `curl`.

*Note: The `auth.php` file currently contains a mocking block for testing. You can append `?mock_role=client` to your requests to simulate being a client, or omit it to simulate being an admin.*

### A. List Files (GET)
**Endpoint:** `https://yourdomain.com/api/files.php?project_id=1`
**Expected Response:**
```json
{
  "success": true,
  "data": [],
  "error": null
}
```

### B. Upload File (POST)
**Endpoint:** `https://yourdomain.com/api/upload.php`
**Body (form-data):**
* `project_id`: `1`
* `client_id`: `2`
* `file`: (Select a file to upload)

### C. Download File (GET)
**Endpoint:** `https://yourdomain.com/api/download.php?file_id=1`
*(This will trigger a file download if successful)*

## 5. Connecting Your Frontend

Once the API is live, update your React frontend API calls to point to these endpoints. 

For example, your `handleFileUpload` function will look like this:

```javascript
const formData = new FormData();
formData.append('file', selectedFile);
formData.append('project_id', activeProject.id);
formData.append('client_id', activeProject.clientId);

fetch('https://yourdomain.com/api/upload.php', {
  method: 'POST',
  body: formData
})
.then(res => res.json())
.then(data => {
  if (data.success) {
    alert("File uploaded successfully!");
  }
});
```

**IMPORTANT DEPLOYMENT NOTE:** 
When you are ready to use real authentication, open `api/auth.php` and remove the `/* --- DEVELOPMENT TESTING MOCK --- */` block so the API correctly relies on your actual PHP session login system.
