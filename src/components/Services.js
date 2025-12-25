// src/Services/emailservice.js

/**
 * Service d'envoi d'email via Formspree
 * 
 * CONFIGURATION :
 * 1. Créez un compte sur https://formspree.io
 * 2. Créez un nouveau formulaire
 * 3. Récupérez votre Form ID (ex: mblrpqzy)
 * 4. Remplacez "votre_form_id" ci-dessous par votre Form ID
 */

// Configuration Formspree
const FORMSPREE_FORM_ID = "votre_form_id"; // ← REMPLACEZ PAR VOTRE FORM ID

/**
 * Envoie un email via Formspree
 * @param {Object} formData - Les données du formulaire {nom, email, message, priorité}
 * @returns {Promise<Object>} - {success: boolean, message: string}
 */
export const sendEmail = async (formData) => {
  try {
    // Préparer les données pour Formspree
    const emailData = {
      name: formData.nom,
      email: formData.email,
      message: formData.message,
      priority: formData.priorité || "moyenne",
      _subject: `Nouveau message de ${formData.nom} - Priorité: ${formData.priorité || "moyenne"}`,
    };

    // Envoyer via Formspree
    const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(emailData),
    });

    // Vérifier la réponse
    if (response.ok) {
      const result = await response.json();
      console.log("✅ Email envoyé avec succès:", result);
      return { 
        success: true, 
        message: "Email envoyé avec succès !" 
      };
    } else {
      const error = await response.json();
      console.error("❌ Erreur Formspree:", error);
      return { 
        success: false, 
        message: error.error || "Erreur lors de l'envoi de l'email" 
      };
    }
  } catch (error) {
    console.error("❌ Erreur réseau:", error);
    return { 
      success: false, 
      message: "Erreur de connexion. Vérifiez votre connexion internet." 
    };
  }
};

/**
 * Valide le format d'email
 * @param {string} email 
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valide les données du formulaire
 * @param {Object} formData 
 * @returns {Object} {valid: boolean, errors: Array}
 */
export const validateFormData = (formData) => {
  const errors = [];

  if (!formData.nom || formData.nom.length < 3) {
    errors.push("Le nom doit contenir au moins 3 caractères");
  }

  if (!formData.email || !isValidEmail(formData.email)) {
    errors.push("Email invalide");
  }

  if (!formData.message || formData.message.length < 10) {
    errors.push("Le message doit contenir au moins 10 caractères");
  }

  return {
    valid: errors.length === 0,
    errors
  };
};