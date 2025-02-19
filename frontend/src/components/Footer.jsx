const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      {/* Top Section with Menus */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {/* Customer Service */}
        <div>
          <h4 className="text-white font-semibold mb-3">Customer Service</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-400">Help Center</a></li>
            <li><a href="#" className="hover:text-gray-400">Order Tracking</a></li>
            <li><a href="#" className="hover:text-gray-400">Returns & Refunds</a></li>
            <li><a href="#" className="hover:text-gray-400">Shipping Info</a></li>
          </ul>
        </div>

        {/* Company Info */}
        <div>
          <h4 className="text-white font-semibold mb-3">Company</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-400">About Us</a></li>
            <li><a href="#" className="hover:text-gray-400">Careers</a></li>
            <li><a href="#" className="hover:text-gray-400">Press & Media</a></li>
            <li><a href="#" className="hover:text-gray-400">Investor Relations</a></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-400">Best Sellers</a></li>
            <li><a href="#" className="hover:text-gray-400">New Arrivals</a></li>
            <li><a href="#" className="hover:text-gray-400">Gift Cards</a></li>
            <li><a href="#" className="hover:text-gray-400">Affiliate Program</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-white font-semibold mb-3">Follow Us</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-400">Facebook</a></li>
            <li><a href="#" className="hover:text-gray-400">Instagram</a></li>
            <li><a href="#" className="hover:text-gray-400">Twitter</a></li>
            <li><a href="#" className="hover:text-gray-400">YouTube</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 text-center py-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} TechShop. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
