import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://694be681da5ddabf00358f9d.mockapi.io/projet";

function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Impossible de charger les projets");

        const data = await res.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p className="text-center py-32 text-lg">Chargement...</p>;
  if (error) return <p className="text-center py-32 text-red-600">{error}</p>;

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-6 py-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="mb-20 text-center">
          <span className="inline-block mb-6 text-sm font-semibold text-indigo-600 uppercase tracking-wider px-4 py-1.5 bg-indigo-100 rounded-full">
            Portfolio
          </span>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Mes <span className="text-indigo-600">Projets</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Une sélection de projets illustrant mes compétences techniques et mon sens du design moderne.
          </p>
        </header>

        {/* Grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const gradients = [
              "from-violet-500 to-purple-600",
              "from-cyan-500 to-blue-600",
              "from-amber-500 to-orange-600",
              "from-emerald-500 to-teal-600",
              "from-pink-500 to-rose-600",
              "from-indigo-500 to-blue-600"
            ];
            const gradient = gradients[index % gradients.length];

            return (
              <article
                key={project.id}
                className="group relative rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Gradient Header */}
                <div
                  className={`h-44 bg-gradient-to-r ${gradient} flex items-end p-6`}
                >
                  <span className="text-xs font-semibold text-white bg-white/20 backdrop-blur px-3 py-1 rounded-full">
                    {project.category || "Projet"}
                  </span>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 min-h-[3.5rem]">
                    {project.title}
                  </h2>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {project.description || 
                      "Projet académique ou personnel axé sur la qualité du code et l’expérience utilisateur."
                    }
                  </p>

                  <Link
                    to={`/projects/${project.id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition"
                  >
                    Voir les détails
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-500 rounded-3xl transition" />
              </article>
            );
          })}
        </div>

        {/* Empty state */}
        {projects.length === 0 && (
          <p className="text-center mt-24 text-gray-500 text-lg">
            Aucun projet disponible pour le moment.
          </p>
        )}
      </div>
    </section>
  );
}

export default ProjectsList;
