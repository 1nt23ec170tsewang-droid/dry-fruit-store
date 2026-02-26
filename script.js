// Product Data
const products = [
    {
        id: 1,
        name: "Premium Almonds",
        price: 200,
        category: "nuts",
        image: "Almond-Big-dry-fruit-nut-mixture.webp",
        description: "Rich in protein and healthy fats",
        rating: 4.5,
        stock: 50,
        badge: "Best Seller"
    },
    {
        id: 2,
        name: "Cashew Nuts",
        price: 200,
        category: "nuts",
        image: "image_97225a30-47e6-4d93-bded-7fa5bc4d5d4c_1200x1200.webp",
        description: "Premium quality cashews",
        rating: 4.8,
        stock: 45,
        badge: "Popular"
    },
    {
        id: 3,
        name: "Walnuts",
        price: 100,
        category: "nuts",
        image: "download.jpg",
        description: "Rich in omega-3 fatty acids",
        rating: 4.3,
        stock: 30,
        badge: "New"
    },
    {
        id: 4,
        name: "Dry Apricot",
        price: 200,
        category: "dried-fruits",
        image: "untitled-session122715-600x600.webp",
        description: "Natural sweetness in every bite",
        rating: 4.6,
        stock: 40,
        badge: "Organic"
    },
    {
        id: 5,
        name: "Raisins",
        price: 100,
        category: "dried-fruits",
        image: "raisen.jpg",
        description: "Rich in vitamins, minerals, and fiber",
        rating: 4.4,
        stock: 60,
        badge: "Best Value"
    }
];

// Initialize the product grid
function initializeProducts() {
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.productId = product.id;
    
    card.innerHTML = `
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
        <span class="product-category">${product.category}</span>
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">₹${product.price} / 500g</p>
        <p class="product-description">${product.description}</p>
        <div class="product-meta">
            <div class="rating">
                ${'★'.repeat(Math.floor(product.rating))}${product.rating % 1 ? '½' : ''}
                <span>(${product.rating})</span>
            </div>
            <span class="stock-status">${product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
        </div>
        <button class="add-to-cart" ${product.stock === 0 ? 'disabled' : ''}>
            ${product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
    `;

    return card;
}

// Search and Filter Functionality
function initializeSearchAndFilter() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');

    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        const priceRange = priceFilter.value;

        const filteredProducts = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                                product.description.toLowerCase().includes(searchTerm);
            
            const matchesCategory = category === 'all' || product.category === category;
            
            let matchesPrice = true;
            if (priceRange !== 'all') {
                const [min, max] = priceRange.split('-').map(Number);
                if (max) {
                    matchesPrice = product.price >= min && product.price <= max;
                } else {
                    matchesPrice = product.price >= min;
                }
            }

            return matchesSearch && matchesCategory && matchesPrice;
        });

        updateProductGrid(filteredProducts);
    }

    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
    priceFilter.addEventListener('change', filterProducts);
}

function updateProductGrid(filteredProducts) {
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = '';

    if (filteredProducts.length === 0) {
        productGrid.innerHTML = '<p class="no-products">No products found matching your criteria.</p>';
        return;
    }

    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });

    // Reattach event listeners to new product cards
    attachAddToCartListeners();
}

// Shopping Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// WhatsApp Configuration
const WHATSAPP_NUMBER = '+91XXXXXXXXXX'; // Replace with your actual WhatsApp number

// Add to Cart Functionality
function attachAddToCartListeners() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productId = parseInt(productCard.dataset.productId);
            const product = products.find(p => p.id === productId);
            
            if (!product || product.stock === 0) return;

            // Check if product already exists in cart
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                if (existingItem.quantity < product.stock) {
                    existingItem.quantity += 1;
                } else {
                    showNotification('Maximum stock limit reached!', 'error');
                    return;
                }
            } else {
                cart.push({
                    id: productId,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1
                });
            }
            
            // Save to localStorage
            saveCart();
            
            // Update cart count and display
            updateCartCount();
            updateCartDisplay();
            
            // Show notification
            showNotification(`${product.name} added to cart!`);
        });
    });
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeProducts();
    initializeSearchAndFilter();
    attachAddToCartListeners();
    updateCartCount();
    updateCartDisplay();
    
    // Close cart when clicking outside
    document.addEventListener('click', function(e) {
        const cartSidebar = document.getElementById('cartSidebar');
        const checkoutModal = document.getElementById('checkoutModal');
        
        if (cartSidebar && !cartSidebar.contains(e.target) && 
            !e.target.closest('a[href="#cart"]') && 
            !e.target.closest('.fa-shopping-cart')) {
            if (cartSidebar.classList.contains('active')) {
                // Don't close if clicking on cart items or buttons
                if (!e.target.closest('.cart-item') && 
                    !e.target.closest('.checkout-btn') &&
                    !e.target.closest('.quantity-btn') &&
                    !e.target.closest('.remove-btn')) {
                    // Keep cart open for now - user can close manually
                }
            }
        }
        
        // Close checkout modal when clicking outside
        if (checkoutModal && e.target === checkoutModal) {
            closeCheckoutModal();
        }
    });
});

// Save Cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update Cart Count
function updateCartCount() {
    const cartCount = document.querySelector('.fa-shopping-cart');
    if (cartCount) {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.setAttribute('data-count', count);
    }
}

