import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import profilePhoto from "../../assets/profile.png"; // Assurez-vous que le chemin de l'image est correct

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Accueil", path: "/" },
    { name: "À propos", path: "/about" },
    { name: "Projets", path: "/projects" },
    { name: "Expérience", path: "/experience" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 text-white/90 backdrop-blur border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex h-16 items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white font-bold text-xl flex items-center justify-center shadow-lg">
              MYB
            </div>
            <span className="hidden md:block text-xl font-semibold text-gray-100">
              Mohamed Yessin Bouchaala
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `relative text-lg font-medium transition-all duration-200
                  ${isActive ? "text-yellow-500" : "text-gray-300 hover:text-yellow-400"}`
                }
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-yellow-500 transition-all duration-300 group-hover:w-full" />
              </NavLink>
            ))}
          </div>

          {/* PROFILE */}
          <div className="hidden md:flex items-center gap-3">
            <img
              src={profilePhoto}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-yellow-500"
            />
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-gray-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-6 py-4 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block text-lg font-medium text-gray-300 hover:text-yellow-500 transition duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
