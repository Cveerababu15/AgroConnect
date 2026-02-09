import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaLeaf, FaSignOutAlt, FaUserCircle, FaHome, FaSignInAlt, FaUserPlus, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
    setIsMenuOpen(false);
  };

  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-green-100 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group" onClick={closeMenu}>
            <FaLeaf className="text-2xl text-green-600 group-hover:rotate-12 transition-transform" />
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              AgroConnect
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive("/") ? "text-green-600 bg-green-50" : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                }`}
            >
              <FaHome />
              <span>Home</span>
            </Link>

            {!token ? (
              <>
                <Link
                  to="/login"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive("/login") ? "text-green-600 bg-green-50" : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                    }`}
                >
                  <FaSignInAlt />
                  <span>Login</span>
                </Link>
                <Link
                  to="/signup"
                  className={`flex items-center space-x-1 px-4 py-2 rounded-full text-sm font-medium transition-all ${isActive("/signup")
                      ? "bg-green-600 text-white shadow-lg shadow-green-200"
                      : "bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg shadow-green-100"
                    }`}
                >
                  <FaUserPlus />
                  <span>Sign Up</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={`/${role}`}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(`/${role}`) ? "text-green-600 bg-green-50" : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                    }`}
                >
                  <FaUserCircle />
                  <span className="capitalize">{role} Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-green-600 p-2 focus:outline-none"
            >
              {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full left-0 animate-fadeIn">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link
              to="/"
              onClick={closeMenu}
              className={`block px-3 py-3 rounded-md text-base font-medium ${isActive("/") ? "text-green-600 bg-green-50" : "text-gray-600 hover:bg-gray-50"
                }`}
            >
              <div className="flex items-center space-x-3">
                <FaHome />
                <span>Home</span>
              </div>
            </Link>

            {!token ? (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className={`block px-3 py-3 rounded-md text-base font-medium ${isActive("/login") ? "text-green-600 bg-green-50" : "text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  <div className="flex items-center space-x-3">
                    <FaSignInAlt />
                    <span>Login</span>
                  </div>
                </Link>
                <Link
                  to="/signup"
                  onClick={closeMenu}
                  className={`block px-3 py-3 rounded-md text-base font-medium ${isActive("/signup") ? "text-green-600 bg-green-50" : "text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  <div className="flex items-center space-x-3">
                    <FaUserPlus />
                    <span>Sign Up</span>
                  </div>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={`/${role}`}
                  onClick={closeMenu}
                  className={`block px-3 py-3 rounded-md text-base font-medium ${isActive(`/${role}`) ? "text-green-600 bg-green-50" : "text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  <div className="flex items-center space-x-3">
                    <FaUserCircle />
                    <span className="capitalize">{role} Dashboard</span>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-3 rounded-md text-base font-medium text-red-600 hover:bg-red-50 flex items-center space-x-3"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
