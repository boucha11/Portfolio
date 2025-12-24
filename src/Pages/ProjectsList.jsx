import { useEffect, useState } from "react";

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

  if (loading) return <p className="text-center py-20 text-lg">Chargement...</p>;
  if (error) return <p className="text-center text-red-600 py-20">{error}</p>;

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-6 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-16">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wider px-4 py-1.5 bg-indigo-100 rounded-full">
              Portfolio
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-indigo-600">
            Mes Projets
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl text-center mx-auto">
            Découvrez une sélection de projets qui reflètent ma passion pour le développement et le design.
          </p>
        </header>

        {/* Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const gradients = [
              "from-violet-400 to-purple-600",
              "from-cyan-400 to-blue-600",
              "from-amber-400 to-orange-600",
              "from-emerald-400 to-teal-600",
              "from-pink-400 to-rose-600",
              "from-indigo-400 to-blue-600"
            ];
            const gradient = gradients[index % gradients.length];

            return (
              <article
                key={project.id}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105"
              >
                {/* Gradient Background avec animation */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Effet de brillance au survol */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000" />

                {/* Header avec icône */}
                <div className={`relative h-48 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div className="relative p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors">
                    {project.title}
                  </h2>

                  <p className="text-gray-600 mb-6 line-clamp-2">
                    Un projet innovant qui démontre mes compétences en développement.
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                      React
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                      Design
                    </span>
                  </div>

                  {/* Bouton */}
                  <a
                    href={`/projects/${project.id}`}
                    className="relative inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl overflow-hidden group/btn transition-all duration-300"
                  >
                    <span className="relative z-10">Découvrir</span>
                    <svg className="relative z-10 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>

                {/* Numéro de projet */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-sm font-bold text-gray-700">
                    #{String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </article>
            );
          })}

          {projects.length === 0 && (
            <div className="col-span-full text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">Aucun projet disponible pour le moment.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProjectsList;