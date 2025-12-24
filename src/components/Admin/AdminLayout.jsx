import React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaCog,
  FaChartBar,
  FaSignOutAlt,
  FaProjectDiagram,
  FaFileAlt,
} from "react-icons/fa";

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Lien actif
  const isActive = (path) =>
    location.pathname === path ? "bg-gray-800" : "";

  // Logout réel
  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
        </div>

        <nav className="mt-6 flex-1 flex flex-col">
          <Link
            to="/admin"
            className={`flex items-center gap-3 px-6 py-3 hover:bg-gray-800 transition ${isActive(
              "/admin"
            )}`}
          >
            <FaHome />
            Dashboard
          </Link>

          <Link
            to="/admin/projects"
            className={`flex items-center gap-3 px-6 py-3 hover:bg-gray-800 transition ${isActive(
              "/admin/projects"
            )}`}
          >
            <FaProjectDiagram />
            Projets
          </Link>

          <Link
            to="/admin/users"
            className={`flex items-center gap-3 px-6 py-3 hover:bg-gray-800 transition ${isActive(
              "/admin/users"
            )}`}
          >
            <FaUsers />
            Utilisateurs
          </Link>

          <Link
            to="/admin/forms"
            className={`flex items-center gap-3 px-6 py-3 hover:bg-gray-800 transition ${isActive(
              "/admin/forms"
            )}`}
          >
            <FaFileAlt />
            Formulaires
          </Link>

          <Link
            to="/admin/analytics"
            className={`flex items-center gap-3 px-6 py-3 hover:bg-gray-800 transition ${isActive(
              "/admin/analytics"
            )}`}
          >
            <FaChartBar />
            Statistiques
          </Link>

          <Link
            to="/admin/settings"
            className={`flex items-center gap-3 px-6 py-3 hover:bg-gray-800 transition ${isActive(
              "/admin/settings"
            )}`}
          >
            <FaCog />
            Paramètres
          </Link>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-6 py-3 mt-auto hover:bg-red-600 transition text-left"
          >
            <FaSignOutAlt />
            Déconnexion
          </button>
        </nav>
      </aside>

      {/* CONTENU */}
      <main className="flex-1 p-8 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}

