# Ladakh Dry Fruits Store - Backend Server

Express.js backend API for the Ladakh Dry Fruits Store e-commerce application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Add your Razorpay credentials to `.env`:
```env
RAZORPAY_KEY_ID=your_key_id_here
RAZORPAY_KEY_SECRET=your_key_secret_here
PORT=5000
CORS_ORIGIN=http://localhost:5173
```

4. Run the server:
```bash
npm run dev    # Development mode with auto-reload
npm start      # Production mode
```

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/create-order` - Create Razorpay order
- `POST /api/verify-signature` - Verify payment signature
- `GET /api/orders` - Get all orders (for admin)

## Notes

- Orders are stored in `orders.json` file (for demo/testing only)
- In production, replace with a proper database (MongoDB, PostgreSQL, etc.)
- Make sure to set proper CORS origin for production

