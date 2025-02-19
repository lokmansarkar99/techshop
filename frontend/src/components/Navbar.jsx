import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiUser, FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    const role = localStorage.getItem("role");
    if (role === "admin") {
      navigate("/admin");
    } else if (role === "user") {
      navigate("/user");
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="bg-white shadow-md w-full sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-3">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-900">
          TechShop
        </Link>

        {/* Navigation Links - Hidden on mobile */}
        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/categories" className="hover:text-blue-600">Categories</Link>
          <Link to="/deals" className="hover:text-blue-600">Deals</Link>
          <Link to="/orders" className="hover:text-blue-600">Orders</Link>
        </nav>

        {/* Search Bar */}
        <div className="hidden sm:flex border rounded-md overflow-hidden w-48 md:w-64">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-2 outline-none w-full text-gray-700"
          />
          <button className="bg-blue-600 text-white px-3 py-2">Search</button>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <FiShoppingCart size={24} className="text-gray-700" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
              2
            </span>
          </Link>
          <button onClick={handleLoginClick}>
            <FiUser size={24} className="text-gray-700" />
          </button>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md absolute w-full p-4">
          <Link to="/" className="block py-2 hover:text-blue-600">Home</Link>
          <Link to="/categories" className="block py-2 hover:text-blue-600">Categories</Link>
          <Link to="/deals" className="block py-2 hover:text-blue-600">Deals</Link>
          <Link to="/orders" className="block py-2 hover:text-blue-600">Orders</Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
