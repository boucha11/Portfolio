import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* LEFT */}
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-indigo-600">
            Mohamed Yessin Bouchaala
          </span>
        </p>

        {/* LINKS */}
        <div className="flex gap-6 text-sm font-medium">
          <Link to="/about" className="text-gray-500 hover:text-indigo-600">
            À propos
          </Link>
          <Link to="/experience" className="text-gray-500 hover:text-indigo-600">
            Expérience
          </Link>
          <Link to="/projects" className="text-gray-500 hover:text-indigo-600">
            Projets
          </Link>
          <Link to="/contact" className="text-gray-500 hover:text-indigo-600">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
