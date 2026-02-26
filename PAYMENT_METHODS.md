# Payment Methods - COD & UPI

## Overview

The Ladakh Dry Fruits Store now supports two payment methods:

1. **Cash on Delivery (COD)** - Pay when you receive your order
2. **UPI Payment** - Pay via UPI using QR code or UPI ID

## How It Works

### Cash on Delivery (COD)

1. Select "Cash on Delivery" at checkout
2. Fill in delivery details
3. Place order
4. Pay cash when order is delivered
5. No online payment required

### UPI Payment

1. Select "UPI Payment" at checkout
2. Fill in delivery details
3. Click "Proceed to UPI Payment"
4. QR code will be displayed
5. Scan QR code with any UPI app (PhonePe, Google Pay, Paytm, etc.)
6. Complete payment in your UPI app
7. Enter the transaction ID from your UPI app
8. Click "Confirm Payment & Place Order"

## UPI QR Code

- The QR code contains all payment details
- Amount is pre-filled
- Works with all UPI apps
- Alternative: Enter UPI ID manually if QR code doesn't work

## UPI ID Configuration

Default UPI ID: `ladakhdryfruits@paytm`

To change the UPI ID, edit `client/src/components/UPIQRCode.jsx`:
```jsx
<UPIQRCode amount={getTotalPrice()} upiId="your-upi-id@paytm" />
```

## Order Status

- **COD Orders**: Status = "pending" (confirmed after delivery)
- **UPI Orders**: Status = "confirmed" (payment received)

## Admin Panel

Admins can see:
- Payment method for each order
- UPI transaction ID (for UPI orders)
- Order status

## Benefits

✅ No payment gateway setup required  
✅ No transaction fees  
✅ Works for all customers  
✅ Simple and familiar payment methods  
✅ COD for customers who prefer cash  
✅ UPI for instant digital payments  