// Update Cart Display
function updateCartDisplay() {
    const cartContainer = document.querySelector('.cart-items');
    if (!cartContainer) return;

    cartContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover;">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>₹${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <div class="cart-item-actions">
                <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                <button class="remove-btn" onclick="removeFromCart('${item.id}')">×</button>
            </div>
        `;
        cartContainer.appendChild(cartItem);
    });

    // Update total
    const totalElement = document.querySelector('.cart-total');
    if (totalElement) {
        totalElement.textContent = `Total: ₹${total.toFixed(2)}`;
    }
}

// Update Item Quantity
function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }

    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        saveCart();
        updateCartCount();
        updateCartDisplay();
    }
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    updateCartDisplay();
    showNotification('Item removed from cart');
}

// Cart Toggle Functions
function toggleCart(e) {
    if (e) e.preventDefault();
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) {
        cartSidebar.classList.toggle('active');
    }
}

function closeCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) {
        cartSidebar.classList.remove('active');
    }
}

// Checkout Modal Functions
function openCheckoutModal() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    const checkoutModal = document.getElementById('checkoutModal');
    if (checkoutModal) {
        checkoutModal.classList.add('active');
    }
}

function closeCheckoutModal() {
    const checkoutModal = document.getElementById('checkoutModal');
    if (checkoutModal) {
        checkoutModal.classList.remove('active');
    }
}

// Handle village selection change
document.addEventListener('DOMContentLoaded', () => {
    const villageSelect = document.getElementById('customerVillage');
    const otherVillageGroup = document.getElementById('otherVillageGroup');
    
    if (villageSelect && otherVillageGroup) {
        villageSelect.addEventListener('change', function() {
            if (this.value === 'Other') {
                otherVillageGroup.style.display = 'block';
                document.getElementById('otherVillage').required = true;
            } else {
                otherVillageGroup.style.display = 'none';
                document.getElementById('otherVillage').required = false;
            }
        });
    }
});

// WhatsApp Checkout Function
function handleCheckout(e) {
    e.preventDefault();
    
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }

    const customerName = document.getElementById('customerName').value.trim();
    const villageSelect = document.getElementById('customerVillage').value;
    const otherVillage = document.getElementById('otherVillage').value.trim();
    
    if (!customerName) {
        showNotification('Please enter your name', 'error');
        return;
    }
    
    if (!villageSelect) {
        showNotification('Please select your village', 'error');
        return;
    }
    
    const customerVillage = villageSelect === 'Other' ? otherVillage : villageSelect;
    
    if (villageSelect === 'Other' && !otherVillage) {
        showNotification('Please specify your village', 'error');
        return;
    }

    // Calculate total
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    // Format WhatsApp message
    let message = `*Order Details - Aryan Dry Fruits*\n\n`;
    message += `*Customer Name:* ${customerName}\n`;
    message += `*Village:* ${customerVillage}\n\n`;
    message += `*Items:*\n`;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        message += `${index + 1}. ${item.name}\n`;
        message += `   Quantity: ${item.quantity}\n`;
        message += `   Price: ₹${item.price.toFixed(2)} x ${item.quantity} = ₹${itemTotal.toFixed(2)}\n\n`;
    });
    
    message += `*Total Price: ₹${total.toFixed(2)}*\n\n`;
    message += `Thank you for your order!`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Format phone number (remove + and spaces)
    const phoneNumber = WHATSAPP_NUMBER.replace(/[\s\+]/g, '');
    
    // Create WhatsApp URL
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Close modal
    closeCheckoutModal();
    
    // Clear cart
    cart = [];
    saveCart();
    updateCartCount();
    updateCartDisplay();
    
    // Show success notification
    showNotification('Opening WhatsApp to complete your order!', 'success');
}

// Checkout Process (legacy function - kept for compatibility)
function checkout() {
    openCheckoutModal();
}

// Show Notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Add styles
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = type === 'success' ? '#4CAF50' : '#f44336';
    notification.style.color = 'white';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '5px';
    notification.style.zIndex = '1000';
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', { name, email, message });
        
        // Show success message
        showNotification('Message sent successfully!');
        
        // Reset form
        this.reset();
    });
}

// Mobile Menu Toggle
const mobileMenuButton = document.createElement('button');
mobileMenuButton.className = 'mobile-menu-button';
mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';

const navbar = document.querySelector('.navbar');
if (navbar) {
    navbar.appendChild(mobileMenuButton);
    
    mobileMenuButton.addEventListener('click', function() {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        }
    });
}

// Add styles for mobile menu button
const style = document.createElement('style');
style.textContent = `
    .mobile-menu-button {
        display: none;
        background: none;
        border: none;
        color: var(--text-color);
        font-size: 1.5rem;
        cursor: pointer;
    }
    
    @media (max-width: 768px) {
        .mobile-menu-button {
            display: block;
        }
        
        .nav-links {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--white);
            flex-direction: column;
            padding: 1rem;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .nav-links.active {
            display: flex;
        }
    }
`;
document.head.appendChild(style);

// Add scroll-based navbar styling
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    } else {
        navbar.style.backgroundColor = 'var(--background)';
        navbar.style.boxShadow = 'none';
    }
}); 