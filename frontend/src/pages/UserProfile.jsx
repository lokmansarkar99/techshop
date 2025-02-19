import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiUser, FiMail, FiLock, FiLogOut } from "react-icons/fi";

const UserProfile = () => {
  const api = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(`${api}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data);
        setName(data.name);
        setEmail(data.email);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate, api]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${api}/users/update`,
        { name, email, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update profile.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  if (!user) return <p className="text-center mt-20 text-lg text-gray-600">Loading...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        {/* Profile Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 bg-blue-500 text-white flex items-center justify-center rounded-full text-3xl font-bold">
              {name.charAt(0).toUpperCase()}
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
          <p className="text-gray-500 text-sm">{user.role === "admin" ? "Admin" : "User"}</p>
        </div>

        {/* Profile Update Form */}
        <form onSubmit={handleUpdate} className="mt-6 space-y-4">
          <div className="relative">
            <FiUser className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Name"
              className="w-full px-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type="password"
              placeholder="New Password"
              className="w-full px-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {message && <p className="text-green-600 text-sm text-center">{message}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Update Profile
          </button>
        </form>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full mt-4 flex items-center justify-center bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
        >
          <FiLogOut className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
