# UI/UX Mockups - Ladakh Dry Fruits Store

## Design Philosophy

The design is inspired by the warm, earthy tones of Ladakh - a region known for its high-altitude landscapes, rich culture, and organic produce. The color palette reflects the natural beauty of the Himalayas with warm browns, deep oranges, and soft beige/cream tones.

---

## Color Palette

### Primary Colors
- **Ladakh Orange** (`#d97706`): Primary action color, warm and inviting
- **Ladakh Brown** (`#8B4513`): Used for headers, footers, and accents
- **Ladakh Deep** (`#78350f`): Darker shade for hover states and emphasis
- **Ladakh Beige** (`#fef3c7`): Light background for sections
- **Ladakh Cream** (`#fff7ed`): Main background color, soft and warm
- **White** (`#ffffff`): Card backgrounds and contrast

### Usage
- Orange: Buttons, highlights, prices, important CTAs
- Brown: Navigation, footer, section headers
- Beige/Cream: Backgrounds, subtle sections
- White: Cards, content areas, modals

---

## Typography

### Font Families
- **Headings**: Poppins (bold, modern, clean)
- **Body**: Inter (readable, professional sans-serif)

### Font Sizes
- Hero Title: 5xl-6xl (48-60px)
- Section Headings: 3xl (30px)
- Card Titles: lg-xl (18-20px)
- Body Text: base (16px)
- Small Text: sm (14px)

---

## Page Layouts

### 1. Home Page

#### Hero Section
- **Layout**: Full-width gradient background (orange to brown)
- **Content**: 
  - Large centered title: "Ladakh Dry Fruits Store"
  - Subtitle: "Pure Organic Dry Fruits from Ladakh – Farm to Home"
  - Prominent "Shop Now" button
- **Height**: ~80vh on desktop, ~60vh on mobile
- **Colors**: White text on gradient background

#### Why Ladakh Section
- **Layout**: 3-column grid (1 column on mobile)
- **Content**: Three feature cards with icons:
  - Sun-Dried Naturally (🌞)
  - 100% Organic (🌱)
  - High-Altitude Quality (🏔️)
- **Style**: White background, centered text, icon above title

#### Organic & Sun-dried Section
- **Layout**: Centered single column, max-width container
- **Content**: Descriptive paragraph about organic products
- **Style**: Cream background, centered text, CTA button

#### Delivery Areas Map Section
- **Layout**: Full-width container with map
- **Content**: Interactive Leaflet map centered on Ladakh
- **Markers**: 6 delivery areas with popups
- **Style**: White background, map with orange border

#### Featured Products Preview
- **Layout**: 4-column grid (1 column on mobile)
- **Content**: Product cards with emoji icons
- **Style**: Cream background, white cards

---

### 2. Products Page

#### Header
- **Layout**: Centered title "Our Products"
- **Style**: Large heading, gray text

#### Category Filter
- **Layout**: Horizontal button group, centered
- **Buttons**: 
  - Active: Orange background, white text
  - Inactive: White background, gray text
- **Categories**: All, Apricots, Nuts, Berries, Cheese, Raisins

#### Products Grid
- **Layout**: Responsive grid
  - Mobile (350px+): 1 column
  - Tablet (640px+): 2 columns
  - Desktop (1024px+): 3 columns
  - Large (1280px+): 4 columns
- **Card Style**:
  - White background, rounded corners
  - Shadow on hover with slight scale
  - Image at top (h-48)
  - Product name, description, price, "Add to Cart" button

---

### 3. Cart Page

#### Empty State
- **Layout**: Centered content
- **Content**: 
  - Large cart emoji (🛒)
  - "Your cart is empty" message
  - "Browse Products" button

#### Cart with Items
- **Layout**: 2-column grid (1 column on mobile)
  - Left: Cart items list (2/3 width on desktop)
  - Right: Order summary sidebar (1/3 width, sticky)
- **Cart Item Card**:
  - Product image (80x80px)
  - Product name and price
  - Quantity controls (-, number, +)
  - Line total
  - Remove button
- **Order Summary**:
  - List of items with quantities
  - Total price (highlighted in orange)
  - "Proceed to Checkout" button

---

### 4. Checkout Page

