# Deployment Guide: Novantix Analytics Server

To track users on your public website (`https://novantix-innovation-technology.vercel.app`), your analytics server must also be on the public internet (not localhost).

## Recommended Option: Render.com (Free Tier)

Render is the easiest way to deploy this Node.js web service for free.

### Step 1: Prepare your Code
1.  **Push to GitHub**: ensure this `analytics-server` folder is in a GitHub repository.
    *   If your repo is just the root folder, that's fine.
    *   Important: The `package.json` must be in the root or you must specify the "Root Directory" in Render.

### Step 2: Create Web Service on Render
1.  Sign up at [render.com](https://render.com).
2.  Click **"New +"** -> **"Web Service"**.
3.  Connect your GitHub repository.
4.  Configure the service:
    *   **Name**: `novantix-analytics` (or similar)
    *   **Region**: Closest to your users (e.g., Singapore or Frankfurt).
    *   **Root Directory**: `analytics-server` (IMPORTANT: since your server is in a subfolder).
    *   **Runtime**: Node
    *   **Build Command**: `npm install`
    *   **Start Command**: `node server.js`
    *   **Plan**: Free
5.  **Environment Variables**:
    *   Add `DATABASE_URL` = `file:./prod.db` (for SQLite)
        *   *Note: On Render Free tier, SQLite data resets when the server restarts (every ~15 mins of inactivity). For permanent data, use a PostgreSQL database.*

### Step 3: Update Your Website
Once deployed, Render will give you a URL, e.g., `https://novantix-analytics.onrender.com`.

1.  Open your `index.html` and `login.html`.
2.  Update the analytics script source to your new **HTTPS** URL:
    ```html
    <!-- OLD -->
    <script src="http://localhost:3001/tracking.js" defer></script>

    <!-- NEW (Example) -->
    <script src="https://novantix-analytics.onrender.com/tracking.js" defer></script>
    ```
3.  Commit and push these HTML changes to your Vercel repo.

### Step 4: Verify
1.  Visit your live Vercel site.
2.  Your browser will load `tracking.js` from the Render URL.
3.  The script will automatically send data back to Render.
4.  Open `https://novantix-analytics.onrender.com/dashboard.html` to see your live stats.

---

## Alternative: Persistent Database (PostgreSQL)
If you want to keep data permanently (recommended):

1.  Create a **New PostgreSQL** database on Render (Free).
2.  Copy the `Internal Database URL`.
3.  In your Web Service **Environment Variables**, set `DATABASE_URL` to that postgres URL.
4.  You will need to update `prisma/schema.prisma` to use `postgresql` instead of `sqlite`:
    ```prisma
    datasource db {
      provider = "postgresql"
      url      = env("DATABASE_URL")
    }
    ```
5.  Commit that change and redeploy.

---

## Option 3: Deploying to Vercel (Advanced)

If you prefer to deploy this backend to Vercel:

## Option 3: Deploying to Vercel with MongoDB (Recommended)

Since you chose MongoDB, this is the **best** setup for Vercel.

1.  **Get a MongoDB Database (Step-by-Step)**:
    *   **Step A: Create Cluster**
        1.  Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and sign up/login.
        2.  Click **+ Create** (or "Build a Database").
        3.  Select **M0 Free** (Shared Cloud).
        4.  Choose a provider (AWS) and region (e.g., Singapore) closest to you.
        5.  Click **Create Deployment** (bottom).
    
    *   **Step B: Create User**
        1.  In the "Security Quickstart" (or under "Database Access" on the left):
        2.  Create a database user.
        3.  **Username**: `admin` (or your choice).
        4.  **Password**: `your-strong-password` (Copy this! You need it later).
        5.  Click **Create Database User**.

    *   **Step C: Network Access (Allow Vercel)**
        1.  In the "Network Access" section (or "Choose a connection method"):
        2.  Select **"Allow Access from Anywhere"** (or manually add IP `0.0.0.0/0`).
        3.  *Why?* Vercel servers have dynamic IPs, so we must allow all IPs. Note: Your strong password protects the DB.
        4.  Click **Add IP Address**.

    *   **Step D: Get Connection String**
        1.  Click **Choose a connection method** (or go to "Database" -> "Connect").
        2.  Select **Drivers** (Node.js, etc.).
        3.  Copy the connection string. It looks like:
            `mongodb+srv://admin:<db_password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority`
        4.  **Important**: Replace `<db_password>` with the password you created in Step B.

2.  **Configure Vercel**:
    *   Import project to Vercel.
    *   Framework Preset: **Other** (or just let it detect).
    *   **Environment Variables**:
        *   `DATABASE_URL`: Paste your MongoDB connection string.
    *   **Build & Output Settings**:
        *   Build Command: `npm install && npx prisma generate` (or just `npm install` if `postinstall` is set).
    *   Deploy.

3.  **Result**: Your analytics system will now run on Vercel and store data in MongoDB Atlas.
    *   Update your `index.html` script to point to the Vercel URL.

