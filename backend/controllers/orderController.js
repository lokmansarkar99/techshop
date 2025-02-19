import Order from '../models/orderModel.js';

// Create a new order (User)
export const createOrder = async (req, res) => {
  try {
    const { products } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: 'No products in order' });
    }

    const newOrder = await Order.create({
      userId: req.user._id,
      products,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error });
  }
};

// Get orders of logged-in user
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

// Get all orders (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

// Update order status (Admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.json({ message: 'Order updated successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order' });
  }
};

// Delete order (Admin)
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await order.deleteOne();
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete order' });
  }
};
