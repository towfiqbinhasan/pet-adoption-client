import { useContext, useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { useTheme } from "../contexts/ThemeProvider";
const Navbar = () => {
  const { darkMode, toggleTheme } = useTheme();
  const { user, logOut } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/logout`, {}, { withCredentials: true });
      await logOut();
      toast.success("Logged out successfully!");
      setDropdownOpen(false);
      setMenuOpen(false);
    } catch {
      toast.error("Logout failed!");
    }
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-orange-500 font-semibold border-b-2 border-orange-500 pb-0.5"
      : "text-gray-600 hover:text-orange-500 font-medium transition-colors";

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-3xl">🐾</span>
          <span className="text-2xl font-extrabold text-orange-500 tracking-tight">
            Pet<span className="text-gray-800">Adopt</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          <li><NavLink to="/" end className={linkClass}>Home</NavLink></li>
          <li><NavLink to="/all-pets" className={linkClass}>All Pets</NavLink></li>
          {user && (
            <>
              <li><NavLink to="/dashboard/my-requests" className={linkClass}>My Requests</NavLink></li>
              <li><NavLink to="/dashboard/add-pet" className={linkClass}>Add Pet</NavLink></li>
            </>
          )}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-3 py-1.5 hover:bg-orange-100 transition-all">
                <img
                  src={user.photoURL || "https://i.ibb.co/MBtjqXQ/no-avatar.png"}
                  alt="profile"
                  className="w-8 h-8 rounded-full object-cover border-2 border-orange-400"
                />
                <span className="text-sm font-semibold text-gray-700 hidden sm:block max-w-[100px] truncate">
                  {user.displayName?.split(" ")[0]}
                </span>
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-60 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                  {/* User Info Header */}
                  <div className="bg-gradient-to-r from-orange-500 to-orange-400 px-4 py-4 flex items-center gap-3">
                    <img
                      src={user.photoURL || "https://i.ibb.co/MBtjqXQ/no-avatar.png"}
                      className="w-12 h-12 rounded-full border-2 border-white object-cover"
                    />
                    <div className="overflow-hidden">
                      <p className="font-bold text-white text-sm truncate">{user.displayName}</p>
                      <p className="text-orange-100 text-xs truncate">{user.email}</p>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <Link to="/dashboard" onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-orange-50 hover:text-orange-500 text-sm transition-colors">
                      <span className="text-lg">📊</span>
                      <span>Dashboard Overview</span>
                    </Link>
                    <Link to="/dashboard/my-listings" onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-orange-50 hover:text-orange-500 text-sm transition-colors">
                      <span className="text-lg">📋</span>
                      <span>My Listings</span>
                    </Link>
                    <Link to="/dashboard/my-requests" onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-orange-50 hover:text-orange-500 text-sm transition-colors">
                      <span className="text-lg">📩</span>
                      <span>My Requests</span>
                    </Link>
                    <Link to="/dashboard/add-pet" onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-orange-50 hover:text-orange-500 text-sm transition-colors">
                      <span className="text-lg">➕</span>
                      <span>Add Pet</span>
                    </Link>
                  </div>

                  {/* Logout */}
                  <div className="border-t border-gray-100 py-2">
                    <button onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-red-500 hover:bg-red-50 text-sm transition-colors">
                      <span className="text-lg">🚪</span>
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login"
                className="text-orange-500 font-semibold hover:underline text-sm hidden sm:block">
                Login
              </Link>
              <Link to="/register"
                className="bg-orange-500 text-white px-5 py-2 rounded-full hover:bg-orange-600 font-semibold text-sm transition-colors shadow-sm">
                Get Started
              </Link>
            </div>
          )}
<button
  onClick={toggleTheme}
  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
>
  {darkMode ? "☀️" : "🌙"}
</button>
          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 shadow-lg">
          <ul className="flex flex-col gap-3">
            <li>
              <NavLink to="/" end className={linkClass} onClick={() => setMenuOpen(false)}>
                🏠 Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/all-pets" className={linkClass} onClick={() => setMenuOpen(false)}>
                🐾 All Pets
              </NavLink>
            </li>
            {user && (
              <>
                <li>
                  <NavLink to="/dashboard/my-requests" className={linkClass} onClick={() => setMenuOpen(false)}>
                    📩 My Requests
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/add-pet" className={linkClass} onClick={() => setMenuOpen(false)}>
                    ➕ Add Pet
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard" className={linkClass} onClick={() => setMenuOpen(false)}>
                    📊 Dashboard
                  </NavLink>
                </li>
                <li>
                  <button onClick={handleLogout} className="text-red-500 font-medium text-sm">
                    🚪 Logout
                  </button>
                </li>
              </>
            )}
            {!user && (
              <li>
                <NavLink to="/login" className={linkClass} onClick={() => setMenuOpen(false)}>
                  🔑 Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;