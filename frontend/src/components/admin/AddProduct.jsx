import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../api/productApi";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); // Store actual file
  const [preview, setPreview] = useState(null); // Image preview
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the actual file
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Generate preview
    }
  };

  // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
    
//     if (!token) {
//       setError("Unauthorized: Please login as admin");
//       return;
//     }

//     if (!image) {
//       setError("Please select an image.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("price", price);
//       formData.append("description", description);
//       formData.append("image", image); // Append file

//       const res = await createProduct(formData, token);
//       console.log("Product Created:", res);

//       navigate("/admin/products"); // Redirect after success
//     } catch (error) {
//       setError(error.response?.data?.message || "Failed to create product");
//     } finally {
//       setLoading(false);
//     }
//   };

const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
  
    if (!token) {
      setError("Unauthorized: Please login as admin");
      return;
    }
  
    if (!image) {
      setError("Please select an image.");
      return;
    }
  
    setLoading(true);
  
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("image", image); // Use the File object
  
      const res = await createProduct(formData, token);
      console.log("Product Created:", res);
  
      navigate("/admin/products");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Product Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Image</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={handleImageChange} 
            className="w-full p-2 border rounded"
            required
          />
          {preview && (
            <img 
              src={preview} 
              alt="Preview" 
              className="mt-2 w-32 h-32 object-cover rounded shadow-md"
            />
          )}
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
