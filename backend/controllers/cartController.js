// controllers/cartController.js
import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';

// Get the current user's cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.productId');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart' });
  }
};

// Add a product to the user's cart
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the cart already exists for the user
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      // If no cart exists, create a new one with the product
      cart = new Cart({
        user: req.user._id,
        items: [{ productId, quantity }],
      });
    } else {
      // If the cart exists, check if the product is already in the cart
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex >= 0) {
        // If product is in cart, update the quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // If product is not in cart, add a new item
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error adding to cart' });
  }
};

// Update the quantity of a product in the cart
export const updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex >= 0) {
      // If the product is found, update its quantity
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      res.json(cart);
    } else {
      return res.status(404).json({ message: 'Product not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart item' });
  }
};

// Remove a product from the cart
export const removeFromCart = async (req, res) => {
  const { productId } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex >= 0) {
      // If the product is found, remove it from the cart
      cart.items.splice(itemIndex, 1);
      await cart.save();
      res.json(cart);
    } else {
      return res.status(404).json({ message: 'Product not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart' });
  }
};
