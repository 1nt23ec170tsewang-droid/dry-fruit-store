# Troubleshooting Guide

## App Not Opening - Common Issues & Solutions

### Issue 1: Dependencies Not Installed ✅ FIXED
**Solution:** Dependencies are now installed. You can proceed.

### Issue 2: Dev Server Not Running

**To start the frontend:**
```bash
cd client
npm run dev
```

**To start the backend (in a separate terminal):**
```bash
cd server
npm run dev
```

**Expected output:**
- Frontend: `Local: http://localhost:5173/`
- Backend: `Server running on http://localhost:5000`

### Issue 3: Port Already in Use

If port 5173 or 5000 is already in use:

**For frontend (change port in vite.config.js):**
```js
server: {
  port: 5174, // Change to different port
}
```

**For backend (change in server/.env):**
```env
PORT=5001
```

### Issue 4: Browser Shows Blank Page

1. **Check browser console** (F12) for errors
2. **Check terminal** for compilation errors
3. **Clear browser cache** and hard refresh (Ctrl+Shift+R)

### Issue 5: "Cannot find module" Errors

**Solution:** Reinstall dependencies
```bash
cd client
rm -rf node_modules package-lock.json
npm install

cd ../server
rm -rf node_modules package-lock.json
npm install
```

### Issue 6: Tailwind CSS Not Working

**Check:**
- `postcss.config.js` exists
- `tailwind.config.js` exists
- `index.css` has `@tailwind` directives

### Issue 7: Environment Variables Missing

**.env files are optional for basic testing**, but needed for:
- Razorpay payment (backend + frontend)
- API connection (frontend)

**Create `server/.env`:**
```env
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
PORT=5000
CORS_ORIGIN=http://localhost:5173
```

**Create `client/.env`:**
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxx
```

### Issue 8: Razorpay Script Not Loading

**Error:** "Razorpay is not defined"

**Solution:**
- Make sure `VITE_RAZORPAY_KEY_ID` is set in `client/.env`
- Check browser console for script loading errors
- Verify Razorpay checkout script URL is accessible

### Issue 9: Backend API Not Responding

**Check:**
1. Backend server is running (`npm run dev` in server folder)
2. Backend URL in frontend `.env` matches backend port
3. CORS is configured correctly in `server.js`

### Issue 10: Map Not Showing

**Leaflet map requires:**
- Internet connection (loads tiles from OpenStreetMap)
- Leaflet CSS loaded (check `index.html`)
- No ad blockers blocking map tiles

## Quick Diagnostic Commands

**Check if ports are in use:**
```bash
# Windows PowerShell
netstat -ano | findstr :5173
netstat -ano | findstr :5000
```

**Check Node version:**
```bash
node --version  # Should be v18 or higher
```

**Check npm version:**
```bash
npm --version
```

## Still Not Working?

1. **Check terminal output** for specific error messages
2. **Check browser console** (F12 → Console tab)
3. **Verify all files exist:**
   - `client/src/App.jsx`
   - `client/src/main.jsx`
   - `client/index.html`
   - All component files

4. **Try a clean start:**
   ```bash
   # Stop all running servers (Ctrl+C)
   # Delete node_modules and reinstall
   cd client
   rm -rf node_modules
   npm install
   
   cd ../server
   rm -rf node_modules
   npm install
   
   # Start fresh
   cd ../client
   npm run dev
   ```

## Getting Help

If you're still stuck, share:
1. Error message from terminal
2. Error message from browser console (F12)
3. What happens when you try to open the app
4. Which step you're on (starting server, opening browser, etc.)

