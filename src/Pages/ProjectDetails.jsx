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

        const foundProject = data.find(
          (p) => String(p.id) === String(id)
        );

        setProject(foundProject || null);
      } catch (err) {
        console.error(err);
        setProject(null);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) {
    return <p className="text-center py-32 text-lg">Chargement...</p>;
  }

  if (!project) {
    return (
      <div className="text-center py-32">
        <p className="text-red-600 text-lg mb-6">Projet introuvable</p>
        <Link
          to="/projects"
          className="inline-flex items-center rounded-xl bg-indigo-600 px-6 py-3 text-white font-semibold hover:bg-indigo-700 transition"
        >
          ← Retour aux projets
        </Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-black px-6 py-24">
      <div className="max-w-4xl mx-auto">

        {/* Back */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 mb-10 text-sm font-medium text-indigo-300 hover:text-white transition"
        >
          ← Retour aux projets
        </Link>

        {/* Card */}
        <article className="rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">

          {/* Header */}
          <header className="p-10 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
            <span className="inline-block mb-4 px-4 py-1 text-xs font-semibold tracking-wider text-white bg-white/20 rounded-full">
              {project.category || "Projet"}
            </span>

            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              {project.title}
            </h1>

            {project.year && (
              <p className="mt-4 text-indigo-100 text-sm">
                Année : {project.year}
              </p>
            )}
          </header>

          {/* Content */}
          <div className="p-10 space-y-14">

            {/* Description */}
            <section>
              <h2 className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">
                Description
              </h2>
              <p className="text-indigo-100 leading-relaxed text-lg">
                {project.description ||
                  "Ce projet a été réalisé dans un cadre académique ou personnel, avec une attention particulière portée à la qualité du code, à l’architecture et à l’expérience utilisateur."}
              </p>
            </section>

            {/* Technologies */}
            {Array.isArray(project.technologies) && (
              <section>
                <h2 className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">
                  Technologies utilisées
                </h2>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 rounded-xl bg-indigo-500/10 text-indigo-200 border border-indigo-500/20 text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Actions */}
            <section className="flex flex-wrap gap-4 pt-6">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-white font-semibold hover:bg-indigo-700 transition"
                >
                  Voir la démo
                  →
                </a>
              )}

              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-indigo-200 font-semibold hover:bg-white/10 transition"
                >
                  Code source
                </a>
              )}
            </section>
          </div>
        </article>
      </div>
    </section>
  );
}

export default ProjectDetails;
