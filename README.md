# Ladakh Dry Fruits Store - Frontend Client

React + Vite frontend for the Ladakh Dry Fruits Store e-commerce application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id_here
```

3. Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Features

- React Router for navigation
- Tailwind CSS for styling
- Cart management with React Context
- Razorpay payment integration
- Leaflet map for delivery areas
- PWA support

