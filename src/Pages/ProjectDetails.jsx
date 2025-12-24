import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const API_URL = "https://694be681da5ddabf00358f9d.mockapi.io/projet";

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        // Comparaison sécurisée (string / number)
        const foundProject = data.find(
          (p) => String(p.id) === String(id)
        );

        setProject(foundProject || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) {
    return <p className="text-center py-10">Chargement...</p>;
  }

  if (!project) {
    return (
      <div className="text-center py-16">
        <p className="text-red-600 text-lg mb-4">Projet introuvable</p>
        <Link
          to="/projects"
          className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-white"
        >
          ← Retour aux projets
        </Link>
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <Link to="/projects" className="text-sm text-gray-500">
        ← Retour à la liste
      </Link>

      <div className="mt-6 bg-white rounded-xl shadow-md overflow-hidden">
        <div className="h-40 bg-gradient-to-r from-indigo-500 to-purple-600" />

        <div className="p-6 space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>

          {project.description && (
            <p className="text-gray-700 leading-relaxed">{project.description}</p>
          )}

          {project.technologies && project.technologies.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-900 mb-2">
                Technologies utilisées
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProjectDetails;
