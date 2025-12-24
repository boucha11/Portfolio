import React from "react";
import { FaRocket, FaGithub, FaLinkedin } from "react-icons/fa";
import profilePhoto from "../../assets/profile.png";

const Hero = () => {
  const user = {
    name: "Mohamed Yessin Bouchaala",
    title: "Étudiant en Génie Logiciel | Développeur Full-Stack",
    description:
      "Étudiant en 3ᵉ année Génie Logiciel et Systèmes d'Information à l'IIT Sfax. Passionné par le développement web, mobile et les architectures microservices avec Spring Boot et Flutter.",
    github: "https://github.com/boucha11",
    linkedin: "https://www.linkedin.com/in/mohamed-yessin-bouchaala-b9790036a/",
    email: "mohamedyessinb2@gmail.com",
  };

  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:flex items-center gap-16 relative z-10">
        {/* Left Section */}
        <div className="md:w-1/2 space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold leading-tight">
              Bonjour, je suis{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                {user.name}
              </span>
            </h1>

            <h2 className="text-2xl font-light text-purple-200">{user.title}</h2>
          </div>

          <p className="text-lg text-gray-300 leading-relaxed">{user.description}</p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="/projects"
              className="group px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-full font-bold hover:shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 transform hover:scale-105"
            >
              <FaRocket className="inline mr-2 group-hover:translate-x-1 transition-transform" />
              Voir mes projets
            </a>

            <a
              href={`mailto:${user.email}`}
              className="px-8 py-4 border-2 border-purple-400 rounded-full hover:bg-purple-500/20 backdrop-blur-sm transition-all duration-300"
            >
              Me contacter
            </a>
          </div>

          {/* Social Links */}
          <div className="flex gap-6 pt-4">
            <a
              href={user.github}
              target="_blank"
              rel="noreferrer"
              className="transform hover:scale-110 transition-transform duration-200"
            >
              <FaGithub className="text-4xl hover:text-yellow-400 transition-colors" />
            </a>
            <a
              href={user.linkedin}
              target="_blank"
              rel="noreferrer"
              className="transform hover:scale-110 transition-transform duration-200"
            >
              <FaLinkedin className="text-4xl hover:text-yellow-400 transition-colors" />
            </a>
          </div>
        </div>

        {/* Right Section: Profile Photo */}
        <div className="md:w-1/2 flex justify-center mt-12 md:mt-0">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <img
              src={profilePhoto}
              alt="profile"
              className="relative w-80 h-80 rounded-full object-cover shadow-2xl border-4 border-purple-400/50 transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
