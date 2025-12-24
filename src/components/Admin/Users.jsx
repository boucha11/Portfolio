// src/pages/Admin/Users.jsx
import React, { useState, useEffect } from "react";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", role: "" });
  const [searchTerm, setSearchTerm] = useState("");

  // Charger les utilisateurs depuis localhost:4000/users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:4000/users");
        if (!res.ok) throw new Error("Erreur lors du chargement des utilisateurs");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
        setUsers([]);
      }
    };
    fetchUsers();
  }, []);

  // Filtrer les utilisateurs selon le champ recherche
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Commencer à éditer un utilisateur
  const startEdit = (user) => {
    setEditingUserId(user.id);
    setFormData({ name: user.name, email: user.email, role: user.role });
  };

  // Annuler l'édition
  const cancelEdit = () => {
    setEditingUserId(null);
    setFormData({ name: "", email: "", role: "" });
  };

  // Sauvegarder les modifications
  const saveEdit = async (userId) => {
    try {
      const res = await fetch(`http://localhost:4000/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const updatedUser = await res.json();
      setUsers(users.map((u) => (u.id === userId ? updatedUser : u)));
      cancelEdit();
    } catch (err) {
      console.error(err);
    }
  };

  // Supprimer un utilisateur
  const handleDelete = async (userId) => {
    if (!window.confirm("Supprimer cet utilisateur ?")) return;

    try {
      await fetch(`http://localhost:4000/users/${userId}`, { method: "DELETE" });
      setUsers(users.filter((u) => u.id !== userId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Gestion des Utilisateurs</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-lg w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rôle</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingUserId === user.id ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="border px-2 py-1 rounded"
                    />
                  ) : (
                    user.name
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {editingUserId === user.id ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="border px-2 py-1 rounded"
                    />
                  ) : (
                    user.email
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {editingUserId === user.id ? (
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="border px-2 py-1 rounded"
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {user.role}
                    </span>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  {editingUserId === user.id ? (
                    <>
                      <button
                        onClick={() => saveEdit(user.id)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Sauvegarder
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Annuler
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(user)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Supprimer
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}

            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-6 text-center text-gray-500">
                  Aucun utilisateur trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
