Beginner Project :>

# Secure File Uploader

A simple web-based file uploader that allows you to securely save small files to your Google Drive without needing to sign in with your actual google account on stranger's pc / public computers. The app is designed with a **server-side secret key** to protect your uploads.

## Features
- Multiple file upload support
- Key-protected endpoint (stored securely in Google Apps Script Properties)
- File size limit (default 35 MB)
- Saves files directly to a private Google Drive folder
- Simple and responsive user interface

## How it works
1. User selects files to upload.
2. User enters a secret key in the input field.
3. Files are converted to Base64 and sent via `fetch` to a Google Apps Script endpoint.
4. The server validates the key, size, and file name before saving to Drive.

## Security Notes
- **Key never exposed** in client-side code.
- Files are only saved to a **private Drive folder** accessible by the owner.
- Brute-force attacks are practically impossible due to a long, random key and Google Apps Script quotas.

## Usage
1. Open the HTML page in your browser.
2. Select files and enter your secret key.
3. Click **Save** to upload files to your Drive.
