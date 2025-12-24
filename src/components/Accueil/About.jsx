import React from "react";
import { FaCode, FaRocket, FaLightbulb, FaCheckCircle } from "react-icons/fa";

const About = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-indigo-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-indigo-900 mb-4">
            À propos de moi
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Étudiant en Génie Logiciel à l’IIT Sfax, passionné par la création
            d’applications modernes, performantes, et bien structurées.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Feature
            icon={<FaCode />}
            title="Code structuré"
            desc="Respect des bonnes pratiques, architecture claire et maintenable."
          />
          <Feature
            icon={<FaRocket />}
            title="Développement moderne"
            desc="Spring Boot, Flutter, REST API et microservices."
          />
          <Feature
            icon={<FaLightbulb />}
            title="Esprit analytique"
            desc="Analyse des besoins et conception de solutions efficaces."
          />
        </div>

        <div className="bg-white p-10 rounded-2xl shadow-xl max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-indigo-900 mb-6">
            Compétences Techniques
          </h3>

          <ul className="space-y-4">
            {[
              "Java, Spring Boot, Microservices, REST API",
              "Flutter & Dart (applications mobiles)",
              "HTML, CSS, JavaScript",
              "Bases de données : MySQL, SQL Server, PL/SQL",
              "UML, conception & modélisation",
              "Git, Postman, IntelliJ IDEA, VS Code",
            ].map((skill, index) => (
              <li key={index} className="flex items-center gap-4 text-lg text-gray-600">
                <FaCheckCircle className="text-green-500" />
                {skill}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
};

const Feature = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition duration-300">
    <div className="text-5xl text-indigo-600 mb-6">{icon}</div>
    <h3 className="text-2xl font-semibold text-indigo-900 mb-3">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </div>
);

export default About;