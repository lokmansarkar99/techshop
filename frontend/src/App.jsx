import { RouterProvider, createBrowserRouter} from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLayout from "./layout/adminLayout";
import NotFound from "./pages/NotFound";
import UserProfile from './pages/UserProfile';
import Users from "./pages/adminPages/Users";
import Products from "./pages/adminPages/Products";
import AdminDashboard from "./pages/adminPages/AdminDashboard";
import EditProduct from "./pages/adminPages/EditProduct";
import AddProduct from "./components/admin/AddProduct";


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <AppLayout />, // Layout with Navbar & Footer
//     children: [
//       { path: "/", element: <Home /> },
//       { path: "/product/:id", element: <ProductDetails /> },
//       { path: "/cart", element: <Cart /> },
//       { path: "/checkout", element: <Checkout /> },
//       { path: "/orders", element: <Orders /> }, // Protected Route
//       { path: "/login", element: <Login /> },
//       { path: "/register", element: <Register /> },
     
//       {path: "/user" , element: <UserProfile />},
//       { path: "*", element: <NotFound /> }, // 404 Page
//     ],
//   },
//   {
//     path: "/admin",
//     element: <AdminDashboard />,
//     children: [
//       {path: "users", element: <Users /> },
//       {path: "products", element: <Products />},
//       {path: "orders", element: <Orders />}
//     ]
//   }

  
// ]);


const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />, // Layout with Navbar & Footer
    children: [
      { path: "/", element: <Home /> },
      { path: "/product/:id", element: <ProductDetails /> },
      { path: "/cart", element: <Cart /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/orders", element: <Orders /> }, // Protected Route
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Register /> },
      { path: "/user", element: <UserProfile /> },
      { path: "*", element: <NotFound /> }, // 404 Page
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {path: "", element: <AdminDashboard />},
      { path: "users", element: <Users/> }, // ✅ Relative Path (Not "/users")
      { path: "products", element: <Products /> }, // ✅ Relative Path
      { path: "products/add", element: <AddProduct /> },
      {path: "products/edit/:productId", element: <EditProduct />},
      { path: "orders", element: <Orders /> }, // ✅ Relative Path
    ],
  },
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
