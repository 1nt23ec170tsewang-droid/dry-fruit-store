# Project Structure Overview

## Complete File Structure

```
ladakh-dry-fruits-store/
│
├── client/                          # React + Vite Frontend
│   ├── public/
│   │   └── manifest.json           # PWA manifest
│   ├── src/
│   │   ├── components/             # Reusable React components
│   │   │   ├── DeliveryMap.jsx     # Leaflet map for delivery areas
│   │   │   ├── Footer.jsx          # Site footer
│   │   │   ├── Navbar.jsx          # Navigation bar
│   │   │   └── ProductCard.jsx     # Product card component
│   │   ├── context/
│   │   │   └── CartContext.jsx     # Cart state management
│   │   ├── data/
│   │   │   └── products.js         # Product data
│   │   ├── pages/                  # Page components
│   │   │   ├── AdminOrders.jsx    # Admin orders page
│   │   │   ├── Cart.jsx            # Shopping cart page
│   │   │   ├── Checkout.jsx        # Checkout & payment page
│   │   │   ├── Home.jsx            # Home page
│   │   │   ├── OrderSuccess.jsx    # Order success page
│   │   │   └── Products.jsx        # Products listing page
│   │   ├── services/
│   │   │   └── paymentService.js   # Razorpay payment service
│   │   ├── App.jsx                 # Main app component with routing
│   │   ├── index.css               # Global styles (Tailwind)
│   │   └── main.jsx                # React entry point
│   ├── index.html                  # HTML template
│   ├── package.json                # Frontend dependencies
│   ├── vite.config.js              # Vite configuration + PWA
│   ├── tailwind.config.js          # Tailwind CSS configuration
│   ├── postcss.config.js           # PostCSS configuration
│   ├── .env.example                # Environment variables template
│   ├── .gitignore                  # Git ignore rules
│   └── README.md                   # Frontend documentation
│
├── server/                          # Node.js + Express Backend
│   ├── server.js                    # Express server & API routes
│   ├── package.json                 # Backend dependencies
│   ├── .env.example                 # Environment variables template
│   ├── .gitignore                   # Git ignore rules
│   ├── orders.json                  # Orders storage (created at runtime)
│   └── README.md                    # Backend documentation
│
├── docs/
│   └── ui-mockups.md               # UI/UX design documentation
│
├── package.json                     # Root package.json (workspaces)
├── README.md                        # Main project documentation
├── SETUP.md                         # Quick setup guide
├── PROJECT_STRUCTURE.md             # This file
└── .gitignore                       # Root git ignore
```

## Key Files Explained

### Frontend (client/)

**Core Application:**
- `src/App.jsx` - Main app with React Router setup
- `src/main.jsx` - React entry point
- `src/index.css` - Global Tailwind styles

**Pages:**
- `Home.jsx` - Landing page with hero, features, map
- `Products.jsx` - Product catalog with filtering
- `Cart.jsx` - Shopping cart with quantity controls
- `Checkout.jsx` - Checkout form + Razorpay integration
- `OrderSuccess.jsx` - Order confirmation page
- `AdminOrders.jsx` - Admin order management

**Components:**
- `Navbar.jsx` - Navigation with cart badge
- `Footer.jsx` - Site footer
- `ProductCard.jsx` - Product display card
- `DeliveryMap.jsx` - Interactive Leaflet map

**State & Services:**
- `context/CartContext.jsx` - Global cart state (React Context)
- `services/paymentService.js` - Razorpay API calls
- `data/products.js` - Product data array

**Configuration:**
- `vite.config.js` - Vite + PWA plugin config
- `tailwind.config.js` - Tailwind theme (Ladakh colors)
- `postcss.config.js` - PostCSS for Tailwind

### Backend (server/)

**Core:**
- `server.js` - Express server with all API routes:
  - `GET /api/health` - Health check
  - `POST /api/create-order` - Create Razorpay order
  - `POST /api/verify-signature` - Verify payment
  - `GET /api/orders` - Get all orders

**Storage:**
- `orders.json` - JSON file storage (created at runtime)
  - Note: Replace with database in production

### Documentation

- `README.md` - Complete project documentation
- `SETUP.md` - Quick setup instructions
- `docs/ui-mockups.md` - UI/UX design details
- `PROJECT_STRUCTURE.md` - This file

## Environment Variables

### Backend (.env in server/)
```env
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
PORT=5000
CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env in client/)
```env
VITE_API_BASE_URL=https://dry-fruit-store.onrender.com
VITE_RAZORPAY_KEY_ID=your_key_id
```

## Dependencies

### Frontend
- React 18
- React Router DOM
- Vite
- Tailwind CSS
- Axios
- Leaflet + React-Leaflet
- Vite PWA Plugin

### Backend
- Express
- Razorpay SDK
- CORS
- dotenv

## Build Outputs

- `client/dist/` - Built frontend (for deployment)
- `server/orders.json` - Orders data (created at runtime)

## Notes

- All images use Unsplash placeholders - replace with real product photos
- PWA icons (pwa-192x192.png, pwa-512x512.png) need to be added to `client/public/`
- Admin password is hardcoded in `AdminOrders.jsx` - change for production
- Orders stored in JSON file - migrate to database for production


