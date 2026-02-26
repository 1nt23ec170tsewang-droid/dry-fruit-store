# 🚀 Quick Start Guide

## Get Started in 5 Minutes

### 1. Install Dependencies

```bash
# Install all dependencies
cd client && npm install
cd ../server && npm install
```

### 2. Set Up Environment Variables

**Backend** (`server/.env`):
```env
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxx
PORT=5000
CORS_ORIGIN=http://localhost:5173
```

**Frontend** (`client/.env`):
```env
VITE_API_BASE_URL=[https://dry-fruit-store.onrender.com]
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
```

### 3. Run the App

**Terminal 1:**
```bash
cd server
npm run dev
```

**Terminal 2:**
```bash
cd client
npm run dev
```

### 4. Open Browser

Visit: http://localhost:5173

### 5. Test Payment

Use Razorpay test card:
- **Card**: `4111 1111 1111 1111`
- **CVV**: `123`
- **Expiry**: `12/25`

---

## 📋 What's Included

✅ Complete e-commerce frontend (React + Vite)  
✅ Express backend with Razorpay integration  
✅ Shopping cart with state management  
✅ Checkout & payment flow  
✅ Order management (admin page)  
✅ Interactive delivery map (Leaflet)  
✅ PWA support  
✅ Responsive design (mobile-first)  
✅ Comprehensive documentation  

## 📚 Next Steps

1. Read `README.md` for full documentation
2. Check `SETUP.md` for detailed setup
3. Review `docs/ui-mockups.md` for design details
4. Deploy using instructions in `README.md`

## 🆘 Need Help?

- Check `README.md` for troubleshooting
- Verify all environment variables are set
- Make sure Razorpay test keys are valid
- Check browser console for errors

---

**Ready to go! 🏔️**


