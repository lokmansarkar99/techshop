import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome to Admin Dashboard</h1>
      <Outlet /> {/* This will load AdminLayout */}
    </div>
  );
};

export default AdminDashboard;
