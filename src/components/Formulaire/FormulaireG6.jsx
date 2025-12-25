import React, { useState } from 'react';
import { Mail, User, MessageSquare, Send, CheckCircle, AlertCircle, Phone, MapPin, Globe } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    message: "",
    priorité: "moyenne",
  });

  const [formValid, setFormValid] = useState({
    nom: false,
    email: false,
    message: false,
    send: false,
    sended: false,
    sending: false
  });

  const [touched, setTouched] = useState({
    nom: false,
    email: false,
    message: false
  });

  const errorMessage = {
    nom: "Le nom doit contenir au moins 3 caractères",
    email: "Merci d'entrer un email valide",
    message: "Le message doit contenir au moins 10 caractères"
  };

  const verificationFormulaire = () => {
    const newValidState = {
      nom: formData.nom.length > 3,
      email: formData.email.includes('@') && formData.email.includes('.'),
      message: formData.message.length > 10,
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
    
    if (touched[e.target.name]) {
      setTimeout(() => verificationFormulaire(), 100);
    }
  };

  const handleBlur = (fieldName) => {
    setTouched({ ...touched, [fieldName]: true });
    verificationFormulaire();
  };

  const handleSubmit = async () => {
    if (!verificationFormulaire()) {
      return;
    }

    setFormValid({ ...formValid, sending: true });

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Formulaire soumis : ", formData);
      
      setFormValid({ ...formValid, sended: true, sending: false });
      
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

      setTimeout(() => {
        setFormValid({
          nom: false,
          email: false,
          message: false,
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wider shadow-lg">
              Contact
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Parlons de votre projet
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Une idée en tête ? N'hésitez pas à me contacter. Je réponds généralement en moins de 24h.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          
          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Mail className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Envoyez-moi un message
              </h3>
              <p className="text-gray-600 mb-6">
                Je suis toujours ouvert aux nouvelles opportunités et collaborations.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-indigo-50 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-1">24h</div>
                  <div className="text-sm text-gray-600">Temps de réponse</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">100%</div>
                  <div className="text-sm text-gray-600">Satisfaction</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 space-y-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Coordonnées</h3>
              
              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-200 transition-colors">
                  <Mail className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Email</div>
                  <div className="text-gray-900 font-medium">mohamedyessinb2@gmail.com</div>
                </div>
              </div>

              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-purple-200 transition-colors">
                  <Phone className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Téléphone</div>
                  <div className="text-gray-900 font-medium">+216 54476131</div>
                </div>
              </div>

              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-pink-200 transition-colors">
                  <MapPin className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Localisation</div>
                  <div className="text-gray-900 font-medium">Sfax, Tunisie</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 shadow-xl text-white">
              <h3 className="text-xl font-bold mb-4">Suivez-moi</h3>
              <p className="text-indigo-100 mb-6">Restez connecté sur mes réseaux sociaux</p>
              <div className="flex gap-3">
                <a 
                  href="https://www.linkedin.com/in/mohamed-yessin-bouchaala-b9790036a/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-all backdrop-blur cursor-pointer"
                  title="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a 
                  href="https://github.com/boucha11" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-all backdrop-blur cursor-pointer"
                  title="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a 
                  href="mailto:mohamedyessinb2@gmail.com" 
                  className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-all backdrop-blur cursor-pointer"
                  title="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            
            {formValid.sended && (
              <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-green-800 mb-1">
                      Message envoyé avec succès !
                    </h3>
                    <p className="text-green-600">
                      Je vous répondrai dans les plus brefs délais. Merci ! 🎉
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              
              <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8">
                <h2 className="text-3xl font-bold text-white mb-2">
                  Démarrons la conversation
                </h2>
                <p className="text-indigo-100">
                  Remplissez le formulaire ci-dessous et je vous répondrai rapidement
                </p>
              </div>

              <div className="p-8 space-y-6">
                
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                    <User className="w-5 h-5 text-indigo-600" />
                    Nom complet
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    onBlur={() => handleBlur('nom')}
                    className={`w-full px-5 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none text-lg ${
                      touched.nom
                        ? formValid.nom
                          ? 'border-green-400 bg-green-50 focus:border-green-500'
                          : 'border-red-400 bg-red-50 focus:border-red-500'
                        : 'border-gray-200 focus:border-indigo-500 focus:bg-indigo-50'
                    }`}
                    placeholder="Votre nom et prénom"
                  />
                  {touched.nom && !formValid.nom && (
                    <div className="flex items-center gap-2 mt-2 text-red-600 text-sm font-medium">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errorMessage.nom}</span>
                    </div>
                  )}
                  {touched.nom && formValid.nom && (
                    <div className="flex items-center gap-2 mt-2 text-green-600 text-sm font-medium">
                      <CheckCircle className="w-4 h-4" />
                      <span>Parfait !</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                    <Mail className="w-5 h-5 text-indigo-600" />
                    Adresse email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur('email')}
                    className={`w-full px-5 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none text-lg ${
                      touched.email
                        ? formValid.email
                          ? 'border-green-400 bg-green-50 focus:border-green-500'
                          : 'border-red-400 bg-red-50 focus:border-red-500'
                        : 'border-gray-200 focus:border-indigo-500 focus:bg-indigo-50'
                    }`}
                    placeholder="votre.email@exemple.com"
                  />
                  {touched.email && !formValid.email && (
                    <div className="flex items-center gap-2 mt-2 text-red-600 text-sm font-medium">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errorMessage.email}</span>
                    </div>
                  )}
                  {touched.email && formValid.email && (
                    <div className="flex items-center gap-2 mt-2 text-green-600 text-sm font-medium">
                      <CheckCircle className="w-4 h-4" />
                      <span>Email valide !</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                    <MessageSquare className="w-5 h-5 text-indigo-600" />
                    Votre message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={() => handleBlur('message')}
                    rows={6}
                    className={`w-full px-5 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none text-lg resize-none ${
                      touched.message
                        ? formValid.message
                          ? 'border-green-400 bg-green-50 focus:border-green-500'
                          : 'border-red-400 bg-red-50 focus:border-red-500'
                        : 'border-gray-200 focus:border-indigo-500 focus:bg-indigo-50'
                    }`}
                    placeholder="Décrivez votre projet ou posez votre question..."
                  />
                  {touched.message && !formValid.message && (
                    <div className="flex items-center gap-2 mt-2 text-red-600 text-sm font-medium">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errorMessage.message}</span>
                    </div>
                  )}
                  {touched.message && formValid.message && (
                    <div className="flex items-center gap-2 mt-2 text-green-600 text-sm font-medium">
                      <CheckCircle className="w-4 h-4" />
                      <span>Message clair et détaillé !</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Priorité du message
                  </label>
                  <select
                    name="priorité"
                    value={formData.priorité}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:bg-indigo-50 focus:outline-none transition-all duration-300 text-lg cursor-pointer"
                  >
                    <option value="basse">🟢 Basse - Simple question</option>
                    <option value="moyenne">🟡 Moyenne - Discussion projet</option>
                    <option value="haute">🟠 Haute - Collaboration urgente</option>
                    <option value="urgente">🔴 Urgente - Besoin immédiat</option>
                  </select>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!formValid.send || formValid.sending}
                  className={`w-full py-5 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg ${
                    formValid.send && !formValid.sending
                      ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-indigo-500/50 hover:shadow-xl hover:scale-105 cursor-pointer'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {formValid.sending ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Envoyer le message</span>
                    </>
                  )}
                </button>

                <p className="text-center text-sm text-gray-500 flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Vos données sont sécurisées et confidentielles
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;