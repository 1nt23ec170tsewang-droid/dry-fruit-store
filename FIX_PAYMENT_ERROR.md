# Fix: "Failed to create payment order" Error

## Quick Fix Steps

### Step 1: Make Sure Backend Server is Running ✅

**Open a terminal and run:**
```bash
cd server
npm run dev
```

**You should see:**
```
🚀 Server running on http://localhost:5000
📦 API endpoints available at http://localhost:5000/api
```

**If you see errors:**
- Check if port 5000 is already in use
- Make sure you're in the `server` directory
- Check for any error messages

### Step 2: Check Backend Configuration

**Create `server/.env` file if it doesn't exist:**
```env
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxx
PORT=5000
CORS_ORIGIN=http://localhost:5173
```

**Get Razorpay Test Keys:**
1. Go to https://dashboard.razorpay.com
2. Sign up or log in
3. Go to Settings → API Keys
4. Generate test keys
5. Copy Key ID and Key Secret to `server/.env`

### Step 3: Verify Backend is Working

**Test the backend API:**
1. Open browser
2. Go to: http://localhost:5000/api/health
3. You should see: `{"status":"ok","message":"Ladakh Dry Fruits Store API is running"}`

**If you get "Cannot connect":**
- Backend is not running → Go to Step 1
- Check firewall settings
- Try a different port

### Step 4: Check Frontend Configuration

**Create `client/.env` file if it doesn't exist:**
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
```

**Important:** 
- Use the same Razorpay Key ID from backend
- Restart frontend dev server after creating `.env` file

### Step 5: Restart Both Servers

**Stop both servers (Ctrl+C) and restart:**

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

### Step 6: Test Payment Again

1. Go to http://localhost:5173
2. Add products to cart
3. Go to checkout
4. Fill in details
5. Click "Pay Now"

---

## Common Error Messages & Solutions

### "Cannot connect to server"
**Solution:** Backend is not running. Start it with `cd server && npm run dev`

### "Server error" or "Payment error"
**Solution:** 
- Check `server/.env` has Razorpay keys
- Verify keys are valid (test keys start with `rzp_test_`)
- Check backend terminal for error messages

### "Razorpay Key ID is not configured"
**Solution:** 
- Create `client/.env` file
- Add `VITE_RAZORPAY_KEY_ID=rzp_test_xxxxx`
- Restart frontend server

### "Network Error" or "ECONNREFUSED"
**Solution:**
- Backend server is not running
- Backend URL is incorrect
- Check `VITE_API_BASE_URL` in `client/.env`

---

## Verify Everything is Set Up

### Checklist:

- [ ] Backend server is running (Terminal 1 shows "Server running")
- [ ] Frontend server is running (Terminal 2 shows Vite dev server)
- [ ] `server/.env` exists with Razorpay keys
- [ ] `client/.env` exists with API URL and Razorpay Key ID
- [ ] http://localhost:5000/api/health works in browser
- [ ] http://localhost:5173 opens the app

---

## Still Not Working?

1. **Check browser console (F12):**
   - Look for red error messages
   - Check Network tab for failed requests

2. **Check backend terminal:**
   - Look for error messages when you try to pay
   - Check if Razorpay keys are loaded

3. **Test backend directly:**
   ```bash
   curl http://localhost:5000/api/health
   ```
   Or open in browser: http://localhost:5000/api/health

4. **Verify Razorpay keys:**
   - Make sure they're test keys (start with `rzp_test_`)
   - Keys should be in both `server/.env` and `client/.env`

---

## Need Razorpay Test Keys?

1. Go to https://razorpay.com
2. Sign up for free account
3. Go to Dashboard → Settings → API Keys
4. Click "Generate Test Keys"
5. Copy Key ID and Key Secret

**Note:** Test keys work only in test mode. For production, you'll need live keys.

