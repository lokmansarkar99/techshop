import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { _id, name, price, description, image } = product
  const apiBaseUrl = import.meta.env.VITE_API_URL;
  return (
    <div className="relative group bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition duration-300">
      {/* Product Image */}
      <div className="relative">
        <img
          src={`${apiBaseUrl}${image}`}
          alt={name}
          className="w-full h-48 object-cover"
        />
        {/* Hover Effect - View Details Button */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-80 transition-opacity duration-300">
          <Link
            to={`/product/${_id}`}
            className="bg-white text-black px-4 py-2 rounded-md font-semibold shadow hover:bg-gray-200 transition"
          >
            View Details
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
       <Link to={`/product/${_id}`} >
       <h2 className="text-lg font-semibold text-gray-900 truncate">{name}</h2>
       </Link>
        <p className="text-sm text-gray-600 truncate">{description}</p>
        <h3 className="text-xl font-bold text-blue-600 mt-2">${price}</h3>

        {/* Add to Cart Button */}
        <button className="w-full mt-3 bg-yellow-500 text-white py-2 rounded-md font-semibold hover:bg-yellow-600 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
