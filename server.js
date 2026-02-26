import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Razorpay from 'razorpay';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

// This loads the .env file;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
// Add this after your app.use(express.json()) line
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Orders storage file path
const ORDERS_FILE = join(__dirname, 'orders.json');
const USERS_FILE = join(__dirname, 'users.json');
const CARTS_FILE = join(__dirname, 'carts.json');

// Helper function to read orders from file
async function readOrders() {
  try {
    const data = await fs.readFile(ORDERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return empty array
    return [];
  }
}

// Helper function to write orders to file
async function writeOrders(orders) {
  await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
}

// Helper function to read users from file
async function readUsers() {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Helper function to write users to file
async function writeUsers(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
}
app.get('/api/orders/user/:email', async (req, res) => {
  try {
    const orders = await readOrders();
    const emailParam = req.params.email.toLowerCase();

    // Filters orders comparing the user's email to either the explicitly passed `userEmail` or `customer.email`
    const userOrders = orders.filter(o => {
      const customerEmail = (o.customer && o.customer.email) ? o.customer.email.toLowerCase() : null;
      const explicitEmail = o.userEmail ? o.userEmail.toLowerCase() : null;

      return customerEmail === emailParam || explicitEmail === emailParam;
    });

    res.json({
      success: true,
      orders: userOrders
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// Helper function to read carts from file
async function readCarts() {
  try {
    const data = await fs.readFile(CARTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
}

// Helper function to write carts to file
async function writeCarts(carts) {
  await fs.writeFile(CARTS_FILE, JSON.stringify(carts, null, 2), 'utf-8');
}

// API Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Ladakh Dry Fruits Store API is running' });
});

// Customer Registration
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const users = await readUsers();

    // Check if user already exists
    const existingUser = users.find(u => u.email === email || u.phone === phone);
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email or phone already exists' });
    }

    // Create new user (in production, hash the password!)
    const newUser = {
      id: `user_${Date.now()}`,
      name,
      email,
      phone,
      password, // TODO: Hash password in production using bcrypt
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    await writeUsers(users);

    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser;

    res.json({
      success: true,
      user: userWithoutPassword,
      message: 'Registration successful',
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user', details: error.message });
  }
});

// Customer Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Trim and normalize email for comparison
    const normalizedEmail = email.trim().toLowerCase();

    const users = await readUsers();

    // Find user by email (case-insensitive)
    const user = users.find(u => u.email.trim().toLowerCase() === normalizedEmail);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check password (in production, compare hashed password!)
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      user: userWithoutPassword,
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Failed to login', details: error.message });
  }
});

// Forgot Password - Request reset (in production, send email with reset token)
app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const users = await readUsers();
    const user = users.find(u => u.email === email);

    // For security, always return success even if user doesn't exist
    // In production, you would send an email with a reset token
    if (user) {
      console.log(`Password reset requested for: ${email}`);
      // TODO: Generate reset token and send email
    }

    res.json({
      success: true,
      message: 'If an account exists with this email, password reset instructions will be sent.',
    });
  } catch (error) {
    console.error('Error processing forgot password:', error);
    res.status(500).json({ error: 'Failed to process request', details: error.message });
  }
});

// Cart Management - Get user's cart
app.get('/api/cart', async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const carts = await readCarts();
    const userCart = carts[userId] || [];

    res.json({
      success: true,
      cart: userCart,
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Failed to fetch cart', details: error.message });
  }
});

// Cart Management - Save user's cart
app.post('/api/cart', async (req, res) => {
  try {
    const { userId, cartItems } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    if (!Array.isArray(cartItems)) {
      return res.status(400).json({ error: 'Cart items must be an array' });
    }

    const carts = await readCarts();
    carts[userId] = cartItems;
    await writeCarts(carts);

    res.json({
      success: true,
      message: 'Cart saved successfully',
      cart: cartItems,
    });
  } catch (error) {
    console.error('Error saving cart:', error);
    res.status(500).json({ error: 'Failed to save cart', details: error.message });
  }
});


// Reset Password - Update password with email verification (simplified version)
app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({ error: 'Email, new password, and confirmation are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Trim and lowercase email for comparison
    const normalizedEmail = email.trim().toLowerCase();

    const users = await readUsers();
    const userIndex = users.findIndex(u => u.email.trim().toLowerCase() === normalizedEmail);

    if (userIndex === -1) {
      console.log(`Reset password failed: User not found with email: ${normalizedEmail}`);
      return res.status(404).json({ error: 'User not found. Please check your email address and try again.' });
    }

    // Update password (in production, hash the password!)
    users[userIndex].password = newPassword;
    await writeUsers(users);

    console.log(`Password reset successful for: ${email}`);

    res.json({
      success: true,
      message: 'Password has been reset successfully. You can now login with your new password.',
    });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'Failed to reset password', details: error.message });
  }
});

