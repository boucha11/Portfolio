import React from "react";
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const Experience = () => {
  const experiences = [
    {
      period: "Juillet 2025 - Août 2025",
      role: "Stagiaire Développement Web",
      company: "GROSAFE",
      location: "Tunisie",
      description:
        "Stage pratique en développement web avec amélioration de l’interface utilisateur et correction de bugs.",
      tech: ["HTML", "CSS", "JavaScript", "Spring Boot"],
    },
    {
      period: "2024",
      role: "Développeur Full-Stack",
      company: "Plateforme E-commerce",
      location: "IIT Sfax",
      description:
        "Développement d’une plateforme e-commerce avec application mobile Flutter et backend Spring Boot.",
      tech: ["Flutter", "Dart", "Spring Boot", "MySQL"],
    },
    {
      period: "2024",
      role: "Développeur Backend",
      company: "Application Microservices",
      location: "IIT Sfax",
      description:
        "Application backend basée sur une architecture microservices avec Spring Boot.",
      tech: ["Java", "Spring Boot", "REST API", "Microservices"],
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-indigo-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-indigo-900 mb-16">
          Parcours & Expériences
        </h2>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg transform transition duration-300 hover:scale-105"
            >
              {/* Date */}
              <div className="flex items-center gap-4 text-indigo-600 mb-4">
                <FaCalendarAlt /> {exp.period}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-semibold text-indigo-900 mb-4">
                {exp.role}
              </h3>

              {/* Company and Location */}
              <p className="flex items-center gap-2 text-gray-600 mb-4">
                <FaBriefcase /> {exp.company} • <FaMapMarkerAlt /> {exp.location}
              </p>

              {/* Description */}
              <p className="mt-4 text-gray-700 leading-relaxed">{exp.description}</p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mt-6">
                {exp.tech.map((t, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium transition-all duration-300 hover:bg-indigo-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;