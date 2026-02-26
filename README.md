# Ladakh Dry Fruits Store - E-commerce Web App

A complete, production-ready e-commerce web application for selling pure organic dry fruits from Ladakh, India. Built with React + Vite, Tailwind CSS, Node.js + Express, and integrated with Razorpay for payments.

## 🏔️ Features

- **Product Catalog**: Browse organic dry fruits from Ladakh (Apricots, Walnuts, Seabuckthorn, Churpe, etc.)
- **Shopping Cart**: Add products, manage quantities, view totals
- **Checkout & Payment**: Secure checkout with Razorpay integration
- **Delivery Areas Map**: Interactive map showing delivery areas in Ladakh
- **Order Management**: Admin page to view all orders
- **PWA Support**: Installable as a web app on mobile devices
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop (min width: 350px)

## 📁 Project Structure

```
ladakh-dry-fruits-store/
├── client/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React Context (Cart)
│   │   ├── data/          # Product data
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services (Payment)
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── package.json
│   └── vite.config.js
├── server/                 # Node.js + Express backend
│   ├── server.js          # Express server & API routes
│   ├── orders.json        # Orders storage (created at runtime)
│   └── package.json
├── docs/
│   └── ui-mockups.md      # UI/UX design documentation
└── README.md
```

## 🚀 Local Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Razorpay test account (get keys from https://dashboard.razorpay.com/app/keys)

### Step 1: Install Dependencies

