import Product from '../models/productModel.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import fs from 'fs'

// Create a new product (Admin only)
// export const createProduct = async (req, res) => {
//   try {
//     const { name, price, description, image } = req.body;
//     const newProduct = new Product({
//       name,
//       price,
//       description,
//       image
//     });

//     const product = await newProduct.save();
//     res.status(201).json(product);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to create product', error });
//   }
// };


export const createProduct = async (req, res) => {
  try {
    console.log("Received Data:", req.body);  // Check form fields
    console.log("Received File:", req.file);  // Check file field

    const { name, price, description } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    if (!name || !price || !description || !imagePath) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = new Product({
      name,
      price: Number(price),
      description,
      image: imagePath, // Store the file path in DB
    });

    const product = await newProduct.save();
    console.log("Saved Product:", product);
    res.status(201).json(product);
  } catch (error) {
    console.error("Database Save Error:", error);
    res.status(500).json({ message: "Failed to create product", error });
  }
};





// Get all products (Anyone can view)
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

// Get a single product by ID (Anyone can view)
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch product', error });
  }
};

// Update a product (Admin only)

// export const updateProduct = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });

//     if (!updatedProduct) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     res.json(updatedProduct);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to update product', error });
//   }
// };
export const updateProduct = async (req, res) => {
  const { id } = req.params;

  try {
    let updatedData = { ...req.body };

    if (req.file) {
      const imagePath = `/uploads/${req.file.filename}`;
      updatedData.image = imagePath;

      // পুরোনো ইমেজ ডিলিট করা হবে
      const product = await Product.findById(id);
      if (product && product.image) {
        const oldImagePath = `.${product.image}`;
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Failed to update product", error });
  }
};



// Delete a product (Admin only)
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error });
  }
};
