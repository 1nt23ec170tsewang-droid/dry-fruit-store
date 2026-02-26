# 💳 Setup Razorpay for Payments - Step by Step

## Quick Setup (5 minutes)

### Step 1: Get Razorpay Test Keys

1. **Go to Razorpay Dashboard:**
   - Visit: https://dashboard.razorpay.com
   - Sign up for a free account (or log in if you have one)

2. **Navigate to API Keys:**
   - After logging in, go to: **Settings → API Keys**
   - Or directly: https://dashboard.razorpay.com/app/keys

3. **Generate Test Keys:**
   - Click **"Generate Test Keys"** button
   - You'll get:
     - **Key ID** (starts with `rzp_test_`)
     - **Key Secret** (long string)

4. **Copy Both Keys:**
   - Keep them safe - you'll need them in the next step

### Step 2: Create Backend .env File

1. **Navigate to server folder:**
   ```bash
   cd server
   ```

2. **Create `.env` file:**
   - Create a new file named `.env` (no extension, just `.env`)
   - Add this content (replace with your actual keys):

   ```env
   RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
   RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxx
   PORT=5000
   CORS_ORIGIN=http://localhost:5173
   ```

3. **Replace the placeholders:**
   - `rzp_test_xxxxxxxxxxxxx` → Your actual Key ID
   - `xxxxxxxxxxxxxxxxxxxxx` → Your actual Key Secret

### Step 3: Create Frontend .env File

1. **Navigate to client folder:**
   ```bash
   cd client
   ```

2. **Create `.env` file:**
   - Create a new file named `.env`
   - Add this content:

   ```env
   VITE_API_BASE_URL=http://localhost:5000
   VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
   ```

3. **Use the same Key ID** from Step 2

### Step 4: Restart Both Servers

**Important:** After creating `.env` files, you MUST restart both servers:

1. **Stop both servers** (Press Ctrl+C in both terminals)

2. **Restart Backend:**
   ```bash
   cd server
   npm run dev
   ```
   You should see: `✅ Razorpay initialized`

3. **Restart Frontend:**
   ```bash
   cd client
   npm run dev
   ```

### Step 5: Test Payment

1. Go to http://localhost:5173
2. Add products to cart
3. Go to checkout
4. Fill in your details
5. Click "Pay Now"

**Use Razorpay Test Card:**
- **Card Number:** `4111 1111 1111 1111`
- **CVV:** Any 3 digits (e.g., `123`)
- **Expiry:** Any future date (e.g., `12/25`)
- **Name:** Any name

---

## Example .env Files

### server/.env
```env
RAZORPAY_KEY_ID=rzp_test_1DP5mmOlF5G5ag
RAZORPAY_KEY_SECRET=abcd1234efgh5678ijkl9012mnop3456
PORT=5000
CORS_ORIGIN=http://localhost:5173
```

### client/.env
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=rzp_test_1DP5mmOlF5G5ag
```

---

## Troubleshooting

### "Payment service unavailable" Error

**Cause:** Razorpay keys not configured or server not restarted

**Fix:**
1. Check `server/.env` exists and has correct keys
2. Check `client/.env` exists and has Key ID
3. Restart both servers
4. Check backend terminal shows: `✅ Razorpay initialized`

### "Razorpay Key ID is not configured"

**Cause:** Frontend `.env` file missing or Key ID not set

**Fix:**
1. Create `client/.env` file
2. Add `VITE_RAZORPAY_KEY_ID=rzp_test_xxxxx`
3. Restart frontend server

### "Cannot connect to server"

**Cause:** Backend server not running

**Fix:**
1. Start backend: `cd server && npm run dev`
2. Verify: http://localhost:5000/api/health works

### Keys Not Working

**Check:**
- Keys start with `rzp_test_` (test keys)
- No extra spaces in `.env` file
- Keys are copied correctly (no missing characters)
- You're using TEST keys, not LIVE keys

---

## Important Notes

1. **Test Keys vs Live Keys:**
   - Use **TEST keys** for development (start with `rzp_test_`)
   - **LIVE keys** are for production (start with `rzp_live_`)

2. **Security:**
   - Never commit `.env` files to Git
   - Don't share your keys publicly
   - Use test keys for development only

3. **Restart Required:**
   - Always restart servers after changing `.env` files
   - Environment variables are loaded at startup

---

## Need Help?

If you're still having issues:
1. Check backend terminal for error messages
2. Check browser console (F12) for errors
3. Verify both `.env` files exist and have correct format
4. Make sure both servers are running

