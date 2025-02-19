// models/cartModel.js
import mongoose from 'mongoose';

// Cart Item Schema (Product + Quantity)
const cartItemSchema = mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',  // Reference to Product model
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1, // Minimum quantity is 1
    },
  },
  { timestamps: true }
);

// Cart Schema (User + Cart Items)
const cartSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  // Reference to User model
      required: true,
    },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
