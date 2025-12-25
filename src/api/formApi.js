// src/api/formApi.js

/**
 * API pour gérer les soumissions de formulaires
 * Utilise MockAPI pour stocker les données
 */

const API_URL = "https://694be681da5ddabf00358f9d.mockapi.io";

/**
 * Créer une nouvelle soumission de formulaire
 * @param {Object} formData - Les données du formulaire
 * @returns {Promise<Object>} - La réponse de l'API
 */
export const createFormSubmission = async (formData) => {
  try {
    const submissionData = {
      nom: formData.nom,
      email: formData.email,
      message: formData.message,
      priorité: formData.priorité || "moyenne",
      status: formData.status || "new", // new | in-progress | done
      createdAt: formData.createdAt || new Date().toISOString(),
    };

    const response = await fetch(`${API_URL}/form-submissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionData),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ Soumission créée:", data);
    return data;
  } catch (error) {
    console.error("❌ Erreur createFormSubmission:", error);
    // Ne pas faire échouer le formulaire si MockAPI ne répond pas
    console.warn("⚠️ La soumission n'a pas été sauvegardée dans MockAPI, mais l'email a été envoyé");
    return null;
  }
};

/**
 * Récupérer toutes les soumissions de formulaires
 * @returns {Promise<Array>} - Liste des soumissions
 */
export const getFormSubmissions = async () => {
  try {
    const response = await fetch(`${API_URL}/form-submissions`);
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ Erreur getFormSubmissions:", error);
    throw error;
  }
};

/**
 * Récupérer une soumission par ID
 * @param {string} id - L'ID de la soumission
 * @returns {Promise<Object>}
 */
export const getFormSubmissionById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/form-submissions/${id}`);
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ Erreur getFormSubmissionById:", error);
    throw error;
  }
};

/**
 * Mettre à jour le statut d'une soumission
 * @param {string} id - L'ID de la soumission
 * @param {string} status - Le nouveau statut (new, in-progress, done)
 * @returns {Promise<Object>}
 */
export const updateFormStatus = async (id, status) => {
  try {
    const response = await fetch(`${API_URL}/form-submissions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ Statut mis à jour:", data);
    return data;
  } catch (error) {
    console.error("❌ Erreur updateFormStatus:", error);
    throw error;
  }
};

/**
 * Mettre à jour une soumission complète
 * @param {string} id - L'ID de la soumission
 * @param {Object} updates - Les champs à mettre à jour
 * @returns {Promise<Object>}
 */
export const updateFormSubmission = async (id, updates) => {
  try {
    const response = await fetch(`${API_URL}/form-submissions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ Soumission mise à jour:", data);
    return data;
  } catch (error) {
    console.error("❌ Erreur updateFormSubmission:", error);
    throw error;
  }
};

/**
 * Supprimer une soumission
 * @param {string} id - L'ID de la soumission
 * @returns {Promise<Object>}
 */
export const deleteFormSubmission = async (id) => {
  try {
    const response = await fetch(`${API_URL}/form-submissions/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ Soumission supprimée:", data);
    return data;
  } catch (error) {
    console.error("❌ Erreur deleteFormSubmission:", error);
    throw error;
  }
};

/**
 * Compter le nombre de soumissions par statut
 * @returns {Promise<Object>} - {new: number, inProgress: number, done: number, total: number}
 */
export const getFormSubmissionsStats = async () => {
  try {
    const submissions = await getFormSubmissions();
    
    const stats = {
      new: submissions.filter(s => s.status === "new").length,
      inProgress: submissions.filter(s => s.status === "in-progress").length,
      done: submissions.filter(s => s.status === "done").length,
      total: submissions.length
    };

    return stats;
  } catch (error) {
    console.error("❌ Erreur getFormSubmissionsStats:", error);
    throw error;
  }
};