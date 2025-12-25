import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, ResponsiveContainer } from "recharts";
import { Users, FolderKanban, TrendingUp, Activity } from "lucide-react";

const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#3b82f6"];

const Statistics = () => {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("https://694d6da7ad0f8c8e6e20aaf2.mockapi.io/utilisateur")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(() => setUsers([]));
  }, []);

  useEffect(() => {
    fetch("https://694be681da5ddabf00358f9d.mockapi.io/projet")
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(() => setProjects([]));
  }, []);

  // Statistiques rôles utilisateurs
  const userRolesData = Object.values(
    users.reduce((acc, user) => {
      acc[user.role] = acc[user.role] || { name: user.role, value: 0 };
      acc[user.role].value += 1;
      return acc;
    }, {})
  );

  // Statistiques statuts projets
  const projectStatusData = Object.values(
    projects.reduce((acc, project) => {
      const status = project.status || "draft";
      acc[status] = acc[status] || { name: status, value: 0 };
      acc[status].value += 1;
      return acc;
    }, {})
  );

  // Nouvelle statistique: Projets par utilisateur
  const projectsByUser = Object.values(
    projects.reduce((acc, project) => {
      const userId = project.userId || "Inconnu";
      const user = users.find(u => u.id === userId);
      const userName = user ? user.nom : `User ${userId}`;
      acc[userName] = acc[userName] || { name: userName, projets: 0 };
      acc[userName].projets += 1;
      return acc;
    }, {})
  ).sort((a, b) => b.projets - a.projets).slice(0, 5);

  // Nouvelle statistique: Activité simulée (projets créés par mois)
  const monthlyActivity = [
    { mois: "Août", projets: Math.floor(projects.length * 0.15) },
    { mois: "Sept", projets: Math.floor(projects.length * 0.20) },
    { mois: "Oct", projets: Math.floor(projects.length * 0.25) },
    { mois: "Nov", projets: Math.floor(projects.length * 0.20) },
    { mois: "Déc", projets: Math.floor(projects.length * 0.20) }
  ];

  // Calculs supplémentaires
  const completedProjects = projects.filter(p => p.status === "completed").length;
  const activeProjects = projects.filter(p => p.status === "in-progress").length;
  const completionRate = projects.length > 0 ? ((completedProjects / projects.length) * 100).toFixed(1) : 0;

  const StatCard = ({ icon: Icon, title, value, subtitle, gradient }) => (
    <div className={`bg-gradient-to-br ${gradient} p-6 rounded-2xl shadow-lg text-white transform hover:scale-105 transition-transform duration-200`}>
      <div className="flex items-center justify-between mb-4">
        <Icon className="w-8 h-8 opacity-80" />
        <span className="text-3xl font-bold">{value}</span>
      </div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm opacity-90">{subtitle}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Tableau de bord</h1>
          <p className="text-gray-600">Vue d'ensemble de vos statistiques et performances</p>
        </div>

        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Users}
            title="Utilisateurs"
            value={users.length}
            subtitle="Total des utilisateurs"
            gradient="from-blue-500 to-blue-600"
          />
          <StatCard
            icon={FolderKanban}
            title="Projets"
            value={projects.length}
            subtitle="Total des projets"
            gradient="from-purple-500 to-purple-600"
          />
          <StatCard
            icon={TrendingUp}
            title="Taux de réussite"
            value={`${completionRate}%`}
            subtitle="Projets terminés"
            gradient="from-green-500 to-green-600"
          />
          <StatCard
            icon={Activity}
            title="En cours"
            value={activeProjects}
            subtitle="Projets actifs"
            gradient="from-orange-500 to-orange-600"
          />
        </div>

        {/* Graphiques principaux */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Utilisateurs par rôle */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Répartition des rôles</h2>
            <p className="text-gray-500 text-sm mb-6">Distribution des utilisateurs par rôle</p>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userRolesData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {userRolesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Statuts des projets */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Statuts des projets</h2>
            <p className="text-gray-500 text-sm mb-6">État d'avancement des projets</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={projectStatusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis allowDecimals={false} stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Bar dataKey="value" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Graphiques secondaires */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top contributeurs */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Top contributeurs</h2>
            <p className="text-gray-500 text-sm mb-6">Utilisateurs avec le plus de projets</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={projectsByUser} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" allowDecimals={false} stroke="#6b7280" />
                <YAxis dataKey="name" type="category" width={100} stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Bar dataKey="projets" fill="#10b981" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Activité mensuelle */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Activité mensuelle</h2>
            <p className="text-gray-500 text-sm mb-6">Évolution des projets créés</p>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="mois" stroke="#6b7280" />
                <YAxis allowDecimals={false} stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="projets" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;