#### Layout
- **Grid**: 2-column (1 column on mobile)
  - Left: Checkout form
  - Right: Order summary (sticky)

#### Checkout Form
- **Fields**:
  - Full Name (required)
  - Phone Number (required, 10 digits)
  - Email (optional)
  - Delivery Address (textarea, required)
  - Pincode (required)
  - Delivery Area dropdown (required)
- **Style**: White card, rounded inputs, orange focus ring
- **Submit Button**: Full-width, orange, "Pay ₹XXX"

#### Order Summary
- Same as cart page summary
- Sticky positioning on desktop

---

### 5. Order Success Page

#### Layout
- **Container**: Centered, max-width 2xl
- **Content**: 
  - Large checkmark emoji (✅)
  - "Order Placed Successfully!" heading
  - "Your order from Ladakh is on the way!" message
  - Order ID display (if available)
  - Order summary card
  - Customer details
  - "Continue Shopping" button

#### Order Summary Card
- **Style**: Gray background, rounded, padding
- **Sections**:
  - Items list with prices
  - Total (highlighted)
  - Delivery details

---

### 6. Admin Orders Page

#### Login Screen
- **Layout**: Centered card, max-width md
- **Content**: 
  - "Admin Login" heading
  - Password input
  - Login button
  - Demo password hint

#### Orders List
- **Layout**: Vertical list of order cards
- **Order Card**:
  - Order ID and date
  - Status badge (green for confirmed)
  - Total amount (orange)
  - Items list
  - Customer details
  - Payment ID (if available)
- **Header**: 
  - "Admin Orders" title
  - Refresh and Logout buttons

---

## Responsive Design

### Breakpoints (Tailwind defaults)
- **sm**: 640px (tablets)
- **md**: 768px (small laptops)
- **lg**: 1024px (desktops)
- **xl**: 1280px (large desktops)

### Mobile-First Approach
- All layouts start with mobile (1 column)
- Grids expand to multiple columns on larger screens
- Navigation: Horizontal menu on desktop, could collapse on mobile
- Images: Responsive, maintain aspect ratio
- Text: Scales appropriately (smaller on mobile, larger on desktop)

### Minimum Width Support
- **350px**: Minimum supported width
- All components tested and functional at this width
- Horizontal scrolling avoided
- Touch-friendly button sizes (min 44x44px)

---

## Component Patterns

### Buttons
- **Primary**: Orange background, white text, rounded, shadow on hover
- **Secondary**: Brown background, white text
- **Size**: py-2 px-6 (standard), py-3 px-8 (large)

### Cards
- **Style**: White background, rounded-lg, shadow-md
- **Hover**: shadow-xl, scale-105 (on product cards)
- **Padding**: p-4 to p-6

### Forms
- **Inputs**: White background, gray border, orange focus ring
- **Labels**: Small, medium weight, gray-700
- **Validation**: Red text for errors

### Navigation
- **Style**: White background, shadow, sticky top
- **Links**: Gray text, orange on hover
- **Cart Badge**: Orange circle with white number

---

## Accessibility Notes

- All images have alt text
- Buttons have descriptive text
- Form inputs have labels
- Color contrast meets WCAG AA standards
- Keyboard navigation supported
- Focus states visible (orange ring)

---

## Animation & Transitions

- **Hover Effects**: 
  - Buttons: Color transition (200ms)
  - Cards: Shadow and scale (200ms)
- **Loading States**: 
  - Disabled buttons with opacity
  - Loading text ("Processing...")
- **Smooth Scrolling**: Enabled for better UX

---

## Delivery Map Integration

- **Library**: Leaflet with OpenStreetMap
- **Center**: Ladakh region (34.1526, 77.5770)
- **Zoom**: Level 7 (shows entire region)
- **Markers**: 6 delivery areas
- **Popups**: Show area name and delivery time
- **Style**: Orange border, rounded corners, responsive height (h-96)

---

## Notes for Implementation

1. **Images**: Using Unsplash placeholder images. Replace with actual product photos in production.
2. **Icons**: Using emoji for simplicity. Can be replaced with icon library (e.g., React Icons) if needed.
3. **Fonts**: Google Fonts (Inter, Poppins) loaded in index.html
4. **Colors**: Defined in Tailwind config for easy theming
5. **Responsive**: All components tested at 350px minimum width

