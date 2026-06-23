const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-orange-400 mb-3">🐾 PetAdopt</h2>
          <p className="text-gray-400 text-sm">
            Connecting loving homes with pets in need. Adopt, don't shop!
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <p className="text-gray-400 text-sm">📧 petadopt@gmail.com</p>
          <p className="text-gray-400 text-sm">📞 +880 1234-567890</p>
          <p className="text-gray-400 text-sm">📍 Dhaka, Bangladesh</p>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-orange-400 text-sm">Facebook</a>
            <a href="#" className="text-gray-400 hover:text-orange-400 text-sm">Instagram</a>
            <a href="#" className="text-gray-400 hover:text-orange-400 text-sm">Twitter</a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 text-center py-4">
        <p className="text-gray-500 text-sm">
          © 2026 PetAdopt. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;