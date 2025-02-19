import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../../api/productApi";

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(productId);
        setProduct({
          name: data.name,
          price: data.price,
          image: data.image,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await updateProduct(productId, product, token);
      setMessage("Product updated successfully!");
      setTimeout(() => navigate("/admin/products"), 1500);
    } catch (error) {
      setMessage("Failed to update product.");
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md">
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price ($)</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Update Product
        </button>
        {message && <p className="text-green-600 text-sm text-center mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default EditProduct;
