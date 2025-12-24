import React from "react";
import { FaRocket, FaGithub, FaLinkedin } from "react-icons/fa";
import profilePhoto from "../../assets/profile.png"; // Assurez-vous que le chemin de l'image est correct

const Hero = () => {
  const user = {
    name: "Mohamed Yessin Bouchaala",
    title: "Étudiant en Génie Logiciel | Développeur Full-Stack",
    description:
      "Étudiant en 3ᵉ année Génie Logiciel et Systèmes d’Information à l’IIT Sfax. Passionné par le développement web, mobile et les architectures microservices avec Spring Boot et Flutter.",
    github: "https://github.com/boucha11",
    linkedin: "https://www.linkedin.com/in/mohamed-yessin-bouchaala-b9790036a/",
    email: "mohamedyessinb2@gmail.com",
  };

  return (
    <section className="min-h-screen flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-6 md:flex items-center gap-12">

        {/* Left Section */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-5xl font-extrabold">
            Bonjour, je suis{" "}
            <span className="text-yellow-400">{user.name}</span>
          </h1>

          <h2 className="text-2xl font-semibold">{user.title}</h2>

          <p className="text-lg text-white/90">{user.description}</p>

          <div className="flex gap-6">
            <a
              href="/projects"
              className="px-6 py-3 bg-yellow-500 text-black rounded-lg font-semibold hover:scale-105 transition transform"
            >
              <FaRocket className="inline mr-2" />
              Voir mes projets
            </a>

            <a
              href={`mailto:${user.email}`}
              className="px-6 py-3 border border-white rounded-lg hover:bg-white/20 transition"
            >
              Me contacter
            </a>
          </div>

          <div className="flex gap-6 mt-6">
            <a href={user.github} target="_blank" rel="noreferrer">
              <FaGithub className="text-3xl hover:text-yellow-300 transition-all" />
            </a>
            <a href={user.linkedin} target="_blank" rel="noreferrer">
              <FaLinkedin className="text-3xl hover:text-yellow-300 transition-all" />
            </a>
          </div>
        </div>

        {/* Right Section: Profile Photo */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={profilePhoto}
            alt="profile"
            className="w-64 h-64 rounded-full object-cover shadow-2xl"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;
