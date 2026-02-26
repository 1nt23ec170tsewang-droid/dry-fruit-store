# Fix: App Not Opening in BrowserRouter

## Common Issues & Solutions

### Issue 1: Dependencies Not Installed

**Solution:**
```bash
cd client
npm install
```

### Issue 2: Dev Server Not Running

**Solution:**
```bash
cd client
npm run dev
```

Then open: `http://localhost:5173`

### Issue 3: Browser Console Errors

**Check:**
1. Open browser console (F12)
2. Look for red error messages
3. Common errors:
   - "Cannot find module" → Run `npm install`
   - "Router" errors → Check if react-router-dom is installed
   - "AuthContext" errors → Check if AuthContext is properly exported

### Issue 4: Port Already in Use

**Solution:**
- Close other apps using port 5173
- Or change port in `vite.config.js`

### Issue 5: Import Errors

**Check these files:**
- `client/src/App.jsx` - Should import BrowserRouter correctly
- `client/src/main.jsx` - Should render App correctly
- `client/src/context/AuthContext.jsx` - Should export AuthProvider
- `client/src/context/CartContext.jsx` - Should export CartProvider

## Quick Fix Steps

1. **Stop the dev server** (Ctrl+C)

2. **Reinstall dependencies:**
   ```bash
   cd client
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Start dev server:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   - Go to: `http://localhost:5173`
   - Check console for errors (F12)

## Verify Setup

**Check if these files exist:**
- ✅ `client/src/App.jsx`
- ✅ `client/src/main.jsx`
- ✅ `client/src/context/AuthContext.jsx`
- ✅ `client/src/context/CartContext.jsx`
- ✅ `client/src/pages/Auth.jsx`

**Check package.json has:**
- ✅ `react-router-dom: ^6.20.0`

## Still Not Working?

Share the error message from:
1. Browser console (F12 → Console tab)
2. Terminal where you ran `npm run dev`

