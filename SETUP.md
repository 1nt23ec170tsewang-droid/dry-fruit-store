# Quick Setup Guide

## Step-by-Step Setup Instructions

### 1. Install Dependencies

```bash
# Install all dependencies
npm run install:all
```

Or manually:
```bash
cd client && npm install
cd ../server && npm install
```

### 2. Configure Backend

1. Navigate to `server/` directory
2. Create a `.env` file:
```bash
cd server
copy .env.example .env  # Windows
# OR
cp .env.example .env    # Mac/Linux
```

3. Edit `.env` and add your Razorpay test credentials:
```env
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxx
PORT=5000
CORS_ORIGIN=http://localhost:5173
```

**Get Razorpay Test Keys:**
- Go to https://dashboard.razorpay.com/app/keys
- Generate test keys
- Copy Key ID and Key Secret to `.env`

### 3. Configure Frontend

1. Navigate to `client/` directory
2. Create a `.env` file:
```bash
cd client
copy .env.example .env  # Windows
# OR
cp .env.example .env    # Mac/Linux
```

3. Edit `.env`:
```env
VITE_API_BASE_URL=https://dry-fruit-store.onrender.com
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
```

Use the same Razorpay Key ID from step 2.

### 4. Run the Application

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

### 5. Test the App

1. Open http://localhost:5173
2. Browse products and add to cart
3. Go to checkout
4. Use Razorpay test card:
   - Card: `4111 1111 1111 1111`
   - CVV: `123`
   - Expiry: Any future date (e.g., `12/25`)
   - Name: Any name

### 6. Access Admin Panel

1. Go to http://localhost:5173/admin
2. Password: `admin123` (change this in production!)

## Troubleshooting

**Backend not starting?**
- Check if port 5000 is available
- Verify `.env` file exists and has correct values
- Make sure Razorpay keys are valid

**Frontend not connecting to backend?**
- Check `VITE_API_BASE_URL` in `client/.env`
- Make sure backend is running on port 5000
- Check browser console for CORS errors

**Payment not working?**
- Verify Razorpay Key ID is set in frontend `.env`
- Check backend logs for errors
- Make sure you're using test keys, not production keys

## Next Steps

- Read the main `README.md` for deployment instructions
- Check `docs/ui-mockups.md` for design details
- Replace placeholder product images with real photos
- Update product data with actual prices


