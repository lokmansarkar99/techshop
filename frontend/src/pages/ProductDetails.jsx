import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductDetails = () => {
 const apiBaseUrl = import.meta.env.VITE_API_URL

  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const api = import.meta.env.VITE_API_URL; // API URL from .env

  // const  {name, price, description, image} = product

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${api}/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center text-lg font-semibold py-10">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center text-lg font-semibold py-10">Product not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={`${apiBaseUrl}${product.image}`}
            alt={product.name}
            className="w-full max-w-sm rounded-lg shadow-lg object-cover"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">{product.name}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <h2 className="text-2xl font-bold text-blue-600 mt-4">${product.price}</h2>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button className="w-full sm:w-auto bg-yellow-500 text-white py-3 px-6 rounded-md font-semibold hover:bg-yellow-600 transition">
              Add to Cart
            </button>
            <button className="w-full sm:w-auto bg-orange-500 text-white py-3 px-6 rounded-md font-semibold hover:bg-orange-600 transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
