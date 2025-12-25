import { Routes, Route } from "react-router-dom";
import "./App.css";

// Layouts
import Layout from "./Pages/Layout";
import AdminLayout from "./components/Admin/AdminLayout";

// Protection
import ProtectedRoute from "./components/Admin/ProtectedRoute";
import AdminLogin from "./components/Admin/AdminLogin";

// Pages publiques
import Hero from "./components/Accueil/Hero";
import About from "./components/Accueil/About";
import Experience from "./components/Accueil/Experience";
import ContactForm from "./components/Formulaire/FormulaireG6";
import ProjectsList from "./Pages/ProjectsList";
import ProjectDetails from "./Pages/ProjectDetails";

// Admin
import AdminDashboard from "./components/Admin/Dashboard";
import ProjectsAdminPage from "./components/Admin/ProjectsAdminPage";
import AdminUsers from "./components/Admin/Users";
import AdminAnalytics from "./components/Admin/Statistics";
import AdminSettings from "./components/Admin/Settings";
import AdminFormSubmissions from "./components/Admin/AdminFormSubmissions";

function NotFound() {
  return <h1 style={{ padding: 40 }}>404 - Page non trouvée</h1>;
}

function App() {
  return (
    <Routes>

      {/* Public */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Hero />} />
        <Route path="about" element={<About />} />
        <Route path="experience" element={<Experience />} />
        <Route path="contact" element={<ContactForm />} />
        <Route path="projects" element={<ProjectsList />} />
        <Route path="projects/:id" element={<ProjectDetails />} />
      </Route>

      {/* Login admin */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin protégé */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="projects" element={<ProjectsAdminPage />} />
        <Route path="forms" element={<AdminFormSubmissions />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;
