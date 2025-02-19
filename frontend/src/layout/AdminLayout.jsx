import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      navigate("/login"); // Redirect to login if no token or not an admin
    }
  }, [navigate]);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove authentication token
    localStorage.removeItem("role"); // Remove role
    navigate("/login"); // Redirect to Login page
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-5 flex flex-col justify-between">
        <div>
          <Link to="/admin">
            <h2 className="text-xl font-bold mb-5">Admin Panel</h2>
          </Link>
          <nav className="space-y-2">
            <NavLink
              to="users"
              className={({ isActive }) =>
                `block p-2 rounded ${isActive ? "bg-gray-600" : "hover:bg-gray-700"}`
              }
            >
              Users
            </NavLink>

            {/* Products Section with Submenu */}
            <div>
              <button
                onClick={() => setIsProductMenuOpen(!isProductMenuOpen)}
                className="block w-full text-left p-2 rounded hover:bg-gray-700"
              >
                Products
              </button>
              {isProductMenuOpen && (
                <div className="ml-4 space-y-1">
                  <NavLink
                    to="products"
                    className={({ isActive }) =>
                      `block p-2 rounded ${isActive ? "bg-gray-600" : "hover:bg-gray-700"}`
                    }
                  >
                    All Products
                  </NavLink>
                  <NavLink
                    to="products/add"
                    className={({ isActive }) =>
                      `block p-2 rounded ${isActive ? "bg-gray-600" : "hover:bg-gray-700"}`
                    }
                  >
                    Add Product
                  </NavLink>
                </div>
              )}
            </div>

            <NavLink
              to="orders"
              className={({ isActive }) =>
                `block p-2 rounded ${isActive ? "bg-gray-600" : "hover:bg-gray-700"}`
              }
            >
              Orders
            </NavLink>
          </nav>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-5 p-2 bg-red-500 hover:bg-red-600 text-white rounded"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-5 bg-gray-100">
        <Outlet /> {/* This will render Users, Products, or Orders */}
      </main>
    </div>
  );
};

export default AdminLayout;