// Create order (COD or UPI)
app.post('/api/create-order', async (req, res) => {
  try {
    const { cartItems, total, customer, paymentMethod, upiTransactionId, userEmail } = req.body;

    // Validate required fields
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    if (!total || total <= 0) {
      return res.status(400).json({ error: 'Invalid total amount' });
    }

    if (!customer || !customer.name || !customer.phone || !customer.address) {
      return res.status(400).json({ error: 'Missing customer details' });
    }

    if (!paymentMethod || !['cod', 'upi'].includes(paymentMethod)) {
      return res.status(400).json({ error: 'Invalid payment method. Use "cod" or "upi"' });
    }

    // For UPI, validate transaction ID
    if (paymentMethod === 'upi' && !upiTransactionId) {
      return res.status(400).json({ error: 'UPI transaction ID is required' });
    }

    // Create order
    const orders = await readOrders();
    const newOrder = {
      id: `order_${Date.now()}`,
      cartItems,
      total,
      customer,
      userEmail: userEmail || customer.email || '',
      paymentMethod,
      upiTransactionId: paymentMethod === 'upi' ? upiTransactionId : null,
      // UPI orders start as 'pending' - will be confirmed after manual verification
      // COD orders are 'pending' until delivery
      status: 'pending',
      paymentStatus: paymentMethod === 'cod' ? 'pending' : (paymentMethod === 'upi' ? 'pending_verification' : 'pending'),
      createdAt: new Date().toISOString(),
    };

    orders.push(newOrder);
    await writeOrders(orders);

    console.log(`✅ Order created: ${newOrder.id} - ${paymentMethod.toUpperCase()} - ₹${total} - Status: ${newOrder.status}`);

    res.json({
      success: true,
      orderId: newOrder.id,
      message: paymentMethod === 'cod'
        ? 'Order placed successfully. Payment on delivery.'
        : 'Order placed successfully. Payment verification pending.',
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order', details: error.message });
  }
});

// Get all orders (for admin page)
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await readOrders();
    // Return orders in reverse chronological order (newest first)
    res.json(orders.reverse());
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders', details: error.message });
  }
});

// Update order status (for admin to verify payments and logistics)
app.patch('/api/orders/:orderId/status', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // Modified validation to include all status steps used in your frontend
    const validStatuses = ['pending', 'confirmed', 'packed', 'shipped', 'delivered', 'cancelled'];

    if (!status || !validStatuses.includes(status.toLowerCase())) {
      return res.status(400).json({
        error: 'Invalid status. Use: pending, confirmed, packed, shipped, delivered, or cancelled'
      });
    }

    const orders = await readOrders();
    const orderIndex = orders.findIndex(o => o.id === orderId);

    if (orderIndex === -1) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // CRITICAL: Force status to lowercase to match your frontend filter logic
    const newStatus = status.toLowerCase();
    orders[orderIndex].status = newStatus;

    // Logic for UPI verification
    if (newStatus === 'confirmed' && orders[orderIndex].paymentMethod === 'upi') {
      orders[orderIndex].paymentStatus = 'verified';
    }

    await writeOrders(orders);

    console.log(`✅ Order ${orderId} status updated to: ${newStatus}`);

    res.json({
      success: true,
      order: orders[orderIndex],
      message: `Order status updated to ${newStatus}`,
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Failed to update order status', details: error.message });
  }
});
// Correct Delete Route for JSON File Storage
app.delete('/api/orders/:id', async (req, res) => {
  try {
    const orderId = req.params.id;

    // 1. Read existing orders
    const orders = await readOrders();

    // 2. Check if order exists
    const orderExists = orders.find(o => o.id === orderId);
    if (!orderExists) {
      return res.status(404).json({ error: "Order not found" });
    }

    // 3. Filter out the order to "delete" it
    const updatedOrders = orders.filter(o => o.id !== orderId);

    // 4. Save the new list back to orders.json
    await writeOrders(updatedOrders);

    console.log(`🗑️ Order deleted: ${orderId}`);
    res.status(200).json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});
// New route to make the main link work
app.get('/api', (req, res) => {
  res.json({
    message: "Welcome to the Ladakh Dry Fruits API!",
    status: "online",
    test_endpoint: "/api/health"
  });
});
// Get specific order details by ID
app.get('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await readOrders();
    const order = orders.find(o => o.id === id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({
      success: true,
      order: order
    });
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({ error: 'Failed to fetch order details', details: error.message });
  }
});

// ... after your login/register routes ...



// ... before app.listen ...

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📦 API endpoints available at http://localhost:${PORT}/api`);
  console.log(`⚠️  Make sure to set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env file`);
});

