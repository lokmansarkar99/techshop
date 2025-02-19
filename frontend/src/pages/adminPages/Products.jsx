import { useEffect, useState } from "react";
import { getAllProducts, deleteProduct } from "../../api/productApi";
import AdminProductCard from "../../components/admin/AdminProductCard";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id, token);
        setProducts(products.filter((product) => product._id !== id));
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="space-y-4">
        {products.length > 0 ? (
          products.map((product) => (
            <AdminProductCard
              key={product._id}
              product={product}
              onDelete={handleDelete}
              onEdit={() => navigate(`/admin/products/edit/${product._id}`)}
            />
          ))
        ) : (
          <p className="text-gray-600">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
