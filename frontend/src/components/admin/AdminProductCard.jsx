import { FiEdit, FiTrash } from "react-icons/fi";

const AdminProductCard = ({ product, onDelete, onEdit }) => {
  const apiBaseUrl = import.meta.env.VITE_API_URL
  return (
    <div className="flex items-center p-4 bg-white shadow rounded-lg">
      <img
        src={`${apiBaseUrl}${product.image}`}
        alt={product.name}
        className="w-24 h-24 object-cover rounded-lg"
      />
      <div className="flex-1 ml-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600">${product.price}</p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={onEdit}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <FiEdit />
        </button>
        <button
          onClick={() => onDelete(product._id)}
          className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          <FiTrash />
        </button>
      </div>
    </div>
  );
};

export default AdminProductCard;
