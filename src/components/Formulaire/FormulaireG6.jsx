import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaCommentDots, FaCheckCircle, FaPaperPlane, FaExclamationTriangle } from 'react-icons/fa';
import { sendEmail } from '../../Services/emailservice';

const ContactForm = () => {
  const [formValid, setFormValid] = useState({
    nom: false,
    email: false,
    message: false,
    priorité: true,
    send: false,
    sended: false,
    sending: false
  });

  const errorMessage = {
    nom: "Le nom doit contenir au moins 3 caractères",
    email: "Merci d'entrer un email valide",
    message: "Le message doit contenir au moins 10 caractères"
  };

  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    message: "",
    priorité: "moyenne",
  });

  const [touched, setTouched] = useState({
    nom: false,
    email: false,
    message: false
  });

  const verificationFormulaire = () => {
    const newValidState = {
      nom: formData.nom.length > 3,
      email: formData.email.includes('@') && formData.email.includes('.'),
      message: formData.message.length > 10,
      priorité: true,
    };

    const allValid = newValidState.nom && newValidState.email && newValidState.message;

    setFormValid({
      ...formValid,
      ...newValidState,
      send: allValid
    });

    return allValid;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    // Validation en temps réel après la première interaction
    if (touched[e.target.name]) {
      setTimeout(() => verificationFormulaire(), 100);
    }
  };

  const handleBlur = (fieldName) => {
    setTouched({ ...touched, [fieldName]: true });
    verificationFormulaire();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!verificationFormulaire()) {
      return;
    }
    await createFormSubmission({
...formData,
createdAt: new Date().toISOString(),
status: 'new' // new | in-progress | done
});

    setFormValid({ ...formValid, sending: true });

    try {
      // Simulation d'envoi d'email
       const result = await sendEmail(formData);
      
      // Simuler un délai d'envoi
      await new Promise(resolve => setTimeout(resolve, 2000));
console.log("Resultat : ", result);
      console.log("Formulaire soumis : ", formData);
      
      setFormValid({ ...formValid, sended: true, sending: false });
      
      // Réinitialiser le formulaire
      setFormData({
        nom: "",
        email: "",
        message: "",
        priorité: "moyenne",
      });
      
      setTouched({
        nom: false,
        email: false,
        message: false
      });

      // Masquer le message de succès après 5 secondes
      setTimeout(() => {
        setFormValid({
          nom: false,
          email: false,
          message: false,
          priorité: true,
          send: false,
          sended: false,
          sending: false
        });
      }, 5000);

    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      setFormValid({ ...formValid, sending: false });
    }
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Message */}
        {formValid.sended && (
          <div className="mb-8 bg-green-50 border-l-4 border-green-500 p-6 rounded-lg shadow-lg animate-fade-in">
            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-3xl text-green-500 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-green-800 mb-1">
                  Message envoyé avec succès !
                </h3>
                <p className="text-green-600">
                  Nous vous répondrons dans les plus brefs délais.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-10 text-center">
            <h2 className="text-4xl font-bold text-white mb-3">Contactez-nous</h2>
            <p className="text-blue-100 text-lg">
              Envoyez-nous un message et nous vous répondrons rapidement
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            
            {/* Nom */}
            <div>
              <label htmlFor="nom" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FaUser className="text-blue-600" />
                Nom et Prénom
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                onBlur={() => handleBlur('nom')}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 ${
                  touched.nom
                    ? formValid.nom
                      ? 'border-green-500 focus:ring-green-200 bg-green-50'
                      : 'border-red-500 focus:ring-red-200 bg-red-50'
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                }`}
                placeholder="Entrez votre nom complet"
                required
              />
              {touched.nom && !formValid.nom && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                  <FaExclamationTriangle />
                  <span>{errorMessage.nom}</span>
                </div>
              )}
              {touched.nom && formValid.nom && (
                <div className="flex items-center gap-2 mt-2 text-green-600 text-sm">
                  <FaCheckCircle />
                  <span>Nom valide ✓</span>
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FaEnvelope className="text-blue-600" />
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 ${
                  touched.email
                    ? formValid.email
                      ? 'border-green-500 focus:ring-green-200 bg-green-50'
                      : 'border-red-500 focus:ring-red-200 bg-red-50'
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                }`}
                placeholder="votre.email@exemple.com"
                required
              />
              {touched.email && !formValid.email && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                  <FaExclamationTriangle />
                  <span>{errorMessage.email}</span>
                </div>
              )}
              {touched.email && formValid.email && (
                <div className="flex items-center gap-2 mt-2 text-green-600 text-sm">
                  <FaCheckCircle />
                  <span>Email valide ✓</span>
                </div>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FaCommentDots className="text-blue-600" />
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={() => handleBlur('message')}
                rows="6"
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 resize-none ${
                  touched.message
                    ? formValid.message
                      ? 'border-green-500 focus:ring-green-200 bg-green-50'
                      : 'border-red-500 focus:ring-red-200 bg-red-50'
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                }`}
                placeholder="Écrivez votre message ici..."
                required
              />
              {touched.message && !formValid.message && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                  <FaExclamationTriangle />
                  <span>{errorMessage.message}</span>
                </div>
              )}
              {touched.message && formValid.message && (
                <div className="flex items-center gap-2 mt-2 text-green-600 text-sm">
                  <FaCheckCircle />
                  <span>Message valide ✓</span>
                </div>
              )}
            </div>

            {/* Priorité */}
            <div>
              <label htmlFor="priorité" className="block text-sm font-semibold text-gray-700 mb-2">
                Priorité du message
              </label>
              <select
                name="priorité"
                id="priorité"
                onChange={handleChange}
                value={formData.priorité}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-300 cursor-pointer"
              >
                <option value="haute">🔴 Haute - Urgent</option>
                <option value="moyenne">🟡 Moyenne - Normal</option>
                <option value="basse">🟢 Basse - Non urgent</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!formValid.send || formValid.sending}
              className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                formValid.send && !formValid.sending
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {formValid.sending ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  <span>Envoi en cours...</span>
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  <span>Envoyer le message</span>
                </>
              )}
            </button>

            {/* Form Info */}
            <p className="text-center text-sm text-gray-500">
              Vos données sont protégées et ne seront jamais partagées
            </p>
          </form>
        </div>

        {/* Contact Info */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-3">📧</div>
            <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
            <p className="text-gray-600">mohamedyessinb2@gmail.com</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-3">📱</div>
            <h3 className="font-semibold text-gray-900 mb-1">Téléphone</h3>
            <p className="text-gray-600">+216 54476131</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-3">📍</div>
            <h3 className="font-semibold text-gray-900 mb-1">Adresse</h3>
            <p className="text-gray-600">Sfax</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
