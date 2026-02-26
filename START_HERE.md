# 🚀 START HERE - How to Open the App

## Quick Start (3 Steps)

### Step 1: Open Two Terminal Windows

You need **TWO separate terminal windows** - one for frontend, one for backend.

### Step 2: Start Backend Server

**In Terminal 1:**
```bash
cd server
npm run dev
```

**Wait for:** `Server running on https://dry-fruit-store.onrender.com

### Step 3: Start Frontend Server

**In Terminal 2:**
```bash
cd client
npm run dev
```

**Wait for:** `Local: http://localhost:5173/`

### Step 4: Open in Browser

Open your browser and go to:
**http://localhost:5173**

---

## Alternative: Use Batch Files (Windows)

Double-click these files:
- `start-backend.bat` - Starts backend server
- `start-frontend.bat` - Starts frontend server

Then open: **http://localhost:5173**

---

## What Should Happen?

1. ✅ Backend terminal shows: "Server running on https://dry-fruit-store.onrender.com"
2. ✅ Frontend terminal shows: "Local: http://localhost:5173/"
3. ✅ Browser opens and shows the Ladakh Dry Fruits Store homepage

---

## If It's Still Not Opening

### Check These:

1. **Are both servers running?**
   - Backend: Terminal 1 should show server running
   - Frontend: Terminal 2 should show Vite dev server

2. **Check for errors in terminal:**
   - Red error messages?
   - "Cannot find module" errors?
   - Port already in use?

3. **Try opening manually:**
   - Type `http://localhost:5173` in your browser address bar
   - Don't wait for auto-open, manually navigate

4. **Check browser console:**
   - Press F12
   - Look at Console tab for errors

### Common Issues:

**"Port 5173 already in use"**
- Close other applications using that port
- Or change port in `client/vite.config.js`

**"Cannot find module"**
- Run: `cd client && npm install`
- Run: `cd server && npm install`

**Blank page in browser**
- Check browser console (F12)
- Hard refresh: Ctrl+Shift+R
- Clear browser cache

---

## Need More Help?

See `TROUBLESHOOTING.md` for detailed solutions.



