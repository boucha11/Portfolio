// src/pages/Admin/Statistics.jsx
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Statistics = () => {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  // Charger utilisateurs
  useEffect(() => {
    fetch("http://localhost:4000/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(() => setUsers([]));
  }, []);

  // Charger projets
  useEffect(() => {
    fetch("http://localhost:4000/projects")
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(() => setProjects([]));
  }, []);

  // Préparer les données pour le graphique des rôles utilisateurs
  const userRolesData = Object.values(
    users.reduce((acc, user) => {
      acc[user.role] = acc[user.role] || { name: user.role, value: 0 };
      acc[user.role].value += 1;
      return acc;
    }, {})
  );

  // Préparer les données pour le graphique des statuts projets
  const projectStatusData = Object.values(
    projects.reduce((acc, project) => {
      const status = project.status || "draft";
      acc[status] = acc[status] || { name: status, value: 0 };
      acc[status].value += 1;
      return acc;
    }, {})
  );

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Statistiques</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Utilisateurs */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Utilisateurs</h2>
          <p className="mb-4">Total utilisateurs : {users.length}</p>
          <PieChart width={300} height={250}>
            <Pie
              data={userRolesData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {userRolesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* Projets */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Projets</h2>
          <p className="mb-4">Total projets : {projects.length}</p>
          <BarChart width={300} height={250} data={projectStatusData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
