# 🚀 Deployment Guide: Render & GitHub

This guide covers how to fix the "Not Found" error and properly deploy your MERN stack application.

## 1. Fix "Not Found" Error (Backend)

**Issue**: The root URL (`/`) was returning 404 because the route was commented out.
**Fix**: I have uncommented the root route in `server.js`. Now, when you visit your Render URL (e.g., `https://agroconnect-api.onrender.com/`), you will see:
> "AgroConnect Backend is Running Successfully!"

## 2. Push Changes to GitHub

Run these commands in your project root terminal (where `pom.xml` or `.git` is) to save your changes and trigger a new deployment:

```bash
# 1. Check status of changed files
git status

# 2. Add all changes
git add .

# 3. Commit with a message
git commit -m "Fix: Enable root route for Render health check"

# 4. Push to GitHub
git push origin main
```

*Note: Render is usually connected to your GitHub repo. Pushing to `main` will automatically trigger a new build.*

## 3. Render Dashboard Configuration

Make sure your settings in [dashboard.render.com](https://dashboard.render.com) are correct:

### Backend Service (Web Service)
*   **Build Command**: `npm install`
*   **Start Command**: `node server.js`
*   **Root Directory**: `backend` (Important! if your `package.json` is inside the `backend` folder)
*   **Environment Variables**:
    *   `MONGO_URL`: (Your MongoDB Atlas connection string)
    *   `JWT_SECRET`: (Your secret key)

### Frontend Service (Static Site)
*   **Build Command**: `npm install && npm run build`
*   **Publish Directory**: `dist`
*   **Root Directory**: `frontend`
*   **Environment Variables**:
    *   `VITE_API_URL`: **YOUR_BACKEND_RENDER_URL** (e.g., `https://agroconnect-api.onrender.com/api`)

## 4. IMPORTANT: Update Frontend API URL

Currently, your frontend points to `localhost`. You need to ensure `d:\MERN_PROJECTS\AgroConnect\frontend\src\services\api.js` uses `import.meta.env.VITE_API_URL` instead of hardcoded localhost.

**Action Required**:
Check `d:\MERN_PROJECTS\AgroConnect\frontend\src\services\api.js`. If lines look like:
`const API = "http://localhost:3000/api";` 
Change it to:
`const API = import.meta.env.VITE_API_URL || "http://localhost:3000/api";`
