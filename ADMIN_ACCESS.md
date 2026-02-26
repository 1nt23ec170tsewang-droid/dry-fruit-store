# 🔐 Admin Page Access Guide

## How to Access Admin Page

The admin page is **hidden from the navigation menu** for security. Only the owner can access it.

### Method 1: Direct URL (Recommended)

Simply type the admin URL in your browser:

```
http://localhost:5173/admin
```

Or if deployed:
```
https://your-domain.com/admin
```

### Method 2: Browser Bookmark

1. Navigate to `/admin` page
2. Bookmark it in your browser
3. Access it anytime from bookmarks

### Method 3: Browser History

If you've visited the admin page before, you can access it from browser history.

---

## Admin Login Credentials

**Password:** `Nurboo@2001`

⚠️ **Important:** Keep this password secure and change it in production!

---

## Admin Features

Once logged in, you can:
- ✅ View all orders
- ✅ See customer details
- ✅ Check payment methods (COD/UPI)
- ✅ View order status
- ✅ See transaction IDs (for UPI orders)
- ✅ Refresh orders list
- ✅ Logout from admin panel

---

## Security Notes

1. **Password Protection:** The admin page is password-protected
2. **Hidden from Navigation:** Admin link is not visible in the navbar
3. **Direct Access Only:** Only accessible via direct URL
4. **No Public Link:** Customers cannot see or access the admin page

---

## For Production

In production, consider:
- Using environment variables for admin password
- Implementing JWT tokens for authentication
- Adding IP whitelisting
- Using a separate admin subdomain
- Adding two-factor authentication

---

## Quick Access

**Local Development:**
- URL: `http://localhost:5173/admin`
- Password: `Nurboo@2001`

**Production:**
- URL: `https://your-domain.com/admin`
- Password: `Nurboo@2001` (change this!)

