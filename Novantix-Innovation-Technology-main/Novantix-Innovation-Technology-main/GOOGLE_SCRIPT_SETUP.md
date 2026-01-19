# Google Apps Script Setup Instructions

## Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Sign in with: **hellonsp1919@gmail.com**
3. Click **"+ Blank"** to create a new spreadsheet
4. Rename it to: **"Novantix Student Enrollments"**
5. Keep this tab open

## Step 2: Open Apps Script Editor

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. A new tab will open with the Apps Script editor
3. You'll see a default `Code.gs` file

## Step 3: Add the Script Code

1. Delete any default code in `Code.gs`
2. Copy ALL the code from `google-apps-script.gs` (in this folder)
3. Paste it into the Apps Script editor
4. Click **Save** (disk icon) or press `Ctrl+S`
5. Name the project: **"Novantix Enrollment Handler"**

## Step 4: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **"Web app"**
4. Configure settings:
   - **Description**: "Enrollment Form Handler"
   - **Execute as**: Me (hellonsp1919@gmail.com)
   - **Who has access**: **Anyone**
5. Click **Deploy**
6. You may need to authorize:
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** → **Go to Novantix Enrollment Handler (unsafe)**
   - Click **Allow**
7. **IMPORTANT**: Copy the **Web app URL** 
   - It looks like: `https://script.google.com/macros/s/XXXXX/exec`
   - **Save this URL** - you'll need it for the frontend!

## Step 5: Test the Script (Optional)

1. In Apps Script editor, select `testEnrollment` function from dropdown
2. Click **Run** (▶️ play button)
3. Check your Google Sheet - should see a test entry
4. Check email at hellonsp1919@gmail.com - should receive test email

## Step 6: Update Frontend

Once you have the Web app URL:
1. Open `script.js` in the landing-page folder
2. Find the line: `const ENROLLMENT_API_URL = "YOUR_GOOGLE_SCRIPT_URL_HERE";`
3. Replace with your actual URL
4. Save the file

## Configuration

The script is configured to:
- **Admin Email**: hellonsp1919@gmail.com
- **Sheet Name**: "Enrollments" (auto-created)
- **Columns**: Timestamp, Name, Email, Mobile, Course, Status

## Sheet Structure

Your Google Sheet will automatically have these columns:

| Timestamp | Name | Email | Mobile | Course | Status |
|-----------|------|-------|--------|--------|--------|

## Troubleshooting

### If you don't receive emails:
1. Check your Gmail spam folder
2. Make sure MailApp has permissions in the authorization

### If sheet doesn't update:
1. Make sure the script is deployed correctly
2. Check execution logs: Apps Script → **Executions** (left menu)

### If you get CORS errors:
1. Make sure deployment is set to "Anyone" access
2. Re-deploy if needed

## Security Note

The web app URL is public but:
- Only submits data (no reading)
- Basic validation is in place
- You can add rate limiting if needed

---

✅ **After setup, test the enrollment form on your landing page!**
