import { useContext, useState } from "react";
import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

const DashboardLayout = () => {
  const { user, logOut } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
      await logOut();
      toast.success("Logged out!");
      navigate("/");
    } catch {
      toast.error("Logout failed!");
    }
  };

  const navItems = [
    { to: "/dashboard", label: "Overview", icon: "📊", end: true },
    { to: "/dashboard/add-pet", label: "Add Pet", icon: "➕" },
    { to: "/dashboard/my-listings", label: "My Listings", icon: "📋" },
    { to: "/dashboard/my-requests", label: "My Requests", icon: "📩" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-64" : "w-20"} bg-gray-900 text-white flex flex-col transition-all duration-300 relative flex-shrink-0`}>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-8 bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-lg z-10 hover:bg-orange-600">
          {sidebarOpen ? "◀" : "▶"}
        </button>

        {/* Logo */}
        <div className="px-4 py-5 border-b border-gray-700">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🐾</span>
            {sidebarOpen && (
              <span className="text-xl font-extrabold text-orange-400">
                Pet<span className="text-white">Adopt</span>
              </span>
            )}
          </Link>
        </div>

        {/* User Info */}
        {sidebarOpen ? (
          <div className="px-4 py-4 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <img
                src={user?.photoURL || "https://i.ibb.co/MBtjqXQ/no-avatar.png"}
                className="w-11 h-11 rounded-full border-2 border-orange-400 object-cover flex-shrink-0"
              />
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-white truncate">{user?.displayName || "User"}</p>
                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="px-3 py-4 border-b border-gray-700 flex justify-center">
            <img
              src={user?.photoURL || "https://i.ibb.co/MBtjqXQ/no-avatar.png"}
              className="w-10 h-10 rounded-full border-2 border-orange-400 object-cover"
            />
          </div>
        )}

        {/* Nav Links */}
        <nav className="flex flex-col gap-1 px-2 py-4 flex-grow">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-all
                ${isActive
                  ? "bg-orange-500 text-white font-semibold shadow-lg shadow-orange-500/20"
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"}`
              }>
              <span className="text-xl flex-shrink-0">{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-2 py-4 border-t border-gray-700 flex flex-col gap-1">
          <Link to="/"
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-gray-400 hover:bg-gray-700 hover:text-white transition-all">
            <span className="text-xl flex-shrink-0">🏠</span>
            {sidebarOpen && <span>Back to Home</span>}
          </Link>
          <button onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-red-400 hover:bg-red-900/40 hover:text-red-300 transition-all w-full">
            <span className="text-xl flex-shrink-0">🚪</span>
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-col flex-grow overflow-hidden">

        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-3">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-gray-400 hover:text-orange-500 transition-colors flex items-center gap-1">
                <span>🏠</span>
                <span>Home</span>
              </Link>
              <span className="text-gray-300">›</span>
              <span className="text-gray-700 font-semibold">Dashboard</span>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
              <span className="text-xl">🔔</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
            </button>

            {/* User Chip */}
            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5">
              <img
                src={user?.photoURL || "https://i.ibb.co/MBtjqXQ/no-avatar.png"}
                className="w-8 h-8 rounded-full object-cover border-2 border-orange-300"
              />
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-700 leading-tight">
                  {user?.displayName?.split(" ")[0]}
                </p>
                <p className="text-xs text-gray-400 leading-tight">Pet Owner</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-grow overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;