```bash
# Install root dependencies (if using workspaces)
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

Or use the convenience script:

```bash
npm run install:all
```

### Step 2: Configure Environment Variables

#### Backend (server/.env)

Create a `.env` file in the `server/` directory:

```env
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
PORT=5000
CORS_ORIGIN=http://localhost:5173
```

**To get Razorpay test keys:**
1. Sign up at https://razorpay.com
2. Go to Dashboard → Settings → API Keys
3. Generate test keys
4. Copy Key ID and Key Secret to `.env` file

#### Frontend (client/.env)

Create a `.env` file in the `client/` directory:

```env
VITE_API_BASE_URL=[https://dry-fruit-store.onrender.com]
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id_here
```

**Note:** The Razorpay Key ID is also needed in the frontend for the checkout script.

### Step 3: Run Development Servers

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

The backend will run on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

The frontend will run on `http://localhost:5173`

### Step 4: Test the Application

1. Open `http://localhost:5173` in your browser
2. Browse products, add items to cart
3. Proceed to checkout
4. Use Razorpay test card for payment:
   - **Card Number**: `4111 1111 1111 1111`
   - **CVV**: Any 3 digits (e.g., `123`)
   - **Expiry**: Any future date (e.g., `12/25`)
   - **Name**: Any name

## 🌐 Deployment

### Frontend Deployment (Vercel - Recommended)

1. **Build the client:**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy to Vercel:**
   - Sign up at https://vercel.com
   - Install Vercel CLI: `npm i -g vercel`
   - Navigate to `client/` directory
   - Run: `vercel`
   - Follow the prompts
   - Set environment variable:
     - `VITE_API_BASE_URL`: Your backend URL (e.g., `https://your-backend.onrender.com`)
     - `VITE_RAZORPAY_KEY_ID`: Your Razorpay Key ID

3. **Alternative - Netlify:**
   - Sign up at https://netlify.com
   - Drag and drop the `client/dist` folder, OR
   - Connect your GitHub repo and set:
     - Build command: `npm run build`
     - Publish directory: `dist`
     - Environment variables: Same as Vercel

### Backend Deployment (Render - Recommended)

1. **Prepare for deployment:**
   - Push your code to GitHub
   - Make sure `server/package.json` has a `start` script

2. **Deploy to Render:**
   - Sign up at https://render.com
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `ladakh-dry-fruits-api`
     - **Root Directory**: `server`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Node Version**: `18` or higher

3. **Set Environment Variables in Render:**
   - `RAZORPAY_KEY_ID`: Your Razorpay Key ID
   - `RAZORPAY_KEY_SECRET`: Your Razorpay Key Secret
   - `PORT`: `5000` (or leave default)
   - `CORS_ORIGIN`: Your frontend URL (e.g., `https://your-app.vercel.app`)

4. **Get your backend URL:**
   - Render will provide a URL like: `https://your-service.onrender.com`
   - Update your frontend's `VITE_API_BASE_URL` to this URL

### Alternative Backend Deployment (Railway)

1. Sign up at https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Select your repository
4. Set root directory to `server`
5. Add environment variables (same as Render)
6. Deploy

### Connecting Frontend & Backend in Production

1. **Update Frontend Environment Variables:**
   - In Vercel/Netlify dashboard, add:
     - `VITE_API_BASE_URL`: Your deployed backend URL
     - `VITE_RAZORPAY_KEY_ID`: Your Razorpay Key ID

2. **Update Backend CORS:**
   - In Render/Railway, set `CORS_ORIGIN` to your frontend URL

3. **Redeploy:**
   - Frontend: Redeploy after updating env vars
   - Backend: Restart service after updating env vars

## 📱 Using as a Mobile App

### Android (Chrome)

1. Open your deployed website in Chrome
2. Tap the three-dot menu (⋮)
3. Select "Add to Home screen" or "Install app"
4. Confirm the installation
5. The app will appear on your home screen
6. Open it like a native app

### iOS (Safari)

1. Open your website in Safari
2. Tap the Share button
3. Select "Add to Home Screen"
4. Customize the name (optional)
5. Tap "Add"
6. The app icon will appear on your home screen

### PWA Features

- Works offline (with service worker)
- App-like experience
- Fast loading
- Responsive design optimized for mobile

## 🧪 Testing in Production

1. **Test Product Browsing:**
   - Open your deployed frontend URL
   - Browse products, add to cart

2. **Test Checkout:**
   - Fill checkout form
   - Use Razorpay test card (see Local Setup)
   - Complete payment

3. **Test Order Management:**
   - Visit `/admin` page
   - Login with password (default: `admin123`)
   - Verify order appears in the list

4. **Test API Endpoints:**
   - `GET https://your-backend.onrender.com/api/health` - Should return `{status: 'ok'}`
   - `GET https://your-backend.onrender.com/api/orders` - Should return orders array

## 🔧 API Endpoints

### Backend API (`/api`)

- `GET /api/health` - Health check
- `POST /api/create-order` - Create Razorpay order
  - Body: `{ amount: number, currency: 'INR' }`
  - Returns: `{ orderId, amount, currency }`
- `POST /api/verify-signature` - Verify payment
  - Body: `{ razorpay_order_id, razorpay_payment_id, razorpay_signature, orderData }`
  - Returns: `{ success: true, orderId }`
- `GET /api/orders` - Get all orders (for admin)

## 📝 Important Notes

### Security

- **Admin Password**: Change the default password in `client/src/pages/AdminOrders.jsx` (currently `admin123`)
- **Environment Variables**: Never commit `.env` files to Git
- **Razorpay Keys**: Use test keys for development, production keys for live site
- **CORS**: Configure `CORS_ORIGIN` properly in production

### Production Checklist

- [ ] Replace Razorpay test keys with production keys
- [ ] Update `VITE_API_BASE_URL` in frontend
- [ ] Update `CORS_ORIGIN` in backend
- [ ] Change admin password
- [ ] Replace placeholder product images with real photos
- [ ] Update product data with actual prices and descriptions
- [ ] Test payment flow end-to-end
- [ ] Set up proper database (replace JSON file storage)
- [ ] Add error logging and monitoring
- [ ] Configure custom domain (optional)

### TODO in Code

Look for `TODO` comments in the codebase:
- `server/server.js`: Razorpay credentials setup
- `client/src/services/paymentService.js`: Backend URL configuration
- `client/src/pages/Checkout.jsx`: Razorpay Key ID
- `client/src/pages/AdminOrders.jsx`: Admin password

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, React Router
- **Styling**: Tailwind CSS
- **Backend**: Node.js, Express
- **Payment**: Razorpay
- **Maps**: Leaflet, OpenStreetMap
- **PWA**: Vite PWA Plugin

## 📄 License

This project is open source and available for use.

## 🤝 Support

For issues or questions:
1. Check the `docs/ui-mockups.md` for design details
2. Review the code comments for implementation details
3. Ensure all environment variables are set correctly
4. Verify Razorpay keys are valid

---

**Built with ❤️ for Ladakh Dry Fruits Store**


