# 🚀 Start Backend Server - Quick Guide

## The Problem
Your backend server is not running, which is why you're seeing:
- "Backend server is not running" error
- "Failed to fetch orders" error on admin page

## Solution: Start the Backend Server

### Option 1: Use the Batch File (Easiest)
Double-click: **`start-backend.bat`**

### Option 2: Manual Start (Terminal)

**Open a NEW terminal window and run:**
```bash
cd server
npm run dev
```

**You should see:**
```
🚀 Server running on http://localhost:5000
📦 API endpoints available at http://localhost:5000/api
⚠️  Make sure to set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env file
```

### Option 3: PowerShell Command
```powershell
cd C:\Users\ACER\nurboo\server
npm run dev
```

## Verify It's Working

1. **Check the terminal** - You should see "Server running on http://localhost:5000"
2. **Test in browser** - Open: http://localhost:5000/api/health
   - Should show: `{"status":"ok","message":"Ladakh Dry Fruits Store API is running"}`
3. **Try your app again** - The errors should be gone!

## Important Notes

### For Payment to Work:
You need to create `server/.env` file with Razorpay keys:
```env
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxx
PORT=5000
CORS_ORIGIN=http://localhost:5173
```

**But the server will start without these** - you'll just see a warning, and payment won't work until you add them.

### Keep Both Servers Running

You need **TWO terminals**:
- **Terminal 1**: Backend server (`cd server && npm run dev`)
- **Terminal 2**: Frontend server (`cd client && npm run dev`)

Both must be running for the app to work!

## Troubleshooting

**"Port 5000 already in use"**
- Another app is using port 5000
- Close that app or change PORT in `.env` to 5001

**"Cannot find module"**
- Run: `cd server && npm install`

**Server starts but still getting errors**
- Make sure frontend is also running
- Check browser console (F12) for errors
- Verify backend URL in `client/.env` is `http://localhost:5000`

